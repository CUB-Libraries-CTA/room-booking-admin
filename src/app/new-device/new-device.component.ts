import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { v4 as uuid } from 'uuid';
import { IDevice } from '../models/device';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css']
})
export class NewDeviceComponent implements OnInit {
  device: IDevice;
  isEditForm = false;
  onEditField: boolean = false;
  newDeviceForm = new FormGroup({
    unique_id: new FormControl(
      { value: null, disabled: true },
      Validators.required
    ),
    name: new FormControl(
      { value: null, disabled: false },
      Validators.required
    ),
    note: new FormControl({ value: null, disabled: false }),
    location_id: new FormControl({ value: null, disabled: false }, [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    category_id: new FormControl({ value: null, disabled: false }, [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    hours_view_id: new FormControl({ value: null, disabled: false }, [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    space_id: new FormControl({ value: null, disabled: false }, [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    latest_update: new FormControl(
      { value: '', disabled: true },
      Validators.required
    )
  });
  constructor(
    public dialogRef: MatDialogRef<NewDeviceComponent>,
    private deviceService: DeviceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.isEditForm = true;
      this.onEditField = true;
      this.newDeviceForm.controls['location_id'].disable();
      this.newDeviceForm.controls['category_id'].disable();
      this.newDeviceForm.controls['space_id'].disable();
      this.newDeviceForm.controls['hours_view_id'].disable();
      this.newDeviceForm.get('unique_id').setValue(this.data.unique_id);
      this.newDeviceForm.get('name').setValue(this.data.name);
      this.newDeviceForm.get('location_id').setValue(this.data.location_id);
      this.newDeviceForm.get('category_id').setValue(this.data.location_id);
      this.newDeviceForm.get('hours_view_id').setValue(this.data.hours_view_id);
      this.newDeviceForm.get('space_id').setValue(this.data.space_id);
      this.newDeviceForm.get('note').setValue(this.data.note);
    }
    this.newDeviceForm
      .get('latest_update')
      .setValue(new Date().toLocaleDateString());
  }
  switchGenerateBtn() {
    this.onEditField = !this.onEditField;
    if (this.onEditField) {
      this.newDeviceForm.controls['location_id'].disable();
      this.newDeviceForm.controls['category_id'].disable();
      this.newDeviceForm.controls['space_id'].disable();
      this.newDeviceForm.controls['hours_view_id'].disable();
    } else {
      this.newDeviceForm.controls['location_id'].enable();
      this.newDeviceForm.controls['category_id'].disable();
      this.newDeviceForm.controls['space_id'].enable();
      this.newDeviceForm.controls['hours_view_id'].enable();
    }
  }
  onGenerateNewID() {
    this.newDeviceForm.get('unique_id').setValue(uuid());
  }
  onSubmit() {
    this.device = this.newDeviceForm.getRawValue();
    if (this.data) {
      this.deviceService
        .updateDevice(this.data._id, this.device)
        .subscribe(data => {
          this.dialogRef.close();
        });
    } else {
      this.device.active = false;
      this.deviceService.create(this.device).subscribe(data => {
        //Alert Success
        this.dialogRef.close();
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
