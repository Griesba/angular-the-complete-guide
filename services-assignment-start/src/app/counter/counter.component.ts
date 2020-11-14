import {CounterService} from '../counter.service';
import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  count : Observable<number>();
  users: string[];

  constructor(private counterService: CounterService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.count = this.counterService.loadCounterObservable();
  }

}
