import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/service/auth/auth.service";

@Component({
  selector: "app-regist",
  templateUrl: "./regist.component.html",
  styleUrls: ["./regist.component.less"],
})
export class RegistComponent {
  formRegistration = new FormGroup({
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
      username: this.formRegistration.controls["login"].value,
      password: this.formRegistration.controls["password"].value,
    };
    this.authService.signUp(user);
  }
}
