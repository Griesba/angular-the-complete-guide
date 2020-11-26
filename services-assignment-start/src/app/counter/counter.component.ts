import {CounterService} from '../counter.service';
import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UserService} from '../user.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit, OnDestroy {
  count: number;
  users: string[];
  private subscriptionSub: Subscription;

  constructor(private counterService: CounterService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.count = 0;
    this.users = this.userService.activeUsers;
    this.subscriptionSub = this.counterService.totalCount.subscribe(num => {
      this.count += num;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionSub.unsubscribe();
  }


}
