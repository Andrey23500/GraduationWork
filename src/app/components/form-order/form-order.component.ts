import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { select, Store } from "@ngrx/store";
import { Observable, takeUntil } from "rxjs";
import { Order } from "src/app/models/order.model";
import { Service } from "src/app/models/service.model";
import { Subscriber } from "src/app/models/subscriber.model";
import { User } from "src/app/models/user.model";
import { RxUnsubscribe } from "src/app/rx-unsubscribe";
import { AuthService } from "src/app/service/auth/auth.service";
import { loadServices } from "src/app/store/actions/service.action";
import { loadSubscribers } from "src/app/store/actions/subscriber.action";
import { AppState } from "src/app/store/app.state";
import { selectServices } from "src/app/store/selectors/service.seletor";
import {
  selectCurrentSub,
  selectSubscribers,
} from "src/app/store/selectors/subscriber.seletor";

@Component({
  selector: "app-form-order",
  templateUrl: "./form-order.component.html",
  styleUrls: ["./form-order.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormOrderComponent extends RxUnsubscribe implements OnInit {
  subscribers: Subscriber[] = [];
  services: Service[] = [];
  currentSub: Subscriber | undefined;
  user!: User | null;

  formOrder = new FormGroup({
    name: new FormControl(null),
    subscriberRef: new FormControl(null),
    serviceRef: new FormControl([null]),
    description: new FormControl(null),
    status: new FormControl("Created"),
    createDate: new FormControl(new Date()),
    guessDate: new FormControl(Date),
    completeDate: new FormControl(new Date().toISOString()),
    userId: new FormControl(),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataInput: Order,
    private store: Store<AppState>,
    private service: AuthService,
    public dialogRef: MatDialogRef<FormOrderComponent>,
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.dataInput) {
      this.showInputs(this.dataInput);
    }

    this.store.dispatch(loadSubscribers());
    this.store
      .pipe(select(selectSubscribers))
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.subscribers = JSON.parse(JSON.stringify(data));
      });

    this.store.dispatch(loadServices());
    this.store
      .pipe(select(selectServices))
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.services = JSON.parse(JSON.stringify(data));
      });
    this.user = this.service.getCurrentUser();
  }

  getSub(id: string): Observable<Subscriber | undefined> {
    return this.store.pipe(select(selectCurrentSub(id)));
  }

  submit(): void {
    const currentDate = this.formOrder.get("createDate")?.value;
    const guessDate = new Date();
    const days = this.formOrder.get("serviceRef")?.value;
    guessDate.setDate(currentDate.getDate() + days.length);

    this.formOrder.controls["userId"].patchValue(this.user?.id);
    this.formOrder.controls["createDate"].patchValue(currentDate.toISOString());
    this.formOrder.controls["guessDate"].patchValue(guessDate.toISOString());
    this.dialogRef.close(this.formOrder.getRawValue());
  }

  showInputs(data: Order): void {
    this.formOrder.get("name")?.setValue(data.name);
    this.formOrder.controls["subscriberRef"].setValue(data.subscriberRef);
    this.formOrder.controls["serviceRef"].setValue(data.id);
    this.formOrder.controls["description"].setValue(data.description);
  }
}
