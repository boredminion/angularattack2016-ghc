import {AuthService} from './auth.service';
import {UserService} from './user.service';

export {AuthService};
export {AuthRouteService} from './auth-route.service';


export const AUTH_PROVIDERS: any[] = [AuthService];
export const USER_PROVIDERS: any[] = [UserService];
export * from './user.service';
