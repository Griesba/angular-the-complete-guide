import { Pipe, PipeTransform } from '@angular/core';


// setting pure to false (pure: false) is a bad behavior as it will cause performance issue.
// filter will be recalculated whenever data changed in the list
@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filteredString: string, propertyName: string): any {
    if (value.lenght === 0 || filteredString === '') {
      return value;
    }
    const filteredArray = [];
    for (const item of value) {
      if (item[propertyName] === filteredString) {
        filteredArray.push(item);
      }
    }
    return filteredArray;
  }

}
