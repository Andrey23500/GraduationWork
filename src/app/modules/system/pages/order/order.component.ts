import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AvaibleserviceComponent } from "src/app/components/avaibleservice/avaibleservice.component";
import { ModalviewComponent } from "src/app/components/modalview/modalview.component";
import { ServiceInfoComponent } from "src/app/components/service-info/service-info.component";
import { SubInfoComponent } from "src/app/components/sub-info/sub-info.component";
import { Order, StatusOrder } from "src/app/models/order.model";
import { Service } from "src/app/models/service.model";
import { Subscriber } from "src/app/models/subscriber.model";
import { User } from "src/app/models/user.model";
import { RxUnsubscribe } from "src/app/rx-unsubscribe";
import { AuthService } from "src/app/service/auth/auth.service";
import { deleteOrder, updateOrder } from "src/app/store/actions/order.action";
import { AppState } from "src/app/store/app.state";
import { selectCurrentOrder } from "src/app/store/selectors/order.selector";
import { selectCurrentService } from "src/app/store/selectors/service.seletor";
import { selectCurrentSub } from "src/app/store/selectors/subscriber.seletor";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent extends RxUnsubscribe implements OnInit {
  id: string;
  order!: Order | undefined;
  user!: User | null;
  fileNameDialogRef: MatDialogRef<AvaibleserviceComponent> | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    public dialogInfo: MatDialog,
    public dialogMode: MatDialog,
    private service: AuthService,
    private cdr: ChangeDetectorRef,
    public dialogForm: MatDialog,
  ) {
    super();
    this.id = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.user = this.service.getCurrentUser();
    this.store
      .pipe(select(selectCurrentOrder(this.id)))
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.order = data;
        this.cdr.detectChanges();
      });
  }

  getSub(id: string | undefined): Observable<Subscriber | undefined> {
    if (id) {
      return this.store.pipe(select(selectCurrentSub(id)));
    }
    return new Observable<undefined>();
  }

  getService(id: string | undefined): Observable<Service | undefined> {
    if (id) {
      return this.store.pipe(select(selectCurrentService(id)));
    }
    return new Observable<undefined>();
  }

  openDialog(order: Order | undefined): void {
    if (order) {
      const dialogRef = this.dialogMode.open(ModalviewComponent, {
        data: order,
      });
      dialogRef
        .afterClosed()
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: string) => {
          if (res === "true") {
            this.store.dispatch(deleteOrder({ id: order.id }));
            this.router.navigate(["/system", "home"]);
          }
        });
    }
  }

  upOrder(upOrder: Order | undefined, value: Event): void {
    let currentDate;
    if (upOrder) {
      const status = String(value) as StatusOrder;
      if (status === "Completed" || status === "Rejected") {
        currentDate = new Date();
        Object.defineProperty(upOrder, "completeDate", { value: currentDate,
          writable: true,
          enumerable: true,
          configurable: true });
      }
      const order = { ...upOrder, status } as Order;
      this.store.dispatch(updateOrder({ order }));
    }
  }

  addService(): void {
    const copyOrder = { ...this.order };
    this.fileNameDialogRef = this.dialogForm.open(AvaibleserviceComponent);
    this.fileNameDialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const currenServise: string[] | undefined = copyOrder.serviceRef;
        const services: string[] = Array.from(data.serviceRef);

        // copyOrder.serviceRef?.concat(services);
        if (currenServise) {
          const serviceOut = currenServise.concat(
            services.filter((item) => {
              return !currenServise.includes(item);
            }),
          );

          Object.defineProperty(copyOrder, "serviceRef", { value: serviceOut });
          const order = { ...copyOrder } as Order;
          this.store.dispatch(updateOrder({ order }));
        }
      });
  }

  deleteService(item: string): void {
    const copyOrder = { ...this.order };
    if (copyOrder.serviceRef) {
      const arr = Array.from(copyOrder.serviceRef);
      const index = arr.indexOf(item);
      if (index !== -1 && arr && index) {
        arr.splice(index, 1);
        Object.defineProperty(copyOrder, "serviceRef", { value: arr });
        const order = { ...copyOrder } as Order;
        this.store.dispatch(updateOrder({ order }));
      }
    }
  }

  showInfoService(ref: string): void {
    if (ref) {
      this.getService(ref)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          const service = data;
          this.dialogInfo.open(ServiceInfoComponent, {
            data: service,
          });
        });
    }
  }

  showInfoSub(ref: string | undefined): void {
    if (ref) {
      this.getSub(ref)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          const subscriber = data;
          this.dialogInfo.open(SubInfoComponent, {
            data: subscriber,
          });
        });
    }
  }
}
