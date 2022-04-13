import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BattleViewComponent } from './views/battle-view/battle-view.component';
import { StartViewComponent } from './views/start-view/start-view.component';

const routes: Routes = [
  {
    path:'',
    component:StartViewComponent
  },
  {
    path:'battle',
    component:BattleViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
