import { Component, Input } from '@angular/core';
import { Player } from '../Player';
import { NgFor } from '@angular/common';
import { roleOrder } from '../roles';

@Component({
  selector: 'app-player-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './player-table.component.html',
  styleUrl: './player-table.component.css'
})
export class PlayerTableComponent {
  @Input() players: Player[] = []

  ngOnInit() {
    this.sortPlayers()
  }

  ngOnChanges() {
    this.sortPlayers
  }

  sortPlayers() {
    this.players.sort((a, b) => {
      if (a.isAlive === b.isAlive) {
          // Se isAlive è lo stesso, ordina in base alla proprietà 'role' secondo rolesByTurn
          const roleOrderA = roleOrder.indexOf(a.role);
          const roleOrderB = roleOrder.indexOf(b.role);
          // Se entrambi i ruoli sono presenti nell'ordine personalizzato, ordina in base all'ordine definito
          if (roleOrderA !== -1 && roleOrderB !== -1) {
            return roleOrderA - roleOrderB;
          }
          // Altrimenti, ordina in modo alfabetico
          return a.role.localeCompare(b.role);
      }
      // Altrimenti, ordina in base alla proprietà 'isAlive' con 'true' prima di 'false'
      return a.isAlive ? -1 : 1;
    });
  }

}
