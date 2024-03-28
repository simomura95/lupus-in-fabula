import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewGameComponent } from './new-game/new-game.component';
import { NightTimeComponent } from './night-time/night-time.component';
import { DayTimeComponent } from './day-time/day-time.component';
import { GameEndComponent } from './game-end/game-end.component';
import { RulesComponent } from './rules/rules.component';

export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "new-game", component: NewGameComponent },
  { path: "night", component: NightTimeComponent },
  { path: "day", component: DayTimeComponent },
  { path: "game-end", component: GameEndComponent },
  { path: "rules", component: RulesComponent },
  { path: "", redirectTo: "/home", pathMatch: "full"}
];
