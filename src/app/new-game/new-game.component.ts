import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Player} from '../Player';
import { rolesByPlayerNum, rules } from '../roles';
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

@Component({
  selector: 'app-new-game',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.css'
})
export class NewGameComponent {

  constructor(private router: Router) {}

  roles: string[] = [];
  
  // prima, selezionare il numero di giocatori
  step: number = 1;

  // TODO: cambiare in 8 quando funziona!!
  playersNum: number = 5;

  submitPlayersNum() {
    // console.log(this.playersNum)
    this.roles = shuffleArray(rolesByPlayerNum.splice(0, this.playersNum))
    this.step = 2;
  }


  // poi, ognuno si inserisce e gli viene subito assegnato il ruolo
  players: Player[] = [];
  newPlayer: Player = new Player()
  newPlayerSubmitted = false;
  description = '';

  submitNewPlayer() {
    // console.log(this.roles);
    this.newPlayerSubmitted = true
    // name si popola dal form, isAlive = true come condizione di partenza
    this.newPlayer.role = this.roles.pop()! // ! per non avere problemi di tipo (non mi è mai undefined)
    let roleDescription = rules.find((role) => role.name == this.newPlayer.role)!.description
    this.newPlayer.description = roleDescription
    this.players.push(this.newPlayer);
  }

  resetNewPlayer() {
    this.newPlayer = new Player()
    this.newPlayerSubmitted = false
  }

  startGame() {
    localStorage.setItem("players", JSON.stringify(this.players))
    console.log(localStorage.getItem("players"))
    this.router.navigateByUrl("/night");
  }
}
