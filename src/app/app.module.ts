import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { MatNativeDateModule } from "@angular/material/core";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from "./modules/system/pages/home/home.component";
import { SubscriberComponent } from "./modules/system/pages/subscriber/subscriber.component";
import { MaterialModule } from "./modules/material/material.module";
import { ServicesComponent } from "./modules/system/pages/services/services.component";
import { OrderComponent } from "./modules/system/pages/order/order.component";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { environment } from "../environments/environment";
import { ModalviewComponent } from "./components/modalview/modalview.component";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/app.state";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { OrderEffects } from "./store/effects/order.effect";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ServiceEffects } from "./store/effects/service.effect";
import { FormOrderComponent } from "./components/form-order/form-order.component";
import { FormSubComponent } from "./components/form-sub/form-sub.component";
import { FormServiceComponent } from "./components/form-service/form-service.component";
import { BoolPipe } from "./pipe/bool.pipe";
import { SubscriberEffects } from "./store/effects/subscriber.effect";
import { LoginComponent } from "./modules/auth/login/login.component";
import { RegistComponent } from "./modules/auth/regist/regist.component";
import { AuthModule } from "./modules/auth/auth.module";
import { SystemModule } from "./modules/system/system.module";
import { SubInfoComponent } from "./components/sub-info/sub-info.component";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AuthGuard } from "./modules/auth/guard/auth.guard";
import { ServiceInfoComponent } from "./components/service-info/service-info.component";
import { AvaibleserviceComponent } from "./components/avaibleservice/avaibleservice.component";
import { PagenotfoundComponent } from "./modules/system/pages/pagenotfound/pagenotfound.component";

@NgModule({
  declarations: [
    AppComponent,
    AvaibleserviceComponent,
    BoolPipe,
    FormOrderComponent,
    FormServiceComponent,
    FormSubComponent,
    HomeComponent,
    LoginComponent,
    ModalviewComponent,
    OrderComponent,
    PagenotfoundComponent,
    RegistComponent,
    ServiceInfoComponent,
    ServicesComponent,
    SubInfoComponent,
    SubscriberComponent,
  ],
  entryComponents: [
    FormOrderComponent,
    FormServiceComponent,
    FormSubComponent,
    ModalviewComponent,
  ],
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    SystemModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([OrderEffects, ServiceEffects, SubscriberEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
