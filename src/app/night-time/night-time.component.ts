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
  playersDead: Player[] = []

  currRole: string =''
  currPlayers: Player[] = []
  turnAwake: number = 0
  targets: Targets = {} // contiene tutti i bersagli dei vari turni, da elaborare a fine nottata
  currTargetName: string = ''
  currTargetPlayer: Player = new Player()

  showInfo: boolean = false // alcuni ruoli (es. veggente) richiedono di mostrare alcune info a schermo)

  ngOnInit() {
    const playersData = localStorage.getItem("players")
    if (playersData) {
      this.players = JSON.parse(playersData)
      console.log(this.players)
      this.playersAlive = this.players.filter(player => player.isAlive == true)
      this.playersDead = this.players.filter(player => player.isAlive == false)
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
      this.endNight()
    } else {
      this.currRole = rolesByTurn[this.turnAwake-1]
      const foundPlayers = this.playersAlive.filter(player => player.role === this.currRole);
      if (foundPlayers) {
        this.currPlayers = foundPlayers;
      } else {
        console.log("Nessun giocatore!") // se quel ruolo non c'è (sono tutti morti)
      }
    }
  }

  submitTarget() {
    const playerFound = this.players.find(player => player.name == this.currTargetName)
    if (playerFound) {
      this.currTargetPlayer = playerFound
    }
    console.log(this.currRole)
    this.showInfo = true
    if (this.currRole == 'veggente') { // se veggente, devo e mi è sufficiente mostrarlo a schermo
      
      console.log(this.currRole, this.showInfo)
      console.log(this.currTargetPlayer)
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
  endNight() {
    console.log(this.targets)
    let lupoTarget = this.targets['lupoTarget']
    let donnacciaTarget = this.targets['donnacciaTarget']
    let guardiaTarget = this.targets['guardiaTarget']

    // se lupo non ha bersagliato quello della guardia nè la donnaccia, il bersaglio è morto
    if (lupoTarget && lupoTarget != guardiaTarget && lupoTarget.role != 'donnaccia') {
        lupoTarget.isAlive = false
    }

    // se la donnaccia è andata con un lupo, è morta (ed evidentemente, se aveva un target, prima era viva)
    if (donnacciaTarget && donnacciaTarget.role == "lupo") {
      this.players.find(player => player.role == "donnaccia")!.isAlive = false
    }

    console.log(this.players)
    this.router.navigateByUrl("/day");
  }
}
