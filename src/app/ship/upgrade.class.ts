import {IUpgrade, UpgradeType} from './';

export class Upgrade implements IUpgrade {
	$key: string;
	value: number;
    name: string;
	type: UpgradeType;
	constructor(name, value, type) {
		this.name = name || 'name';
        this.value = value || 0;
		this.type = type;
	}
}
