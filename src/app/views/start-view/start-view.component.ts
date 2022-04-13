import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

declare function wsConnect(apiUrl:string):any;
declare function sendData(data:string):any;


@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.css']
})
export class StartViewComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

  wsConnection() {
    wsConnect(environment.apiUrl);
  }

  wsSendData() {
    sendData("asdadadsdasaddadas");
  }

}
