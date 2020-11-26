import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form =  new FormGroup({
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  })
  loginError
  constructor(private back: BackendService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(){
    this.router.navigate(["/predictor"]);

/*      this.back
      .login(this.form.getRawValue())
      .subscribe(
        data => {
          this.loginError = false;
          this.router.navigate(["/predictor"]);
        },
        error => {
          if (error.status === 401) {
            this.loginError = true;
          } else {
            alert("Intente mas tarde");
          }
        }
      ); */
  }
}
