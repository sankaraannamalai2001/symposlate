import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private route: Router) {}
  private _regUrl = 'https://symposlate.herokuapp.com/user/register';
  private _loginUrl = 'https://symposlate.herokuapp.com/user/login';
  private _logoutUrl = 'https://symposlate.herokuapp.com/user/logout';
  private _authUrl = 'https://symposlate.herokuapp.com/user/isauth';
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
