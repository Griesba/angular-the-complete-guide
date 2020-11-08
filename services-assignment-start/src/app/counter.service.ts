import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  totalCount = 0;

  constructor() { }

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
