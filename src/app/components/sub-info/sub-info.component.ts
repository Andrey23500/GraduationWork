import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Subscriber } from "src/app/models/subscriber.model";

@Component({
  selector: "app-sub-info",
  templateUrl: "./sub-info.component.html",
  styleUrls: ["./sub-info.component.less"],
})
export class SubInfoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Subscriber,
    public dialogRef: MatDialogRef<SubInfoComponent>,
  ) {}
}
