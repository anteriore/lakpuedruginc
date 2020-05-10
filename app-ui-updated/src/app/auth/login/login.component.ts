import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  submitted = false;


  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService,
    private route: ActivatedRoute, private router: Router) {
    // redirect to cart if already logged in

    if (this.authenticationService.currentUserValue) {
      // this.router.navigate(['']);
    }

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['katharine@yahoo.com', Validators.required],
      password: ['test', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    console.log("login: " + this.f.username.value);
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data)
          //this.router.navigate([this.returnUrl]);
        })
  }
}
