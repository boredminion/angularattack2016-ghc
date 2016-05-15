import { Pipe, PipeTransform } from '@angular/core';
import { User } from './';

@Pipe({
  name: 'userSort'
})
export class UserSort implements PipeTransform {

  transform(users: User[], which?: any): User[] {
    let sortedUsers = [];
    if (users && which) {
      let tempUsers = users.filter(user => {        
        return Object.keys(user).length > 10;
      });
      sortedUsers = tempUsers.sort((a:User , b: User) => {
        return b[which] - a[which];
      });
    }
    return sortedUsers;
  }

}
