import { Pipe, PipeTransform } from '@angular/core';
import {Upgrade, UpgradeType} from '../ship';

@Pipe({
  name: 'upgrades'
})
export class Upgrades implements PipeTransform {

  transform(upgrades: Upgrade[], type?: any): any {
    if (upgrades) {
      return upgrades.filter((upgrade) => {
        if (type === 'Armor' || type === 'Range' || type === 'Damage') {
          if (type === 'Armor') {
            return upgrade.type === UpgradeType.Armor;
          }
          if (type === 'Range') {
            return upgrade.type === UpgradeType.Range;
          }
          if (type === 'Damage') {
            return upgrade.type === UpgradeType.Damage;
          }
        } else {
          return false;
        }
      });
    } else {
      return upgrades;
    }
  }

}
