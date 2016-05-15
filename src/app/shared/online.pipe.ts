import { Pipe, PipeTransform } from '@angular/core';
import { User } from './';

@Pipe({
  name: 'online'
})
export class Online implements PipeTransform {

  transform(users: User[], args?: any): any {
    return users.filter(user => {
      return user.online;
    });
  }

}
