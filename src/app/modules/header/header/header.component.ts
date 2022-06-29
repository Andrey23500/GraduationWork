import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/service/auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  show: boolean = false;
  user!: User | null;

  constructor(private service: AuthService) {}

  ngOnInit(): void {
    this.user = this.service.getCurrentUser();
  }
}
