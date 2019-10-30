import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewDeviceComponent } from '../new-device/new-device.component';
import { IDevice } from '../models/device';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  devices: IDevice[] = [];
  displayedColumns: string[] = [
    'position',
    'unique_id',
    'name',
    'note',
    'location_id',
    'category_id',
    'space_id',
    'latest_update',
    'status',
    'action'
  ];
  dataSource = new MatTableDataSource<IDevice>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private deviceService: DeviceService) {}
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
    device.active = !device.active;
    this.deviceService.updateDevice(device._id, device).subscribe(data => {
      this.loadDevices();
    });
  }
  onEdit(device: IDevice): void {
    const dialogRef = this.dialog.open(NewDeviceComponent, {
      width: '450px',
      height: 'auto',
      data: device
    });
    dialogRef.afterClosed().subscribe(data => {
      this.loadDevices();
    });
  }

  onDelete(_id: string): void {
    let c = confirm(
      'WARNING !!!! Please make sure there is NO device currently using this Unique ID. Once the Unique ID deleted, its GONE. Are you sure you want to DELETE this ?'
    );
    if (c) {
      this.deviceService.deleteDevice(_id).subscribe(data => {
        this.loadDevices();
      });
    }
    return;
  }

  openNewDeviceDialog(): void {
    const dialogRef = this.dialog.open(NewDeviceComponent, {
      width: '450px',
      height: 'auto'
    });
    dialogRef.afterClosed().subscribe(data => {
      this.loadDevices();
    });
  }
}
