import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {FormsModule} from "@angular/forms";
import {AlertModule} from "ngx-bootstrap/alert";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes=[
  {path:'login',component:LoginComponent},
  {path:'register',component:SignUpComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent
  ],
    imports: [AlertModule.forRoot(),RouterModule.forRoot(routes),
        BrowserModule,
        FormsModule,HttpClientModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
