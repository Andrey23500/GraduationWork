import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SystemComponent } from "./system/system.component";
import { HeaderModule } from "../header/header.module";
import { SystemRoutingModule } from "./system-routing.module";

@NgModule({
  declarations: [SystemComponent],
  imports: [CommonModule, HeaderModule, SystemRoutingModule],
})
export class SystemModule {}
