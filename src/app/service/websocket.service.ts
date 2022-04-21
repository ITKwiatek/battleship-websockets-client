import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClientState } from '../model/ClientStateEnum';
import { ResponseModel } from '../model/ResponseModel';
import { WebSocketSates } from '../model/WebSocketStatesEnum';
import { ClientStateService } from './client-state.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private messageService:MessageService;
  private stateService:ClientStateService;
  constructor(injector:Injector) { 
    setTimeout(() => this.messageService = injector.get(MessageService));
  }

  connId : string;
  socket : WebSocket;

  connToSock(){
    this.socket = new WebSocket(environment.apiUrl);
    this.stateService = new ClientStateService();
    this.socket.onopen = event => {
      this.stateService.UpdateState(ClientState.PrepareGame);
    }
    this.socket.onerror = event => {
      this.stateService.UpdateState(ClientState.ConnectionClosed);
    }
    this.socket.onmessage = event => {
      this.messageService.ReadMessage(event.data)
    }
    this.socket.onclose = event => {
      this.stateService.UpdateState(ClientState.ConnectionClosed);
    }
  }

  sendMessage(command : string, message : string) {
    var response = new ResponseModel(this.connId, message, command)
    this.socket.send(JSON.stringify(response));
  }
}
