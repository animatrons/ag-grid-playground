import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range'
})
export class NumberRangePipe implements PipeTransform {

  transform(value: number, end: number): number[] {
    let range: number[] = []
    if (value < end) {
      for (let i = value; i < end; i++) {
        range = [
          ...range,
          i
        ]
      }
    }
    return range;
  }

}
