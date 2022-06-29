import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { RxUnsubscribe } from "src/app/rx-unsubscribe";
import { AuthService } from "src/app/service/auth/auth.service";
@Component({
  selector: "app-pop-up",
  templateUrl: "./pop-up.component.html",
  styleUrls: ["./pop-up.component.less"],
})
export class PopUpComponent extends RxUnsubscribe implements OnInit {
  user!: User | null;

  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  logOut(): void {
    this.authService.logOut();
  }
}
