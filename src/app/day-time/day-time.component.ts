import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../Player';
import { NgFor } from '@angular/common';
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
    imports: [NgFor, FormsModule, PlayerTableComponent]
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
    const playersData = localStorage.getItem("players")
    if (playersData) {
      this.players = JSON.parse(playersData)
      console.log(this.players)
      this.playersAlive = this.players.filter(player => player.isAlive == true)
      this.playerVotes = this.playersAlive.map(player => {
        return {"name": player.name, "votes": 0}
      })
    }
    else {
      this.router.navigateByUrl("/home");
    }
  }

  submitVotes() {
    if (this.validTotalVotes()) {
      console.log(this.playerVotes)
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
    return (this.playerVotes.map(player => player.votes)).reduce((sum, current) => sum + current)
  }

  validTotalVotes() {
    return this.countTotalVotes() == this.playersAlive.length
  }

  killPlayerEndDay() {
    console.log(this.playersToKill)
    this.playerKilled = this.playersAlive.find(player => player.name == this.playersToKill[0].name)! // con quell'if ho sicuramente un risultato da qui
    this.playerKilled.isAlive = false
    this.playersAlive = this.playersAlive.filter(player => player.isAlive == true)
  }

  goToNight() {
    console.log(this.players)
    localStorage.setItem("players", JSON.stringify(this.players))
    if (this.isGameOver()) {
      this.router.navigateByUrl("/game-end");
    } else {
      this.router.navigateByUrl("/night");
    }
  }

  isGameOver(): boolean {
    const numLupi = this.playersAlive.reduce(((sum, currPlayer) => currPlayer.clan == "lupo" ? sum+=1 : sum), 0)
    const numUmani = this.playersAlive.reduce(((sum, currPlayer) => currPlayer.clan == "umano" ? sum+=1 : sum), 0)
    console.log("lupi: " + numLupi + ", umani: " + numUmani)
    return (numLupi > numUmani || numLupi == 0)
  }
}
