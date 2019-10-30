import { Injectable } from '@angular/core';
import { env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const userUrl = env.apiUrl + '/user/?format=json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  public isAuthenticated() {
    return this.http.get(userUrl).subscribe(
      data => {
        if (!data['groups'].includes('study-room-admin')) {
          this.router.navigate(['/error']);
          return false;
        } else {
          if (
            !sessionStorage.getItem('token') ||
            sessionStorage.getItem('token') === 'undefined'
          ) {
            sessionStorage.setItem(
              'token',
              data['authentication']['auth-token']
            );
            window.location.reload();
          }
        }
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
