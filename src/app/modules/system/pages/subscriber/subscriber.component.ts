import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { select, Store } from "@ngrx/store";
import { Observable, takeUntil } from "rxjs";
import { FormSubComponent } from "src/app/components/form-sub/form-sub.component";
import { ModalviewComponent } from "src/app/components/modalview/modalview.component";
import { SubInfoComponent } from "src/app/components/sub-info/sub-info.component";
import { Subscriber } from "src/app/models/subscriber.model";
import { User } from "src/app/models/user.model";
import { RxUnsubscribe } from "src/app/rx-unsubscribe";
import { AuthService } from "src/app/service/auth/auth.service";
import {
  addSubscriber,
  deleteSubscriber,
  loadSubscribers,
  updateSubscriber,
} from "src/app/store/actions/subscriber.action";
import { AppState } from "src/app/store/app.state";
import { selectSubscribers } from "src/app/store/selectors/subscriber.seletor";

@Component({
  selector: "app-subscriber",
  templateUrl: "./subscriber.component.html",
  styleUrls: ["./subscriber.component.less"],
})
export class SubscriberComponent extends RxUnsubscribe implements OnInit {
  subscribeState!: Observable<Subscriber[]>;
  subscribers!: MatTableDataSource<Subscriber>;
  fileNameDialogRef: MatDialogRef<FormSubComponent> | undefined;
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
    public dialogInfo: MatDialog,
    private cdr: ChangeDetectorRef,
    private service: AuthService,
  ) {
    super();
  }

  displayedColumns: string[] = [
    "CheckBox",
    "name",
    "phone",
    "ordersRef",
    "Edit",
  ];

  ngOnInit(): void {
    this.subscribeState = this.store.pipe(select(selectSubscribers));
    this.store.dispatch(loadSubscribers());
    this.subscribeState.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.subscribers = new MatTableDataSource(
        JSON.parse(JSON.stringify(data)),
      );
      this.subscribers.paginator = this.paginator;
      this.subscribers.sort = this.sort;
      this.cdr.detectChanges();
    });
    this.user = this.service.getCurrentUser();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.subscribers.filter = filterValue.trim().toLowerCase();
  }

  openFormAdd(): void {
    this.fileNameDialogRef = this.dialogForm.open(FormSubComponent);
    this.fileNameDialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((subscriber) => {
        console.log(subscriber);
        if (subscriber) {
          this.store.dispatch(addSubscriber({ subscriber }));
        }
      });
  }

  openFormEdit(subscriber: Subscriber): void {
    this.fileNameDialogRef = this.dialogForm.open(FormSubComponent, {
      data: subscriber,
    });
    this.fileNameDialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          res.id = subscriber.id;
          this.store.dispatch(updateSubscriber({ subscriber: res }));
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

  deleteSubs(): void {
    const dialogRef = this.dialogMode.open(ModalviewComponent, {
      data: "subscriber",
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: string) => {
        if (res === "true") {
          for (const item of this.selectedIDs) {
            this.store.dispatch(deleteSubscriber({ id: item }));
          }
        }
      });
  }

  showInfo(subscriber: Subscriber): void {
    this.dialogInfo.open(SubInfoComponent, {
      data: subscriber,
    });
  }
}
