import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManyGridsRoutingModule } from './many-grids-routing.module';
import { ManyGridsComponent } from './many-grids.component';
import { LayoutContainerComponent } from './layout/layout-container/layout-container.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ManyGridsComponent,
    LayoutContainerComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    ManyGridsRoutingModule,
    SharedModule
  ]
})
export class ManyGridsModule { }
