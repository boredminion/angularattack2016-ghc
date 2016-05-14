import {SpaceObjectType} from './';

export interface ISpaceObject {
	$key: string;
	x: number;
	y: number;
	type: SpaceObjectType;
}