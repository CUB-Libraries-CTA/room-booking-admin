import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewDeviceComponent } from '../new-device/new-device.component';
import { IDevice } from '../models/device';
import { DeviceService } from '../services/device.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  devices: IDevice[] = [];
  displayedColumns: string[] = [
    'position',
    'unique_id',
    'note',
    'configuration',
    'latest_update',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<IDevice>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private deviceService: DeviceService,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private deviceDetectorService: DeviceDetectorService,
    private apiService: ApiService
  ) {}
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.loadDevices();
  }

  loadDevices(): void {
    this.deviceService.getDevices().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  onUpdateStatus(device: IDevice): void {
    if (
      this.deviceDetectorService.device === 'Android' &&
      this.deviceDetectorService.os === 'Android'
    ) {
      device.active = !device.active;
      if (device.active) {
        this.storage.set('location_id', device.location_id.toString());
        this.storage.set('space_id', device.space_id.toString());
        this.storage.set('hours_view_id', device.hours_view_id.toString());
        this.storage.set('uid', device.unique_id.toString());
        this.apiService.get('/user/?format=json').subscribe(res => {
          this.storage.set('token', res['authentication']['auth-token']);
        });
        this.apiService
          .post('/room-booking/libcal/token', {})
          .subscribe(res => {
            this.storage.set('libcal_token', res.access_token);
          });
      }
      if (!device.active) {
        this.storage.remove('location_id');
        this.storage.remove('space_id');
        this.storage.remove('hours_view_id');
        this.storage.remove('uid');
        this.storage.remove('token');
        this.storage.remove('libcal_token');
      }

      this.deviceService.updateDevice(device._id, device).subscribe(data => {
        this.loadDevices();
      });
    } else {
      alert(
        'Please Activate/Deactive this configuration on an actual tablet! '
      );
    }
  }
  onChange(e, event) {
    if (
      this.deviceDetectorService.device !== 'Android' &&
      this.deviceDetectorService.os !== 'Android'
    ) {
      event.source.checked = e.active;
    }
  }
  onEdit(device: IDevice): void {
    const dialogRef = this.dialog.open(NewDeviceComponent, {
      width: '450px',
      height: 'auto',
      data: device,
    });
    dialogRef.afterClosed().subscribe(data => {
      this.loadDevices();
    });
  }

  onDelete(_id: string): void {
    if (
      this.deviceDetectorService.device === 'Android' &&
      this.deviceDetectorService.os === 'Android'
    ) {
      const c = confirm(
        'WARNING !!!! Please make sure there is NO device currently using this device configuration. Once the its deleted, its GONE. Are you sure you want to DELETE this ?'
      );
      if (c) {
        this.deviceService.deleteDevice(_id).subscribe(data => {
          this.loadDevices();
        });
      }
    } else {
      alert('Please Delete this configuration on an actual tablet! ');
    }

  }

  openNewDeviceDialog(): void {
    const dialogRef = this.dialog.open(NewDeviceComponent, {
      width: '450px',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(data => {
      this.loadDevices();
    });
  }
}
