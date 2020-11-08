import {CounterService} from '../counter.service';
import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  count = 0;
  users: string[];

  constructor(private counterService: CounterService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.count = this.counterService.totalCount;
    this.users = this.userService.activeUsers;
  }

}
