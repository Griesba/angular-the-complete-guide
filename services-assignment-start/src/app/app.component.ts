import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {CounterService} from './counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, CounterService]
})
export class AppComponent implements OnInit {

  constructor(private counterService: CounterService) {
  }

  ngOnInit(): void {
    this.counterService.counterEvent.subscribe(() => this.counterService.incrementCount());
  }



}
