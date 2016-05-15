import { Component, OnInit, Input } from '@angular/core';
import {GlobalService, ISettings, Settings} from '../shared';
import {MapService} from '../map';
import {Upgrades} from '../shared';
import {SpaceObjectService, SpaceObjectType, AIShip, Asteroid, Planet, Upgrade, UpgradeType} from '../ship';

@Component({
  moduleId: module.id,
  selector: 'app-admin',
  pipes: [Upgrades],
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})
export class AdminComponent implements OnInit {
  @Input() model;
  globalSettings: ISettings = new Settings();
  aiShips: AIShip[] = [];
  asteroids: Asteroid[] = [];
  planets: Planet[] = [];
  newArmor: Upgrade = new Upgrade('', '', UpgradeType.Armor);
  newDamage: Upgrade = new Upgrade('', '', UpgradeType.Damage);
  newRange: Upgrade = new Upgrade('', '', UpgradeType.Range);

  constructor(private globalService: GlobalService, private mapService: MapService, private spaceObjectService: SpaceObjectService) {
    globalService.globalSettings$.subscribe(settings => this.globalSettings = settings);
    spaceObjectService.spaceObjects$.subscribe(spaceObjects => {
      this.aiShips = [];
      this.asteroids = [];
      this.planets = [];
      spaceObjects.forEach(object => {
        switch (object.type) {
          case SpaceObjectType.AIShip:
            this.aiShips.push(object as AIShip);
            break;
          case SpaceObjectType.Asteroid:
            this.asteroids.push(object as Asteroid);
            break;
          case SpaceObjectType.Planet:
            this.planets.push(object as Planet);
            break;
        }
      });
    });
  }

  ngOnInit() {
  }

  save() {
    this.globalService.save(this.globalSettings);
  }

  resetPlanets() {
    let max = Math.min(this.globalSettings.maxPlanets, 500);
    if (this.planets.length > max) {
      for (let i = max; i < this.planets.length; i++) {
        let planet = this.planets[i];
        this.spaceObjectService.spaceObjects$.remove(planet.$key);
      }
    }
    if (this.planets.length < max) {
      for (let i = this.planets.length; i < max; i++) {
        this.mapService.createPlanet();
      }
    }

  }

  resetAsteroids() {
    let max = Math.min(this.globalSettings.maxAsteroids, 500);
    if (this.asteroids.length > max) {
      for (let i = max; i < this.asteroids.length; i++) {
        let planet = this.asteroids[i];
        this.spaceObjectService.spaceObjects$.remove(planet.$key);
      }
    }
    if (this.asteroids.length < max) {
      for (let i = this.asteroids.length; i < max; i++) {
        this.mapService.createAsteroid();
      }
    }
  }

  resetAIShips() {
    let max = Math.min(this.globalSettings.maxAIShips, 500);
    if (this.aiShips.length > max) {
      for (let i = max; i < this.aiShips.length; i++) {
        let ship = this.aiShips[i];
        this.spaceObjectService.spaceObjects$.remove(ship.$key);
      }
    }
    if (this.aiShips.length < max) {
      for (let i = this.aiShips.length; i < max; i++) {
        this.mapService.createAIShip();
      }
    }
  }
  
  saveArmor() {
    if (this.globalSettings.upgrades) {
      this.globalSettings.upgrades.push(this.newArmor);
    } else {
      this.globalSettings.upgrades = [this.newArmor];
    }
    this.newArmor = new Upgrade('','',UpgradeType.Armor);
    this.globalService.save(this.globalSettings);
  }
  
  saveDamage() {
    if (this.globalSettings.upgrades) {
      this.globalSettings.upgrades.push(this.newDamage);
    } else {
      this.globalSettings.upgrades = [this.newDamage];
    }
    this.newDamage = new Upgrade('','',UpgradeType.Damage);
    this.globalService.save(this.globalSettings);
  }
  
  saveRange() {
    if (this.globalSettings.upgrades) {
      this.globalSettings.upgrades.push(this.newRange);
    } else {
      this.globalSettings.upgrades = [this.newRange];
    }
    this.newRange = new Upgrade('','',UpgradeType.Range);
    this.globalService.save(this.globalSettings);
  }
  
  removeUpgrade(upgradeKey) {
    
  }

}
