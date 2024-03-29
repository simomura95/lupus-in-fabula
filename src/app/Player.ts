import { roleOrder } from "./roles"

export class Player{
  name: string
  role: string
  clan: string
  description: string
  isAlive: boolean

  constructor() {
    this.name = ''
    this.role = ''
    this.clan = ''
    this.description = ''
    this.isAlive = true
  }

}


export function sortPlayers(players: Player[], method: string = 'name'): Player[] {
  switch (method) {
    case 'name': {
      return players.sort((a, b) => a.name.localeCompare(b.name))
    }
    case 'role': {
      return players.sort((a, b) => {
        if (a.isAlive === b.isAlive) {
            // Se isAlive è lo stesso, ordina in base alla proprietà 'role' secondo rolesByTurn
            const roleOrderA = roleOrder.indexOf(a.role);
            const roleOrderB = roleOrder.indexOf(b.role);
            // Se entrambi i ruoli sono presenti nell'ordine personalizzato, ordina in base all'ordine definito
            if (roleOrderA !== -1 && roleOrderB !== -1) {
              // se hanno stesso ruolo, fai ordine alfabetico
              if (roleOrderA === roleOrderB) {
                return a.name.localeCompare(b.name);
              }  
              return roleOrderA - roleOrderB;
            }
            // Altrimenti, ordina in modo alfabetico (non dovrebbe succedere)
            return a.role.localeCompare(b.role);
        }
        // Altrimenti, ordina in base alla proprietà 'isAlive' con 'true' prima di 'false'
        return a.isAlive ? -1 : 1;
      });
    }
    default:
      return players;
  }
}
