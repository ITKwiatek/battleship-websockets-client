import { Injectable } from '@angular/core';
import { ClientState } from '../model/ClientStateEnum';
import { GameStatus } from '../model/GameStatusEnum';

@Injectable({
  providedIn: 'root'
})
export class ClientStateService {

  constructor() {}

  properties = document.getElementById('gameProperties')as HTMLDivElement;
  startButton = document.getElementById('startButton')as HTMLButtonElement;
  player1Button = document.getElementById('player1Button')as HTMLButtonElement;
  player2Button = document.getElementById('player2Button')as HTMLButtonElement;
  gameStateInfo = document.getElementById('gameStateInfo')as HTMLElement;

  UpdateState(state: ClientState) {
    this.UpdateGameStateInfo(state);
    switch (state) {
      case ClientState.ConnectionClosed:
        this.ClearBattleFields()
        this.disableElement(this.startButton);
        this.disableElement(this.properties);
        this.disableElement(this.player1Button);
        this.disableElement(this.player2Button);
        break;
      case ClientState.Player1Move:
        this.disableElement(this.startButton);
        this.disableElement(this.properties);
        this.enableElement(this.player1Button);
        this.disableElement(this.player2Button);
        break;
      case ClientState.Player2Move:
        this.disableElement(this.startButton);
        this.disableElement(this.properties);
        this.disableElement(this.player1Button);
        this.enableElement(this.player2Button);
        break;
      case ClientState.Player1Won:
        this.enableElement(this.startButton);
        this.enableElement(this.properties);
        this.disableElement(this.player1Button);
        this.disableElement(this.player2Button);
        alert("Player 1 won")
        this.UpdateState(ClientState.PrepareGame)
        break;
      case ClientState.Player2Won:
        this.enableElement(this.startButton);
        this.enableElement(this.properties);
        this.disableElement(this.player1Button);
        this.disableElement(this.player2Button);
        alert("Player 2 won")
        this.UpdateState(ClientState.PrepareGame)
        break;
      case ClientState.PrepareGame:
        this.ClearBattleFields()
        this.enableElement(this.startButton);
        this.enableElement(this.properties);
        this.disableElement(this.player1Button);
        this.disableElement(this.player2Button);
        break;
    }
  }

  private disableElement(elem: HTMLElement) {
    if(elem instanceof HTMLButtonElement) {
      elem.disabled = true;
    } else if(elem instanceof HTMLDivElement) {
      elem.style.pointerEvents = 'none';
      elem.style.filter = 'brightness(50%)'
    }
  }

  private enableElement(elem: HTMLElement) {
    if(elem instanceof HTMLButtonElement) {
      elem.disabled = false;
    } else if(elem instanceof HTMLDivElement) {
      elem.style.pointerEvents = 'auto';
      elem.style.filter = 'brightness(100%)'
    }
  }

  private UpdateGameStateInfo(state:ClientState) {
    this.gameStateInfo.innerText = ClientState[state]
  }

  private ClearBattleFields() {
    var cellButtons = document.getElementsByClassName('cell') as HTMLCollectionOf<HTMLButtonElement>;

    for(let i=0; i<cellButtons.length; i++) {
      cellButtons[i].style.backgroundColor = '#80d8ff'
      cellButtons[i].getElementsByClassName('shipIcon')[0].innerHTML = '';
    }
  }
}
