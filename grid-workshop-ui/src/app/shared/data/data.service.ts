import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { OlympicData } from './model/data.models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  loadCarsData() {
    return this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
  }

  loadOlympicData() {
    return this.http
      .get<OlympicData[]>(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      )
  }
}
