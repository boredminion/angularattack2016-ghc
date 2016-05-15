import {IUpgrade, UpgradeType} from './';

export class Upgrade implements IUpgrade {
	$key: string;
	value: number;
    name: string;
	type: UpgradeType;
    cost: number;
	constructor(name: string, value: number, type: UpgradeType, cost: number) {
		this.name = name || '';
        this.value = value || 0;
		this.type = type;
        this.cost = cost || 100000000;
	}
}
