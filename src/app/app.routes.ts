import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewGameComponent } from './new-game/new-game.component';

export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "new-game", component: NewGameComponent },
  { path: "", redirectTo: "/home", pathMatch: "full"}
];
