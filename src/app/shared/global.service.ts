import { Injectable } from '@angular/core';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class GlobalService {
  mapExtent: number = 100;
  x: number = 9; //height of grid
	y: number = 11; //width of grid
	maxPlanets: number = 100;

  constructor(private af: AngularFire) {
    
  }

}
