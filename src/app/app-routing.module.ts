import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartViewComponent } from './views/start-view/start-view.component';

const routes: Routes = [
  {
    path:'',
    component:StartViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
