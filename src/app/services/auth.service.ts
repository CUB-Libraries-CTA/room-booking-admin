import { Injectable } from '@angular/core';
import { env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const userUrl = env.apiUrl + '/user/?format=json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}
  public isAuthenticated() {
    return this.http.get(userUrl).subscribe(
      data => {
        sessionStorage.setItem('token', data['authentication']['token']);
      },
      err => this.login(), // This will redirect to the system login page
      () => void 0
    );
  }

  public getUserInformation() {
    return this.http.get(userUrl);
  }

  public login() {
    return (window.location.href =
      env.apiUrl + '/api-saml/sso/saml?next=/room-booking-admin');
  }
}
