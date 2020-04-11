import { Component, OnInit } from '@angular/core';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-loadlog',
  templateUrl: './loadlog.component.html',
  styleUrls: ['./loadlog.component.css'],
})
export class LoadlogComponent implements OnInit {
  completed = false;
  nSwipe = 0;
  nGSwipe = 0;
  nUGSwipe = 0;
  nSSwipe = 0;
  nError = 0;
  nRedRoom = 0;
  nOrangeRoom = 0;
  nGreenRoom = 0;
  nVioletRoom = 0;
  nBlueRoom = 0;
  nPurpleRoom = 0;
  nYellowRoom = 0;
  nFSwipe = 0;
  files = [];
  init = false;
  constructor() {}

  ngOnInit() {}
  csvInputChange(fileInputEvent: any) {
    this.init = true;
    this.completed = false;
    setTimeout(() => {
      this.completed = true;
    }, 2000);
    this.nSwipe = 0;
    this.nGSwipe = 0;
    this.nSSwipe = 0;
    this.nUGSwipe = 0;
    this.nError = 0;
    this.nFSwipe = 0;
    this.nBlueRoom = 0;
    this.nGreenRoom = 0;
    this.nRedRoom = 0;
    this.nVioletRoom = 0;
    this.nOrangeRoom = 0;
    this.nPurpleRoom = 0;
    this.nYellowRoom = 0;
    this.files = [];
    const totalFiles = fileInputEvent.target.files;
    for (let i = 0; i < totalFiles.length; i++) {
      this.files.push(totalFiles[i].name);
      Papa.parse(fileInputEvent.target.files[i], {
        header: false,
        skipEmptyLines: true,
        complete: (result, file) => {
          result.data.forEach((e, i, arr) => {
            if (
              this._isContains(e, ' PType: 2') ||
              this._isContains(e, ' PType: 3') ||
              this._isContains(e, ' PType: 11') ||
              this._isContains(e, ' PType value: 11') ||
              this._isContains(e, ' PType value: 2') ||
              this._isContains(e, ' PType value: 3')
            ) {
              this.nSwipe++;
            }
            if (
              this._isContains(e, ' PType: 2') ||
              this._isContains(e, ' PType value: 2')
            ) {
              this.nUGSwipe++;
            }
            if (
              this._isContains(e, ' PType: 1') ||
              this._isContains(e, ' PType value: 1')
            ) {
              this.nFSwipe++;
            }
            if (
              this._isContains(e, ' PType: 3') ||
              this._isContains(e, ' PType value: 3')
            ) {
              this.nGSwipe++;
            }
            if (
              this._isContains(e, ' PType: 11') ||
              this._isContains(e, ' PType value: 11')
            ) {
              this.nSSwipe++;
            }

            if (
              this._isContains(
                e,
                ' you are unable to book the room : exceeded limit or room has been booked.'
              ) ||
              this._isContains(e, ' you are not undergraduate student.') ||
              this._isContains(
                e,
                ' you are unable to book the room : not undergraduate student.'
              )
            ) {
              this.nError++;
            }
            if (this._isContains(e, ' Red Room')) {
              this.nRedRoom++;
            }
            if (this._isContains(e, ' Orange Room')) {
              this.nOrangeRoom++;
            }
            if (this._isContains(e, ' Blue Room')) {
              this.nBlueRoom++;
            }
            if (this._isContains(e, ' Green Room')) {
              this.nGreenRoom++;
            }
            if (this._isContains(e, ' Violet Room')) {
              this.nVioletRoom++;
            }
            if (this._isContains(e, ' Yellow Room')) {
              this.nYellowRoom++;
            }
            if (this._isContains(e, ' Purple Room')) {
              this.nPurpleRoom++;
            }
          });
        },
      });
    }
  }
  private _isContains(json, value) {
    let contains = false;
    Object.keys(json).some(key => {
      contains =
        typeof json[key] === 'object'
          ? this._isContains(json[key], value)
          : json[key] === value;
      return contains;
    });
    return contains;
  }
}
