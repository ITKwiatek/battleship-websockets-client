import { Component, OnInit } from '@angular/core';

declare function sendData(data:any):void;

@Component({
  selector: 'app-battle-view',
  templateUrl: './battle-view.component.html',
  styleUrls: ['./battle-view.component.css']
})
export class BattleViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  wsSendData() {
    sendData("asasdasdasdas");
  }

}
