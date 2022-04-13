import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './views/layout/nav/nav.component';
import { StartViewComponent } from './views/start-view/start-view.component';
import { BattleViewComponent } from './views/battle-view/battle-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    StartViewComponent,
    BattleViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
