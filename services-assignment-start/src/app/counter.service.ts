import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  totalCount: Subject <number>();

  constructor() { }

  loadCounterObservable() {
    this.totalCount.asObservable();
  }

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
