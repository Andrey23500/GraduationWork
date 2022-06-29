import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

import { MatTableDataSource } from "@angular/material/table";
import { select, Store } from "@ngrx/store";
import { Observable, takeUntil } from "rxjs";
import { FormServiceComponent } from "src/app/components/form-service/form-service.component";
import { ModalviewComponent } from "src/app/components/modalview/modalview.component";
import { Service } from "src/app/models/service.model";
import { User } from "src/app/models/user.model";
import { RxUnsubscribe } from "src/app/rx-unsubscribe";
import { AuthService } from "src/app/service/auth/auth.service";
import {
  addService,
  deleteService,
  loadServices,
  updateService,
} from "src/app/store/actions/service.action";
import { AppState } from "src/app/store/app.state";
import { selectServices } from "src/app/store/selectors/service.seletor";

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.less"],
})
export class ServicesComponent extends RxUnsubscribe implements OnInit {
  serviceState!: Observable<Service[]>;
  services!: MatTableDataSource<Service>;
  fileNameDialogRef: MatDialogRef<FormServiceComponent> | undefined;
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
    "description",
    "activity",
    "Edit",
  ];

  ngOnInit(): void {
    this.serviceState = this.store.pipe(select(selectServices));
    this.store.dispatch(loadServices());
    this.serviceState.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.services = new MatTableDataSource(JSON.parse(JSON.stringify(data)));
      this.services.paginator = this.paginator;
      this.services.sort = this.sort;
      this.cdr.detectChanges();
    });
    this.user = this.service.getCurrentUser();
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.services.filter = filterValue.trim().toLowerCase();
  }

  openFormAdd(): void {
    this.fileNameDialogRef = this.dialogForm.open(FormServiceComponent);
    this.fileNameDialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((service) => {
        if (service) {
          this.store.dispatch(addService({ service }));
        }
      });
  }

  openFormEdit(service: Service): void {
    this.fileNameDialogRef = this.dialogForm.open(FormServiceComponent, {
      data: service,
    });
    this.fileNameDialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          res.id = service.id;
          this.store.dispatch(updateService({ service: res }));
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

  deleteServices(): void {
    const dialogRef = this.dialogMode.open(ModalviewComponent, {
      data: "service",
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: string) => {
        if (res === "true") {
          for (const item of this.selectedIDs) {
            this.store.dispatch(deleteService({ id: item }));
          }
        }
      });
  }
}
