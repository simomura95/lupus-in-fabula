import { Component } from '@angular/core';
import { rolesByPlayerNum, numPlayersMin, roles, winCondition } from '../roles';
import { NgFor, Location } from '@angular/common';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [NgFor],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.css'
})
export class RulesComponent {

  constructor(private location: Location) {}

  roles = roles.sort((a, b) => a.name.localeCompare(b.name))
  rolesByPlayerNum = rolesByPlayerNum
  winCondition = winCondition

  numPlayersMin = numPlayersMin
  numPlayersMax = rolesByPlayerNum.length
  // array con i numeri da min a max
  numPlayersLegit: number[] = [...Array(this.numPlayersMax - this.numPlayersMin + 1).keys()].map(i => i  + this.numPlayersMin);

  // by chatGPT per passare da elenco di ruoli a stringa carina
  groupRoles(roles: string[]): string {
    const rolesGrouped = roles.reduce((acc: { [key: string]: number }, role) => {
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});
  
    return Object.entries(rolesGrouped)
      .map(([key, value]) => `${value} ${key}`)
      .join(', ');
  }

  goBack(): void {
    this.location.back();
  }

}
