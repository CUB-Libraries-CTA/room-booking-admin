import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IDevice } from '../models/device';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const api_path = '/catalog/data/catalog/roomBooking/';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor(private apiService: ApiService) {}

  getDevices(): Observable<IDevice[]> {
    return this.apiService.get(api_path).pipe(map(data => data.results));
  }

  getDevice(_id: string) {}
  create(device: IDevice): Observable<any> {
    return this.apiService
      .post(api_path, device)
      .pipe(map(data => data.device));
  }

  updateDevice(_id: string, device: IDevice): Observable<any> {
    return this.apiService
      .put(api_path + _id + '/', device)
      .pipe(map(data => data));
  }
  deleteDevice(_id: string) {
    return this.apiService.delete(api_path + _id).pipe(map(data => data));
  }
}
