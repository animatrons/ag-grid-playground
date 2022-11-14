import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-container',
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutContainerComponent implements OnInit {
  opened: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  toggleDrawer() {
    this.opened = !this.opened;
  }

}
