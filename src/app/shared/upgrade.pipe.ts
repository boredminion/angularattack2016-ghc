import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upgrade'
})
export class Upgrade implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
