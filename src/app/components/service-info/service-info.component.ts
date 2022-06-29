import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Service } from "src/app/models/service.model";

@Component({
  selector: "app-service-info",
  templateUrl: "./service-info.component.html",
  styleUrls: ["./service-info.component.less"],
})
export class ServiceInfoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Service,
    public dialogRef: MatDialogRef<ServiceInfoComponent>,
  ) {}
}
