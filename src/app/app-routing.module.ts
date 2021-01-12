import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamePageComponent } from './game-page/game-page.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {path : '', component : MainPageComponent,pathMatch : 'full'},
  {path : 'game' , component : GamePageComponent},
  {path : '**',redirectTo:'',pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
