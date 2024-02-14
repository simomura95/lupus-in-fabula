import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Player} from '../Player';
import { rolesByTurn } from '../roles';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

interface Targets {
  [key: string]: any;
}

@Component({
  selector: 'app-night-time',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './night-time.component.html',
  styleUrl: './night-time.component.css'
})
export class NightTimeComponent {

  constructor(private router: Router) {}

  players: Player[] = []
  playersAlive: Player[] = []
  playersDead: Player[] = []

  currRole: string =''
  currPlayers: Player[] = []
  turnAwake: number = 0
  targets: Targets = {} // contiene tutti i bersagli dei vari turni, da elaborare a fine nottata
  currTarget: Player = new Player()

  ngOnInit() {
    const playersData = localStorage.getItem("players")
    if (playersData) {
      this.players = JSON.parse(playersData)
      console.log(this.players)
      this.playersAlive = this.players // inizialmente sono tutti vivi
      this.nextPlayerAwake()
    }
    else {
      this.router.navigateByUrl("/home");
    }
  }

  nextPlayerAwake() {
    this.turnAwake++
    this.currRole = rolesByTurn[this.turnAwake-1]
    const foundPlayers = this.playersAlive.filter((player) => player.role === this.currRole);
    if (foundPlayers) {
      this.currPlayers = foundPlayers;
    } else {
      console.log("Nessun giocatore!") // se quel ruolo non c'è (sono tutti morti)
    }
  }

  submitTarget() {
    this.targets[this.currRole + "Target"] = this.currTarget
    console.log(this.targets)
    this.currTarget = new Player()
    this.nextPlayerAwake()
  }

  //   switch (this.currRole) {
  //     case ("lupo"): azioneLupo()
  //   }
  // }

  // azioneLupo() {

  // }
}
