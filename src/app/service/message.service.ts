import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { MessageTypes } from '../model/MessageTypes.Enum';
import { ResponseModel } from '../model/ResponseModel';
import { GameStatus } from '../model/GameStatusEnum';
import { PlayersTurn } from '../model/PlayersTurnEnum';
import { ClientStateService } from './client-state.service';
import { ClientState } from '../model/ClientStateEnum';
import { ShipTypes } from '../model/ShipTypesEnum';

element:HTMLElement;

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private wsService:WebsocketService) { }

  battleField1Id:number;
  battleField2Id:number;

  async ReadMessage (jsonString:string) {
    var obj = JSON.parse(jsonString);
    console.log(obj)
    switch(obj.ResponseType)
    {
      case MessageTypes.Connected:
        this.wsService.connId = obj.ConnId;
        break;
      case MessageTypes.Start:
        this.battleField1Id = obj.BattleField1Id
        this.battleField2Id = obj.BattleField2Id
        var stateService = new ClientStateService();
        if(obj.PlayerTurn == PlayersTurn.Player1)
          stateService.UpdateState(ClientState.Player1Move)
        else
          stateService.UpdateState(ClientState.Player2Move)
        break;
      case MessageTypes.Move:
        await this.tryToHitShip(obj);
        this.checkWin(obj);
        break;
    }
  }

  async tryToHitShip(move:any) {
    if(move.ShipHitted)
      await this.shipHited(move.Col, move.Row, move.BattleFieldId, move.ShipType)
    else
      this.shipMissed(move.Col, move.Row, move.BattleFieldId)
  }

  async shipHited(col:number, row:number, battleFieldId:number, shipType:ShipTypes) {
    let buttonId = this.generateButtonId(col,row,battleFieldId);
    const button = document.getElementById(buttonId) as HTMLButtonElement;
    var icon = button.getElementsByClassName('shipIcon')[0] as HTMLElement;

    icon.innerHTML = 'sailing';

    if(shipType == ShipTypes.Large)
      button.style.backgroundColor = 'red';
    else if(shipType == ShipTypes.Medium)
      button.style.backgroundColor = 'yellow';
    else if(shipType == ShipTypes.Small)
      button.style.backgroundColor = 'green';
  }

  shipMissed(col:number, row:number, battleFieldId:number) {
    let buttonId = this.generateButtonId(col,row,battleFieldId);
    const button = document.getElementById(buttonId)!;
    button.style.backgroundColor = 'darkgrey';
    var icon = button.getElementsByClassName('shipIcon')[0] as HTMLElement;
    icon.innerHTML = 'close';
  }

  generateButtonId(col:number, row:number, battleFieldId:number) {
    let bfNumber;
    if(battleFieldId == this.battleField1Id)
      bfNumber = 1;
    else
      bfNumber = 2;
    return `bf${bfNumber}c${col}r${row}`;
  }

  async checkWin(move:any) {
    var stateService = new ClientStateService();

    if(move.GameStatus == GameStatus.Open){
      if(move.BattleFieldId == this.battleField1Id)
        stateService.UpdateState(ClientState.Player1Move)
      else
        stateService.UpdateState(ClientState.Player2Move)
    }else if(move.GameStatus == GameStatus.Player1Won) {
      await this.delay(500);
      stateService.UpdateState(ClientState.Player1Won);
    } else if(move.GameStatus == GameStatus.Player2Won) {
      await this.delay(500);
      stateService.UpdateState(ClientState.Player2Won)
    }
  }

  delay(time:number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}
