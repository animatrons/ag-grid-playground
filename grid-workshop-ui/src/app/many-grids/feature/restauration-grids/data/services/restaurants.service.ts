import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { FilterParams, Pagination, SortParams } from 'src/app/shared/data/model/dto.model';
import { environment } from 'src/environments/environment';
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private http: HttpClient) { }

  private restaurantsUri = environment.baseUrl + environment.endpoints.restaurants

  getPage(page: number, size: number, sort?: SortParams, filter?: FilterParams[]): Observable<Pagination<Restaurant>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort_field', sort?.sort_field ?? '')
      .set('sort_order', sort?.sort_order ?? '')
    return this.http
      .post<Pagination<Restaurant>>(this.restaurantsUri, {filters: filter}, { params })
      .pipe(delay(1000));

  }
}
