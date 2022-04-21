import { Component, OnInit } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { GameProperties } from 'src/app/model/GamePropertiesModel';
import { Orientation } from 'src/app/model/OrientationEnum';
import { PlayersTurn } from 'src/app/model/PlayersTurnEnum';
import { ResponseModel } from 'src/app/model/ResponseModel';
import { ShipInitialModel } from 'src/app/model/ShipsInitialModel';
import { ShipTypes } from 'src/app/model/ShipTypesEnum';
import { MessageService } from 'src/app/service/message.service';
import { WebsocketService } from 'src/app/service/websocket.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.css']
})
export class StartViewComponent implements OnInit {

  constructor(private webSocketService:WebsocketService, private messageService:MessageService) { 
   }


  rows:number = 5;
  cols:number = 5;
  largeShipsCount:number = 1;
  mediumShipsCount:number = 1;
  smallShipsCount:number = 1;
  firstTurn:PlayersTurn = PlayersTurn.Player1;
  ships: Array<ShipInitialModel> = [];


  ngOnInit(): void {
    this.webSocketService.connToSock()
  }

  startGame() {
    if(!this.isGamePropertiesValid())
      return;
    var message = this.prepareGameProperties();
    this.webSocketService.sendMessage("Start", JSON.stringify(message));
  }

  player1Move() {
    this.webSocketService.sendMessage("Move", JSON.stringify(this.messageService.battleField2Id))
  }

  player2Move() {
    this.webSocketService.sendMessage("Move", JSON.stringify(this.messageService.battleField1Id))
  }

  prepareGameProperties() : GameProperties {
    var properties = new GameProperties(1, 2,this.rows, this.cols, this.firstTurn, this.buildShpis())
    return properties;
  }

  buildShpis() : Array<ShipInitialModel> {
    var largeShips = new ShipInitialModel(ShipTypes.Large, this.largeShipsCount, Orientation.Horizontal);
    var mediumShips = new ShipInitialModel(ShipTypes.Medium, this.mediumShipsCount, Orientation.Vertical);
    var smallShips = new ShipInitialModel(ShipTypes.Small, this.smallShipsCount, Orientation.Horizontal);

    var ships = new Array<ShipInitialModel>();
    ships.push(largeShips, mediumShips, smallShips);
    return ships;
  }

  changeRows(event:any) {
    this.rows = event.value;
  }

  changeCols(event:any) {
    this.cols = event.value;
  }

  changeLargeShips(event:any) {
    this.largeShipsCount = event.value;
  }

  changeMediumShips(event:any) {
    this.mediumShipsCount = event.value;
  }

  changeSmallShips(event:any) {
    this.smallShipsCount = event.value;
  }
  private isGamePropertiesValid() {
    var shipPartCount = this.largeShipsCount * 3 + this.mediumShipsCount * 2 + this.smallShipsCount;
    var cellCount = this.cols * this.rows;
    console.log(cellCount)
    if(shipPartCount / cellCount > 0.7){
      alert("You cant use more than 70% of battlefield")
      return false;
    } else if(shipPartCount < 1) {
      alert("Select a ship")
      return false;
    }
    return true;
  }

}
