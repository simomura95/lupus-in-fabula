import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Player} from '../Player';
import { rolesByTurn } from '../roles';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

interface Targets {
  [key: string]: Player;
}

@Component({
  selector: 'app-night-time',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './night-time.component.html',
  styleUrl: './night-time.component.css'
})
export class NightTimeComponent {

  constructor(private router: Router) {}

  players: Player[] = []
  playersAlive: Player[] = []

  currRole: string =''
  currPlayers: Player[] = []
  turnAwake: number = 0
  targets: Targets = {} // contiene tutti i bersagli dei vari turni, da elaborare a fine nottata
  currTargetName: string = ''
  currTargetPlayer: Player = new Player()
  playersKilled: Player[] | undefined;

  showInfo: boolean = false // alcuni ruoli (es. veggente) richiedono di mostrare alcune info a schermo)

  ngOnInit() {
    const playersData = localStorage.getItem("players")
    if (playersData) {
      this.players = JSON.parse(playersData)
      console.log(this.players)
      this.playersAlive = this.players.filter(player => player.isAlive == true)
      this.nextPlayerAwake()
    }
    else {
      this.router.navigateByUrl("/home");
    }
  }

  nextPlayerAwake() {
    this.turnAwake++
    if (this.turnAwake > rolesByTurn.length) {
      // calcola morti e concludi notte
      this.killPlayersEndNight()
    } else {
      this.currRole = rolesByTurn[this.turnAwake-1]
      console.log(this.playersAlive)
      const foundPlayers = this.playersAlive.filter(player => player.role === this.currRole);
      if (foundPlayers.length > 0) {
        this.currPlayers = foundPlayers;
      } else {
        this.currPlayers = []
        console.log("Nessun giocatore!") // se quel ruolo non c'è (sono tutti morti)
      }
    }
  }

  submitTarget() {
    const playerFound = this.playersAlive.find(player => player.name == this.currTargetName)
    if (playerFound) {
      this.currTargetPlayer = playerFound
    }
    console.log(this.currRole)

    if (this.currRole == 'veggente') { // se veggente, devo e mi è sufficiente mostrarlo a schermo
      this.showInfo = true
    } else { // altrimenti lo inserisco per le elaborazioni di fine notte
      this.targets[this.currRole + "Target"] = this.currTargetPlayer
      this.continue()
    }
  }

  continue() {
    this.currTargetName = ''
    this.currTargetPlayer = new Player()
    this.showInfo = false
    this.nextPlayerAwake()
  }

  // function principale per la notte, calcola l'esito
  killPlayersEndNight() {
    console.log(this.targets)
    this.playersKilled = []
    let lupoTarget = this.targets['lupoTarget']
    let donnacciaTarget = this.targets['donnacciaTarget']
    let guardiaTarget = this.targets['guardiaTarget']

    // se lupo non ha bersagliato quello della guardia nè la donnaccia, il bersaglio è morto
    if (lupoTarget && lupoTarget != guardiaTarget && lupoTarget.role != 'donnaccia') {
        lupoTarget.isAlive = false
        this.playersKilled.push(lupoTarget)
    }

    // se la donnaccia è andata con un lupo, oppure con il bersaglio del lupo, è morta (ed evidentemente, se aveva un target, prima era viva)
    if (donnacciaTarget && (donnacciaTarget.role == "lupo" || donnacciaTarget == lupoTarget)) {
      let donnaccia = this.playersAlive.find(player => player.role == "donnaccia")! // se ha bersagliato qualcuno, esiste
      donnaccia.isAlive = false
      this.playersKilled.push(donnaccia)
    }

    this.playersAlive = this.playersAlive.filter(player => player.isAlive == true)
  }

  goToDay() {  
    console.log(this.players)
    localStorage.setItem("players", JSON.stringify(this.players))
    if (this.isGameOver()) {
      this.router.navigateByUrl("/game-end");
    } else {
      this.router.navigateByUrl("/day");
    }
    // TODO: componente fine partita + tenere conto del numero di notte/giorno
  }

  isGameOver(): boolean {
    const numLupi = this.playersAlive.reduce(((sum, currPlayer) => currPlayer.clan == "lupo" ? sum+=1 : sum), 0)
    const numUmani = this.playersAlive.reduce(((sum, currPlayer) => currPlayer.clan == "umano" ? sum+=1 : sum), 0)
    // console.log(this.players)
    // console.log(this.playersAlive)
    // console.log("lupi: " + numLupi + ", umani: " + numUmani)
    return (numLupi > numUmani || numLupi == 0)
  }
}
