import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // show 'statble' on the gui after 2 second
  appStatus = new Promise((resolve, reject) => {
   setTimeout(() => resolve('stable'), 2000);
  } );

  servers = [
    {
      instanceType: 'medium',
      name: 'Production Server',
      status: 'stable',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'large',
      name: 'User Database',
      status: 'stable',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'small',
      name: 'Development Server',
      status: 'offline',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'small',
      name: 'Testing Environment Server',
      status: 'stable',
      started: new Date(15, 1, 2017)
    }
  ];
  filteredStatus = '';
  getStatusClasses(server: {instanceType: string, name: string, status: string, started: Date}) {
    return {
      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical'
    };
  }

  addNewServer() {
    const instances = ['small', 'medium', 'large'];
    const statuses = ['stable', 'offline'];
    const instanceId = Math.round(Math.random() * 10) % 3;
    const statusId = Math.round(Math.random() * 10) % 2;
    const randomName = Math.random().toString(36).substring(2);
    this.servers.push({
      instanceType: instances[instanceId],
      name: randomName,
      status: statuses[statusId],
      started: new Date(15, 1, 2017)
    });
  }
}
