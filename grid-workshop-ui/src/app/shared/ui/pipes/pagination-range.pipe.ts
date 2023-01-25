import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginationRange'
})
export class PaginationRangePipe implements PipeTransform {

  transform(currentPage: number, lastPage: number, offset: number = 5): number[] {
    let start: number = 0;
    let end: number = 0;
    if (offset > lastPage) offset = lastPage;
    if (currentPage < 3) {
      start = 0;
      if (lastPage - currentPage > offset) end = start + offset;
      else end = lastPage;
      return this.range(start, end);
    }
    if (currentPage >= 3) {
      start = currentPage - 1;
      if (lastPage - currentPage > offset) end = start + offset;
      else {
        end = lastPage;
        start = lastPage - offset;
      }
      return this.range(start, end);
    }
    return [];
  }

  range(start: number, end: number): number[] {
    let _range:  number[] = []
    for (let i = start; i < end; i++) {
      _range = [
        ..._range,
        i
      ]
    }
    return _range;
  }

}
