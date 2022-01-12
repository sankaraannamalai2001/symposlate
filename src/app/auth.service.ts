import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private route: Router) {}
  private _regUrl = 'http://localhost:3000/user/register';
  private _loginUrl = 'http://localhost:3000/user/login';
  private _logoutUrl = 'http://localhost:3000/user/logout';
  private _authUrl = 'http://localhost:3000/user/isauth';
  private user!: Object;
  registerUser(user: object) {
    return this.http.post(this._regUrl, user, { responseType: 'text' });
  }
  LoginUser(user: object) {
    return this.http.post(this._loginUrl, user, { responseType: 'text' });
  }
  LogoutUser() {
    this.http.get(this._logoutUrl);
    localStorage.removeItem('userInfo');
    this.route.navigate(['login']);
  }
  public async isAuthenticated(): Promise<boolean> {
    let userData = localStorage.getItem('userInfo');
    if (userData && JSON.parse(userData)) {
      await this.isauth().subscribe(
        (res) => {
          return true;
        },
        (err) => {
          console.log(err);
          return false;
        }
      );
      return true;
    }
    return false;
  }
  public setUserInfo(user: any) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }
  public validate(user: object) {
    return this.http.post(this._loginUrl, user).toPromise();
  }
  public setUserId(user: Object) {
    this.user = user;
  }
  public getUserId() {
    
    return this.user;
  }
  public isauth() {
    //console.log(this.http.get(this._authUrl));
    return this.http.get(this._authUrl, { responseType: 'text' });
  }
}
