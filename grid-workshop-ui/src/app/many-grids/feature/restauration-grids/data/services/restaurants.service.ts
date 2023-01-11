import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { FilterParams, Pagination, SortParams } from 'src/app/shared/data/model/dto.model';
import { environment } from 'src/environments/environment';
import { Restaurant, RestaurantGroup, RestaurantGroupDto } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private http: HttpClient) { }

  private restaurantsUrl = environment.baseUrl + environment.endpoints.restaurants;
  private restaurantsGroupUrl = environment.baseUrl + environment.endpoints.restaurantGroups;

  getPage(page: number, size: number, sort?: SortParams, filter?: FilterParams[]): Observable<Pagination<Restaurant>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort_field', sort?.sort_field ?? '')
      .set('sort_order', sort?.sort_order ?? '')
    return this.http
      .post<Pagination<Restaurant>>(this.restaurantsUrl, {filters: filter}, { params })
      .pipe(delay(1000));
  }

  saveGroup(params: RestaurantGroupDto) {
    return this.http
      .put<any>(this.restaurantsGroupUrl, {
        ...params
      })
  }

  getGroupPage(group_id: string, page: number, size: number, sort?: SortParams[], filter?: FilterParams[]) {
    const params = new HttpParams()
      .set('group_id', group_id)
      .set('page', page)
      .set('size', size)
    return this.http
      .post<Pagination<Restaurant>>(this.restaurantsGroupUrl, {filters: filter, sorts: sort}, { params })
  }

  getAllGroups() {
    return this.http.get<RestaurantGroup[]>(this.restaurantsGroupUrl);
  }

  delete(groupId: string) {
    const params = new HttpParams()
      .set('group_id', groupId);
    return this.http
      .delete<any>(this.restaurantsGroupUrl, {
        params
      })
  }
}
