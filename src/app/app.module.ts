import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartViewComponent } from './views/start-view/start-view.component';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { WebsocketService } from './service/websocket.service';
import { MessageService } from './service/message.service';


@NgModule({
  declarations: [
    AppComponent,
    StartViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatRadioModule ,
    FormsModule
  ],
  providers: [WebsocketService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
