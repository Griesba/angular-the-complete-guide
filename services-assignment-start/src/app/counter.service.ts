import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  counterEvent = new EventEmitter<number>();

  totalCount = new Subject <number>();

}
