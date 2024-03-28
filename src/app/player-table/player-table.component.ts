import { Component, Input } from '@angular/core';
import { Player, sortPlayers } from '../Player';
import { NgClass, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-player-table',
  standalone: true,
  imports: [NgFor, NgClass, RouterModule],
  templateUrl: './player-table.component.html',
  styleUrl: './player-table.component.css'
})
export class PlayerTableComponent {
  @Input() players: Player[] = []
  isCollapsed: boolean = false

  ngOnInit() {
    sortPlayers(this.players, 'role')
  }

  toggleCollapse() {
    this.isCollapsed
  }
    
  // non funziona per proprietà di oggetti, rileva solo se cambia l'intero valore assegnato
  // potrei assegnargli un nuovo oggetto interamente, ma non ne vale la pena
  // ngOnChanges(changes: SimpleChange) {
  //   console.log(changes)
  //   this.sortPlayers()
  // }

}
