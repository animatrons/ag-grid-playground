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

  saveResto(restaurant: Restaurant) {
    return this.http.put(this.restaurantsUrl, restaurant);
  }

  deleteResto(id: string) {
    const params = new HttpParams()
      .set('id', id);
    return this.http
      .delete<any>(this.restaurantsGroupUrl, {
        params
      })
  }

  getPage(page: number, size: number, sorts?: SortParams[], filter?: FilterParams[]): Observable<Pagination<Restaurant>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http
      .post<Pagination<Restaurant>>(this.restaurantsUrl, {filters: filter, sorts}, { params })
      .pipe(delay(1000));
  }

  saveGroup(params: RestaurantGroupDto) {
    return this.http
      .put<any>(this.restaurantsGroupUrl, {
        ...params
      }).pipe(delay(2000))
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
    return this.http.get<RestaurantGroup[]>(this.restaurantsGroupUrl).pipe(delay(2000));
  }

  delete(groupId: string) {
    const params = new HttpParams()
      .set('group_id', groupId);
    return this.http
      .delete<any>(this.restaurantsGroupUrl, {
        params
      }).pipe(delay(2000))
  }
}
