import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/guard/auth.guard";
import { HomeComponent } from "./pages/home/home.component";
import { OrderComponent } from "./pages/order/order.component";
import { PagenotfoundComponent } from "./pages/pagenotfound/pagenotfound.component";
import { ServicesComponent } from "./pages/services/services.component";
import { SubscriberComponent } from "./pages/subscriber/subscriber.component";
import { SystemComponent } from "./system/system.component";

const routes: Routes = [
  {
    path: "system",
    component: SystemComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "order/:id", component: OrderComponent },
      {
        path: "service",
        component: ServicesComponent,
      },
      {
        path: "sub",
        component: SubscriberComponent,
      },
    ],
  },
  { path: "404", component: PagenotfoundComponent },
  { path: "**", redirectTo: "/404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule {}
