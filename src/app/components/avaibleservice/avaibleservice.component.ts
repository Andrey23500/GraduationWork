import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Store, select } from "@ngrx/store";
import { takeUntil } from "rxjs";
import { Service } from "src/app/models/service.model";
import { RxUnsubscribe } from "src/app/rx-unsubscribe";
import { loadServices } from "src/app/store/actions/service.action";
import { AppState } from "src/app/store/app.state";
import { selectServices } from "src/app/store/selectors/service.seletor";

@Component({
  selector: "app-avaibleservice",
  templateUrl: "./avaibleservice.component.html",
  styleUrls: ["./avaibleservice.component.less"],
})
export class AvaibleserviceComponent extends RxUnsubscribe implements OnInit {
  services: Service[] = [];
  formService = new FormGroup({
    serviceRef: new FormControl([null]),
  });
  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<AvaibleserviceComponent>,
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(loadServices());
    this.store
      .pipe(select(selectServices))
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.services = JSON.parse(JSON.stringify(data));
      });
  }
  submit(): void {
    this.dialogRef.close(this.formService.getRawValue());
  }
}
