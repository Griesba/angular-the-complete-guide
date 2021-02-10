import {Injectable} from '@angular/core';

// this service is here to point out the fact that services behave differently when they are loaded in lazy or eager mode.
// we should be aware on the fact that a service can have one instance available in all the application
// or several instance for each module lazily loaded or eagerly depending on whether the service is loaded lazily or eagerly
// @Injectable({providedIn: 'root'}) this is to provide the service in all the app with one unique instance
export class LoggingService {

  lastLog: string;

  printLog(message: string) {
    console.log('current log: ', message);
    console.log('previous log: ', this.lastLog);
    this.lastLog = message;
  }
}
