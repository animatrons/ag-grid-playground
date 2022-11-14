import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-restauration-grids',
  templateUrl: './restauration-grids.component.html',
  styleUrls: ['./restauration-grids.component.scss']
})
export class RestaurationGridsComponent implements OnInit {

  constructor() { }
  @HostBinding('style.flex-grow')
  flexGrow = '1';

  ngOnInit(): void {
  }

}
