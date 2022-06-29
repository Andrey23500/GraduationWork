import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/service/auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"],
})
export class LoginComponent {
  formLogin = new FormGroup({
    login: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private authService: AuthService) {}

  submit(): void {
    const user: User = {
      id: "",
      username: this.formLogin.controls["login"].value,
      password: this.formLogin.controls["password"].value,
    };
    this.authService.login(user);
  }
}
