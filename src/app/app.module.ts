import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {FormsModule} from "@angular/forms";
import {AlertModule} from "ngx-bootstrap/alert";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from './app-routing.module';
import {AuthInterceptor} from "./JwtTokenSetup/_helpers/auth.interceptor";

const routes: Routes=[
  {path:'login',component:LoginComponent},
  {path:'register',component:SignUpComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent
  ],
    imports: [AlertModule.forRoot(),RouterModule.forRoot(routes),
        BrowserModule,
        FormsModule,HttpClientModule, AppRoutingModule,
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
