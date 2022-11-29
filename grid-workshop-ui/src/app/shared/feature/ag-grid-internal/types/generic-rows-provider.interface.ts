import { Observable } from "rxjs";

export interface GenericRowsProvider {
  setParams(params: any): void;

  getRows(page: number, filter?: string, filter_field_code?: string, sort?: string, sort_field_code?: string): Observable<any>
}
