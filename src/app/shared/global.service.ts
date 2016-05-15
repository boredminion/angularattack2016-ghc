import { Injectable } from '@angular/core';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import {Upgrade} from '../ship';

export interface ISettings {
  mapExtent: number;
  mapX: number;
  mapY: number;
  maxPlanets: number;
  actionDelay: number;
  baseShipHealth: number;
  baseWeaponDamage: number;
  baseWeaponRange: number;
  mineValue: number;
  tradeValue: number;
  maxAsteroids: number;
  maxAIShips: number;
  upgrades: Upgrade[];
}

export class Settings implements ISettings {
  mapExtent: number;
  mapX: number;
  mapY: number;
  maxPlanets: number;
  actionDelay: number;
  baseShipHealth: number;
  baseWeaponDamage: number;
  baseWeaponRange: number;
  mineValue: number;
  tradeValue: number;
  maxAsteroids: number;
  maxAIShips: number;
  upgrades: Upgrade[];
  constructor() {
    this.mapExtent = 100;
    this.mapX = 9;
    this.mapY = 11;
    this.maxPlanets = 100;
    this.maxAsteroids = 50;
    this.maxAIShips = 100;
    this.actionDelay = 2;
    this.baseShipHealth = 100;
    this.baseWeaponDamage = 10;
    this.baseWeaponRange = 1;
    this.mineValue = 10;
    this.tradeValue = 10;
  }
}

@Injectable()
export class GlobalService {
  public globalSettings$: FirebaseObjectObservable<ISettings>;
  public globalSettings: ISettings = new Settings();

  constructor(private af: AngularFire) {
    this.globalSettings$ = this.af.database.object(`/settings`);
    this.globalSettings$.subscribe(settings => {
      if (settings === null) {
        this.save(new Settings());
      } else {
        this.globalSettings = settings;
      }
    });
  }
  
  save(newSettings: ISettings) {
    this.globalSettings$.set(newSettings);
  }

}
