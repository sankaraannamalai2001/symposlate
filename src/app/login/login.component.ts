import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      errLink: boolean;
      errMsg: string;
    };
    this.errMsg = state?.errMsg;
    this.errLink = state?.errLink;
  }
  user: any;
  registeredUserData = {
    username: '',
    password: '',
    yourname: '',
    registerId: '',
    email: '',
  };
  errMsg: string = 'Username or Password is incorrect';
  errMsg1: string = '';
  errLink: boolean = false;
  ngOnInit(): void {}
  registerUser() {
    this.auth.registerUser(this.registeredUserData).subscribe(
      (res) => {
        this.user = {
          username: this.registeredUserData.username,
          password: this.registeredUserData.password,
        };
        this.auth.validate(this.user).then((res) => {
          this.user = res;
          this.auth.setUserId(this.registeredUserData);
          this.auth.setUserInfo({
            user: this.registeredUserData.username,
            user_id: this.user.user_id,
          });
          this.router.navigate(['allevent']);
        });
      },
      (err) => (this.errMsg1 = err.error)
    );
  }
  LoginUserData: any = {};

  LoginUser() {
    this.auth
      .validate(this.LoginUserData)
      .then((res) => {
        this.user = res;
        
        this.auth.setUserId(this.LoginUserData);
        this.auth.setUserInfo({
          user: this.LoginUserData.username,
          user_id: this.user.user_id,
        });
        this.router.navigate(['allevent']);
      })
      .catch((err) => {
        this.errMsg = 'Username or password is incorrect';
        this.errLink = true;
      });
  }
}
