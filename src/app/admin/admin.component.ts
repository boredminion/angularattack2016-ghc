import { Component, OnInit, Input } from '@angular/core';
import {GlobalService, ISettings, Settings} from '../shared';
import {MapService} from '../map';
import {SpaceObjectService, SpaceObjectType, Asteroid, Planet} from '../ship';

@Component({
  moduleId: module.id,
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})
export class AdminComponent implements OnInit {
  @Input() model;
  globalSettings: ISettings = new Settings();
  asteroids: Asteroid[] = [];
  planets: Planet[] = [];

  constructor(private globalService: GlobalService, private mapService: MapService, private spaceObjectService: SpaceObjectService) {
    this.globalSettings = globalService.globalSettings;
    spaceObjectService.spaceObjects$.subscribe(spaceObjects => {
      this.asteroids = [];
      this.planets = [];
      spaceObjects.forEach(object => {
        switch (object.type) {
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
    if (this.planets.length > this.globalSettings.maxPlanets) {
      for (let i = this.globalSettings.maxPlanets; i < this.planets.length; i++) {
        let planet = this.planets[i];
        this.spaceObjectService.spaceObjects$.remove(planet.$key);
      }
    }
    if (this.planets.length < this.globalSettings.maxPlanets) {
      for (let i = this.planets.length; i < this.globalSettings.maxPlanets; i++) {
        this.mapService.createPlanet();
      }
    }

  }

  resetAsteroids() {
    if (this.asteroids.length > this.globalSettings.maxAsteroids) {
      for (let i = this.globalSettings.maxAsteroids; i < this.asteroids.length; i++) {
        let planet = this.asteroids[i];
        this.spaceObjectService.spaceObjects$.remove(planet.$key);
      }
    }
    if (this.asteroids.length < this.globalSettings.maxAsteroids) {
      for (let i = this.asteroids.length; i < this.globalSettings.maxAsteroids; i++) {
        this.mapService.createAsteroid();
      }
    }
  }

}
