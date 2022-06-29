import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Service } from "src/app/models/service.model";

@Component({
  selector: "app-form-service",
  templateUrl: "./form-service.component.html",
  styleUrls: ["./form-service.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormServiceComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Service,
    public dialogRef: MatDialogRef<FormServiceComponent>,
  ) {}
  ngOnInit(): void {
    if (this.data) {
      this.showInputs(this.data);
    } else {
      this.formService.controls["activity"].disable();
    }
  }

  formService = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    activity: new FormControl(true),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    id: new FormControl(null),
  });

  showInputs(data: Service): void {
    this.formService.get("name")?.setValue(data.name);
    this.formService.controls["activity"].setValue(data.activity);
    this.formService.get("description")?.setValue(data.description);
  }

  submit(): void {
    this.dialogRef.close(this.formService.getRawValue());
  }
}
