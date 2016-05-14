import {SpaceObjectType} from './';

export interface ISpaceObject {
	$key: string;
	ownerKey: string;
	x: number;
	y: number;
	type: SpaceObjectType;
}