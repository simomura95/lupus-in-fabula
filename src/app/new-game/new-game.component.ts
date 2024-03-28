import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Player, sortPlayers} from '../Player';
import { rolesByPlayerNum, roles, numPlayersMin, numPlayersMax } from '../roles';
import { Router } from '@angular/router';

// Funzione di supporto per mescolare a caso gli elementi di un array, utilizzando l'algoritmo di Fisher-Yates (o Knuth Shuffle)
function shuffleArray<T>(array: T[]): T[] {
  const newArray = array.slice(); // Copia dell'array originale per non modificarlo direttamente
  for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Scambio casuale tra due elementi
  }
  return newArray;
}

// funzione di supporto per mettere i nomi in minuscolo, eccetto la prima lettera (title case)
function toTitleCase(s: string): string {
  return s.slice(0,1).toUpperCase() + s.slice(1).toLowerCase()
}

@Component({
  selector: 'app-new-game',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.css'
})
export class NewGameComponent {

  constructor(private router: Router) {}

  numPlayersMin = numPlayersMin
  numPlayersMax = numPlayersMax
  roles: string[] = [];
  
  // prima, selezionare il numero di giocatori
  step: number = 1;

  // TODO: cambiare in 8 quando funziona!!
  playersNum: number = 8;

  submitPlayersNum() {
    this.roles = shuffleArray(rolesByPlayerNum.splice(0, this.playersNum))
    this.step = 2;
  }


  // poi, ognuno si inserisce e gli viene subito assegnato il ruolo
  names: string[] = [] // suppporto per evitare che si inseriscano nomi doppi, così posso usarli come id
  players: Player[] = [];
  newPlayer: Player = new Player()
  newPlayerSubmitted = false;

  submitNewPlayer() {
    this.newPlayerSubmitted = true
    if (this.isNewPlayerNameUnique()) {
      this.newPlayer.name = toTitleCase(this.newPlayer.name)
      this.names.push(this.newPlayer.name)
      // name si popola dal form, isAlive = true come condizione di partenza
      this.newPlayer.role = this.roles.pop()! // ! per non avere problemi di tipo (non mi è mai undefined)
      const roleDetails = roles.find((role) => role.name == this.newPlayer.role)
      if (roleDetails) { // dovrei averli sempre
        this.newPlayer.description = roleDetails.description
        this.newPlayer.clan = roleDetails.clan
      }
    }
  }

  nextPlayer() {
    this.players.push(this.newPlayer);
    if (this.players.length < this.playersNum) {
      // resetto giocatore e continuo a inserire
      this.newPlayer = new Player()
      this.newPlayerSubmitted = false  
    } else {
      this.step = 3
    }
  }

  isNewPlayerNameUnique(): boolean {
    return !this.names.includes(toTitleCase(this.newPlayer.name));
  }

  startGame() {
    this.players = sortPlayers(this.players, 'name')
    localStorage.setItem("players", JSON.stringify(this.players))
    localStorage.setItem("time", 'night')
    localStorage.setItem("dayNumber", '1')
    this.router.navigateByUrl("/night");
  }
}
