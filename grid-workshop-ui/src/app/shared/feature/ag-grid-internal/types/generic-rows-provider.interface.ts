import { Observable } from "rxjs";

export interface GenericRowsProvider<T = any> {
  params: T;

  setParams(params: T): void;

  getRows(page: number, filter?: string, filter_field_code?: string, sort?: string, sort_field_code?: string): Observable<any>
}
