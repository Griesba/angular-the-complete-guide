import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';


export class CounterService {
  counterEvent = new EventEmitter<number>();

  totalCount: Subject <number>();

  getCount() {
    return this.totalCount;
  }

  incrementCount() {
    this.totalCount++;
    console.log(this.totalCount);
  }

  decreaseCount() {
    this.totalCount--;
  }

  clearCount() {
    this.totalCount = 0;
  }
}
