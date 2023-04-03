import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {RegisterService} from "../Services/register.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(private registerService:RegisterService) {
  }

  status: boolean | undefined;
  VerifyPasswords() {
    // @ts-ignore
    if (document.getElementById('Password').value == document.getElementById('RepeatPw').value) {
      // @ts-ignore
      document.getElementById('message').style.color = 'green';
      // @ts-ignore
      document.getElementById('message').innerHTML = '  Matching';
      this.status = false
    } else {
      // @ts-ignore
      document.getElementById('message').style.color = 'red';
      // @ts-ignore
      document.getElementById('message').innerHTML = '  Not matching';
      this.status = true
    }
  }


  Submit(RegData: NgForm) {
    console.log(RegData)
this.registerService.register(RegData)

  }
}
