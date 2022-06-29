import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { MaterialModule } from "../material/material.module";
import { PopUpComponent } from "./pop-up/pop-up.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [HeaderComponent, PopUpComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
