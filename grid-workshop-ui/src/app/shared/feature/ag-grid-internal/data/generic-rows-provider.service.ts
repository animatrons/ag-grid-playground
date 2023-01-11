import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericRowsProvider } from '../types/generic-rows-provider.interface';

@Injectable()
export class GenericRowsProviderService implements GenericRowsProvider {

  constructor() { }
  params: any;

  setParams(params: any): void {
    throw new Error('Method not implemented.');
  }
  getRows(page: number, filter?: string | null, filter_field_code?: string | null, sort?: string | null, sort_field_code?: string | null): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
