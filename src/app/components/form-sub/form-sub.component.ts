import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Subscriber } from "src/app/models/subscriber.model";
import { RxUnsubscribe } from "src/app/rx-unsubscribe";

@Component({
  selector: "app-form-sub",
  templateUrl: "./form-sub.component.html",
  styleUrls: ["./form-sub.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSubComponent extends RxUnsubscribe implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Subscriber,
    public dialogRef: MatDialogRef<FormSubComponent>,
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.data) {
      this.showInputs(this.data);
    }
  }

  formSubscriber = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
    ]),
    homeAddress: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    id: new FormControl(null),
    registrDate: new FormControl(new Date().toISOString()),
  });

  showInputs(data: Subscriber): void {
    this.formSubscriber.get("name")?.setValue(data.name);
    this.formSubscriber.get("phone")?.setValue(data.phone);
    this.formSubscriber.get("homeAddress")?.setValue(data.homeAddress);
    this.formSubscriber.get("description")?.setValue(data.description);
  }

  submit(): void {
    this.dialogRef.close(this.formSubscriber.value);
  }
}
