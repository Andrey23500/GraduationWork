import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/service/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<UrlTree | boolean>
    | Promise<UrlTree | boolean>
    | UrlTree
    | boolean {
    return this.isAuth();
  }
  private isAuth(): boolean {
    if (this.authService.getCurrentUser()) {
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }
}
