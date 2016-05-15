import {UpgradeType} from './';

export interface IUpgrade {
	$key: string;
	value: number;
    name: string;
	type: UpgradeType;
    cost: number;
}