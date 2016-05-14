import {AuthService} from './auth.service';
import {UserService} from './user.service';

export const AUTH_PROVIDERS: any[] = [AuthService];
export const USER_PROVIDERS: any[] = [UserService];

export {AuthRouteService} from './auth-route.service';

export * from './auth.service';
export * from './user.service';
