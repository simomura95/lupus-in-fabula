import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../Player';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerTableComponent } from "../player-table/player-table.component";

interface PlayerVotes {
  "name": string,
  "votes": number
}

@Component({
    selector: 'app-day-time',
    standalone: true,
    templateUrl: './day-time.component.html',
    styleUrl: './day-time.component.css',
    imports: [NgFor, NgIf, FormsModule, PlayerTableComponent]
})
export class DayTimeComponent {

  constructor(private router: Router) {}

  players: Player[] = []
  playersAlive: Player[] = []

  playerVotes: PlayerVotes[] = []
  playersToKill: PlayerVotes[] = []
  playerKilled: Player = new Player()
  abilitaKillRandom: boolean = false

  ngOnInit() {
    const dayNumberData = localStorage.getItem('dayNumber')
    const timeData = localStorage.getItem('time')
    const playersData = localStorage.getItem("players")
    if (timeData && timeData == 'night') { // validazione se uno prova a cambiare l'url
      this.router.navigateByUrl("/night");
      return
    }

    if (playersData && dayNumberData && timeData) {
      this.players = JSON.parse(playersData)
      this.playersAlive = this.players.filter(player => player.isAlive == true)
      if (this.isGameOver()) { // validazione se uno prova a cambiare l'url dopo fine gioco
        this.router.navigateByUrl("/game-end");
        return
      }
      this.playerVotes = this.playersAlive.map(player => {
        return {"name": player.name, "votes": 0}
      })
    }
    else {
      this.router.navigateByUrl("/home");
      return
    }
  }

  submitVotes() {
    if (this.validTotalVotes()) {
      const maxVotes = this.playerVotes.reduce((prev, curr) => (prev && prev.votes > curr.votes) ? prev : curr).votes
      this.playersToKill = this.playerVotes.filter(player => player.votes == maxVotes)

      if (this.playersToKill.length == 1) { // ho una persona con più voti degli altri
        this.killPlayerEndDay()
      } else { // spareggio
        this.playerVotes = this.playersToKill.map(player => {return {"name": player.name, "votes": 0}})
        this.abilitaKillRandom = true // se non si riesce a risolvere spareggio
      }
    }
  }

  killRandom() {
    const randomPlayer = this.playerVotes[Math.floor(Math.random() * this.playerVotes.length)]
    this.playersToKill = [randomPlayer]
    this.killPlayerEndDay()
  }

  countTotalVotes() {
    return (this.playerVotes.map(player => player.votes)).reduce((sum, current) => sum + current, 0)
  }

  validTotalVotes() {
    return this.countTotalVotes() == this.playersAlive.length
  }

  killPlayerEndDay() {
    this.playerKilled = this.playersAlive.find(player => player.name == this.playersToKill[0].name)! // con quell'if ho sicuramente un risultato da qui
    this.playerKilled.isAlive = false
    this.playersAlive = this.playersAlive.filter(player => player.isAlive == true)
  }

  goToNight() {
    localStorage.setItem("players", JSON.stringify(this.players))
    if (this.isGameOver()) {
      this.router.navigateByUrl("/game-end");
    } else {
      localStorage.setItem('time', 'night')
      this.router.navigateByUrl("/night");
    }
  }

  isGameOver(): boolean {
    const numLupi = this.playersAlive.reduce(((sum, currPlayer) => currPlayer.clan == "lupo" ? sum+=1 : sum), 0)
    const numUmani = this.playersAlive.reduce(((sum, currPlayer) => currPlayer.clan == "umano" ? sum+=1 : sum), 0)
    return (numLupi > numUmani || numLupi == 0)
  }
}
