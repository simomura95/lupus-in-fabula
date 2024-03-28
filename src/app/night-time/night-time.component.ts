import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../Player';
import { roleOrder, rolesByPlayerNum } from '../roles';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { PlayerTableComponent } from "../player-table/player-table.component";

interface Targets {
  [key: string]: Player;
}

@Component({
    selector: 'app-night-time',
    standalone: true,
    templateUrl: './night-time.component.html',
    styleUrl: './night-time.component.css',
    imports: [FormsModule, NgFor, NgIf, PlayerTableComponent]
})
export class NightTimeComponent {

  constructor(private router: Router) {}

  dayNumber: number = 0
  players: Player[] = []
  playersAlive: Player[] = []

  rolesByTurn: string[] = []
  currRole: string =''
  currPlayers: Player[] = []
  turnAwake: number = 0
  targets: Targets = {} // contiene tutti i bersagli dei vari turni, da elaborare a fine nottata
  currTargetName: string = ''
  currTargetPlayer: Player = new Player()
  playersKilled: Player[] | undefined;

  showInfo: boolean = false // alcuni ruoli (es. veggente) richiedono di mostrare alcune info a schermo)

  ngOnInit() {
    const dayNumberData = localStorage.getItem('dayNumber')
    const timeData = localStorage.getItem('time')
    const playersData = localStorage.getItem("players")
    if (timeData && timeData == 'day') { // validazione se uno prova a cambiare l'url
      this.router.navigateByUrl("/day");
      return
    }

    if (playersData && dayNumberData && timeData) {
      this.dayNumber = Number(dayNumberData)
      this.players = JSON.parse(playersData)
      this.playersAlive = this.players.filter(player => player.isAlive == true)
      if (this.isGameOver()) { // validazione se uno prova a cambiare l'url dopo fine gioco
        this.router.navigateByUrl("/game-end");
        return
      }
      this.rolesByTurn = roleOrder.filter(role => rolesByPlayerNum.slice(0, this.players.length).includes(role) && role != 'contadino')
      this.nextPlayerAwake()
    } else {
      this.router.navigateByUrl("/home");
      return
    }

  }

  nextPlayerAwake() {
    this.turnAwake++
    if (this.turnAwake > this.rolesByTurn.length) {
      // calcola morti e concludi notte
      this.killPlayersEndNight()
    } else {
      this.currRole = this.rolesByTurn[this.turnAwake-1]
      const foundPlayers = this.playersAlive.filter(player => player.role === this.currRole);
      if (foundPlayers.length > 0) {
        this.currPlayers = foundPlayers;
      } else {
        this.currPlayers = [] // se quel ruolo non c'è (sono tutti morti)
      }
    }
  }

  submitTarget() {
    const playerFound = this.playersAlive.find(player => player.name == this.currTargetName)
    if (playerFound) {
      this.currTargetPlayer = playerFound
    }

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
    // a meno che il bersaglio del lupo non sia anche il bersaglio della guardia
    if (donnacciaTarget && (donnacciaTarget.role == "lupo" || (donnacciaTarget == lupoTarget && donnacciaTarget != guardiaTarget))) {
      let donnaccia = this.playersAlive.find(player => player.role == "donnaccia")! // se ha bersagliato qualcuno, esiste
      donnaccia.isAlive = false
      this.playersKilled.push(donnaccia)
    }

    this.playersAlive = this.playersAlive.filter(player => player.isAlive == true)
  }

  goToDay() {  
    localStorage.setItem("players", JSON.stringify(this.players))
    if (this.isGameOver()) {
      this.router.navigateByUrl("/game-end");
    } else {
      localStorage.setItem('time', 'day')
      localStorage.setItem('dayNumber', String(this.dayNumber++))
      this.router.navigateByUrl("/day");
    }
  }

  isGameOver(): boolean {
    const numLupi = this.playersAlive.reduce(((sum, currPlayer) => currPlayer.clan == "lupo" ? sum+=1 : sum), 0)
    const numUmani = this.playersAlive.reduce(((sum, currPlayer) => currPlayer.clan == "umano" ? sum+=1 : sum), 0)
    return (numLupi > numUmani || numLupi == 0)
  }
}
