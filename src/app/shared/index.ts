import {AuthService} from './auth.service';
import {UserService} from './user.service';
import {GlobalService} from './global.service';
import {Direction} from '../map';

export {AuthService};
export {AuthRouteService} from './auth-route.service';

export const SHARED_PROVIDERS: any[] = [GlobalService, AuthService, UserService];
export * from './user.service';
export * from './online.pipe';
export * from './global.service';

export interface IUser {
  $key: string;
  shipName: string;
  online: boolean;
  facing: Direction;
  image: string;
	ownerKey: string;
	x: number;
	y: number;
  lastX: number;
  lastY: number;
	health: number;
	weaponRange: number;
	weaponDamage: number;
	currentScore: number;
	stolenScore: number;
	totalScore: number;
}

export class User implements IUser {
	$key: string;
	facing: Direction;
  shipName: string;
  online: boolean;
	ownerKey: string;
	x: number;
	y: number;
  lastX: number;
  lastY: number;
	health: number = 100;
	currentScore: number = 0;
	stolenScore: number = 0;
	totalScore: number = 0;
	weaponRange: number = 0;
	weaponDamage: number = 0;
	image: string;
	constructor(shipName: string, image: string) {
    this.shipName = shipName;
    this.image = image;
  }
}
export * from './upgrade.pipe';
