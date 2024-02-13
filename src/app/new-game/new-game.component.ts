import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

interface Player {
  name: string,
  role: string,
  isAlive: boolean
}

@Component({
  selector: 'app-new-game',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.css'
})
export class NewGameComponent {

  // prima, selezionare il numero di giocatori
  step: number = 1;

  // TODO: cambiare 2 in 8 quando funziona!!
  playersNum: number = 2;

  submitPlayersNum() {
    console.log(this.playersNum);
    this.step = 2
  }


  // poi, ognuno si inserisce e gli viene subito assegnato il ruolo
  players: Player[] = [];
  newPlayer: Player = {name: '', role: '', isAlive: true}
  newPlayerSubmitted = false;

  submitNewPlayer() {
    console.log(this.newPlayer.name);
    this.newPlayerSubmitted = true
    this.newPlayer.role = 'prova'
    this.players.push(this.newPlayer);
  }

  resetNewPlayer() {
    this.newPlayer = {name: '', role: '', isAlive: true}
    this.newPlayerSubmitted = false
  }

  startGame() {

  }
}
