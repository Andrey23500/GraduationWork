import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { select, Store } from "@ngrx/store";
import { Observable, takeUntil } from "rxjs";
import { FormOrderComponent } from "src/app/components/form-order/form-order.component";
import { Order } from "src/app/models/order.model";
import { Subscriber } from "src/app/models/subscriber.model";
import { User } from "src/app/models/user.model";
import { RxUnsubscribe } from "src/app/rx-unsubscribe";
import { AuthService } from "src/app/service/auth/auth.service";
import {
  addOrder,
  deleteOrder,
  loadOrders,
  updateOrder,
} from "src/app/store/actions/order.action";
import { loadServices } from "src/app/store/actions/service.action";
import {
  loadSubscribers,
} from "src/app/store/actions/subscriber.action";
import { AppState } from "src/app/store/app.state";
import { selectOrders } from "src/app/store/selectors/order.selector";
import { selectCurrentSub } from "src/app/store/selectors/subscriber.seletor";
import { ModalviewComponent } from "../../../../components/modalview/modalview.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends RxUnsubscribe implements OnInit {
  orderState!: Observable<Order[]>;
  orders!: MatTableDataSource<Order>;
  fileNameDialogRef: MatDialogRef<FormOrderComponent> | undefined;
  user!: User | null;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  selectedIDs: string[] = [];

  constructor(
    private store: Store<AppState>,
    public dialogMode: MatDialog,
    public dialogForm: MatDialog,
    private cdr: ChangeDetectorRef,
    private service: AuthService,
  ) {
    super();
  }

  displayedColumns: string[] = [
    "CheckBox",
    "name",
    "status",
    "subscriberRef",
    "createDate",
    "Edit",
  ];

  ngOnInit(): void {
    this.orderState = this.store.pipe(select(selectOrders));
    this.store.dispatch(loadOrders());
    this.store.dispatch(loadSubscribers());
    this.store.dispatch(loadServices());
    this.user = this.service.getCurrentUser();
    this.orderState.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (this.user?.role === "customer") {
        const newData = data.filter((item) => {
          return item.userId === this.user?.id;
        });
        this.orders = new MatTableDataSource(
          JSON.parse(JSON.stringify(newData)),
        );
      } else {
        this.orders = new MatTableDataSource(JSON.parse(JSON.stringify(data)));
      }
      this.orders.paginator = this.paginator;
      this.orders.sort = this.sort;
      this.cdr.detectChanges();
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orders.filter = filterValue.trim().toLowerCase();
  }

  getSub(id: string): Observable<Subscriber | undefined> {
    return this.store.pipe(select(selectCurrentSub(id)));
  }


  openFormAdd(): void {
    this.fileNameDialogRef = this.dialogForm.open(FormOrderComponent);
    // let subscriber: Subscriber;
    // let orderRef: string;
    // let subRef!: string;
    this.fileNameDialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((order) => {
        if (order) {
          // orderRef = order.id;
          // subRef = order.subRef;
          this.store.dispatch(addOrder({ order }));
        }
      });

    // this.store
    //   .pipe(select(selectCurrentSub(subRef)))
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((data) => {
    //     if (data) {
    //       subscriber = data;
    //     }
    //     subscriber?.ordersRef?.push(orderRef);
    //     this.store.dispatch(updateSubscriber({ subscriber }));
    //   });
  }

  openFormEdit(order: Order): void {
    this.fileNameDialogRef = this.dialogForm.open(FormOrderComponent, {
      data: order,
    });
    this.fileNameDialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          res.id = order.id;
          this.store.dispatch(updateOrder({ order: res }));
        }
      });
  }

  onCheckboxChange(e: MatCheckboxChange, id: string): void {
    if (e.checked) {
      this.selectedIDs.push(id);
    } else {
      for (const item of this.selectedIDs) {
        if (item === id) {
          const index = this.selectedIDs.indexOf(item);
          if (index !== -1) {
            this.selectedIDs.splice(index, 1);
          }
        }
      }
    }
  }

  deleteOrders(): void {
    const dialogRef = this.dialogMode.open(ModalviewComponent, {
      data: "order",
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: string) => {
        if (res === "true") {
          for (const item of this.selectedIDs) {
            this.store.dispatch(deleteOrder({ id: item }));
          }
        }
      });
  }

}
