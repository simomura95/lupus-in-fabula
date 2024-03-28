import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Player } from '../Player';
import { PlayerTableComponent } from "../player-table/player-table.component";

@Component({
    selector: 'app-game-end',
    standalone: true,
    templateUrl: './game-end.component.html',
    styleUrl: './game-end.component.css',
    imports: [PlayerTableComponent, RouterModule]
})
export class GameEndComponent {

  players: Player[] = []
  playersAlive: Player[] = []
  winnerClan: string = ''

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
    if (numLupi > numUmani) {
      this.winnerClan = 'lupo'
    } else {
      this.winnerClan = 'umano'
    }

  }




}
