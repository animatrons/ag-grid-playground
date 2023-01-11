import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurationGridsRoutingModule } from './restauration-grids-routing.module';
import { RestaurationGridsComponent } from './restauration-grids.component';
import { StoreModule } from '@ngrx/store';
import * as fromRestaurants from './store/reducers/restaurants.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RestaurantsEffects } from './store/effects/restaurants.effects';
import { RestaurantsViewComponent } from './feature/restaurants-view/restaurants-view.component';
import { AgGridInternalModule } from 'src/app/shared/feature/ag-grid-internal/ag-grid-internal.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RestaurantsGroupsComponent } from './feature/restaurants-groups/restaurants-groups.component';
import { RestaurantGroupComponent } from './feature/restaurant-group/restaurant-group.component';


@NgModule({
  declarations: [
    RestaurationGridsComponent,
    RestaurantsViewComponent,
    RestaurantsGroupsComponent,
    RestaurantGroupComponent,
  ],
  imports: [
    CommonModule,
    RestaurationGridsRoutingModule,
    StoreModule.forFeature(fromRestaurants.restaurantsFeatureKey, fromRestaurants.reducer),
    EffectsModule.forFeature([RestaurantsEffects]),
    AgGridInternalModule,
    SharedModule
  ]
})
export class RestaurationGridsModule { }
