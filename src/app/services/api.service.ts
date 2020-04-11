import { Injectable, Inject } from '@angular/core';
import { env } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  LOCAL_STORAGE,
  SESSION_STORAGE,
  StorageService,
} from 'ngx-webstorage-service';
import { DeviceDetectorService } from 'ngx-device-detector';

const API_URL = env.apiUrl;
// TODO Convert to cookie, not neccesary using token
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  headers: any;
  constructor(
    private httpClient: HttpClient,
    @Inject(LOCAL_STORAGE) private storageL: StorageService,
    @Inject(SESSION_STORAGE) private storageS: StorageService,
    private deviceDetectorService: DeviceDetectorService
  ) {
    if (
      this.deviceDetectorService.device === 'Android' &&
      this.deviceDetectorService.os === 'Android'
    ) {
      this.headers = new HttpHeaders({
        Authorization: 'token ' + this.storageL.get('token'),
      });
    } else {
      this.headers = new HttpHeaders({
        Authorization: 'token ' + this.storageS.get('token'),
      });
    }
  }

  // API: GET
  public get(path: string): Observable<any> {
    return this.httpClient
      .get(API_URL + path, { headers: this.headers })
      .pipe(catchError(this.formatErrors));
  }

  // API: GET
  public getFullURL(url: string): Observable<any> {
    return this.httpClient
      .get(url, { headers: this.headers })
      .pipe(catchError(this.formatErrors));
  }

  // API: POST
  public post(path: string, body: {}): Observable<any> {
    return this.httpClient
      .post(API_URL + path, body, { headers: this.headers })
      .pipe(catchError(this.formatErrors));
  }

  // API: DELETE
  public delete(path: string): Observable<any> {
    return this.httpClient
      .delete(API_URL + path, { headers: this.headers })
      .pipe(catchError(this.formatErrors));
  }

  // API: PUT
  public put(path: string, body: {}): Observable<any> {
    return this.httpClient
      .put(API_URL + path, body, { headers: this.headers })
      .pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }
}
