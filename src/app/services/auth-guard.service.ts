import { Injectable, Inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
const userUrl = env.apiUrl + '/user/?format=json';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.http.get(userUrl).pipe(
      map(user => {
        if (user) {
          if (!user['groups'].includes('study-room-admin')) {
            this.router.navigate(['/error']);
            return false;
          }
          // TODO Set token only for android device. Will do it when all done with the project

          this.storage.set('token', user['authentication']['auth-token']);
          return true;
        } else {
          location.href =
            env.apiUrl + '/api-auth/login?next=/room-booking-admin';
          return false;
        }
      }),
      catchError(err => {
        location.href = env.apiUrl + '/api-auth/login?next=/room-booking-admin';
        throw err;
      })
    );
  }
}
