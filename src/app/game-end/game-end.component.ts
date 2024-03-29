import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Player, sortPlayers } from '../Player';
import { winCondition } from '../roles';
import { PlayerTableComponent } from "../player-table/player-table.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-game-end',
    standalone: true,
    templateUrl: './game-end.component.html',
    styleUrl: './game-end.component.css',
    imports: [NgFor, NgIf, PlayerTableComponent, RouterModule]
})
export class GameEndComponent {

  players: Player[] = []
  playersAlive: Player[] = []
  winnerClan: any = {}

  constructor(private router: Router) {}

  ngOnInit() {
    const playersData = localStorage.getItem("players")

    if (!playersData) {
      this.router.navigateByUrl("/home");
      return
    }

    this.players = JSON.parse(playersData)
    this.playersAlive = this.players.filter(player => player.isAlive == true)

    const numLupi = this.playersAlive.reduce(((sum, currPlayer) => currPlayer.clan == "lupo" ? sum+=1 : sum), 0)
    const numUmani = this.playersAlive.reduce(((sum, currPlayer) => currPlayer.clan == "umano" ? sum+=1 : sum), 0)
    let winner = ''
    if (numLupi > numUmani) {
      winner = 'lupo'
    } else if (numLupi == 0) {
      winner= 'umano'
    } else {
      this.router.navigateByUrl("/home");
      return
    }

    this.winnerClan = winCondition.find(obj => obj.clan === winner)
    const a = winCondition.find(obj => obj.clan === winner)
  }

}
