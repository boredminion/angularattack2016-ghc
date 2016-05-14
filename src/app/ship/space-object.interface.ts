import {SpaceObjectType} from './';

export interface ISpaceObject {
	image: string;
	$key: string;
	ownerKey: string;
	x: number;
	y: number;
	type: SpaceObjectType;
	currentScore: number;
	stolenScore: number;
	totalScore: number;
}