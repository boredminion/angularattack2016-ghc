import {AuthService} from './auth.service';
import {UserService} from './user.service';
import {Direction} from '../map';

export {AuthService};
export {AuthRouteService} from './auth-route.service';


export const AUTH_PROVIDERS: any[] = [AuthService];
export const USER_PROVIDERS: any[] = [UserService];
export * from './user.service';

export interface IUser {
  $key: string;
  shipName: string;
  online: any;
  facing: Direction;
  image: string;
	ownerKey: string;
	x: number;
	y: number;
	currentScore: number;
	stolenScore: number;
	totalScore: number;
}

export class User implements IUser {
  $key: string;
  shipName: string;
  online: any;
  image: string;
  facing: Direction;
	ownerKey: string;
	x: number;
	y: number;
	currentScore: number;
	stolenScore: number;
	totalScore: number;

  constructor(shipName: string, image: string) {
    this.shipName = shipName;
    this.image = image;
  }
}