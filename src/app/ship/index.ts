import {SpaceObjectService} from './space-object.service';

export {SpaceObjectService};

export const SPACE_OBJECT_PROVIDERS: any[] = [SpaceObjectService];

export { ShipComponent } from './ship.component';
export { ISpaceObject } from './space-object.interface';
export { IUpgrade } from './upgrade.interface';
export { Planet } from './planet.class';
export { Explosion } from './explosion.class';
export { Asteroid } from './asteroid.class';
export { AIShip } from './aiship.class';
export { Upgrade } from './upgrade.class';

export { SpaceObjectType } from './space-object-type.enum';
export { UpgradeType } from './upgrade-type.enum';