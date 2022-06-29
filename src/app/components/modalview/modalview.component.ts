import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscriber } from "src/app/models/subscriber.model";
import { Order } from "src/app/models/order.model";

@Component({
  selector: "app-modalview",
  templateUrl: "./modalview.component.html",
  styleUrls: ["./modalview.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalviewComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Order | Subscriber | string,
  ) {}
}
