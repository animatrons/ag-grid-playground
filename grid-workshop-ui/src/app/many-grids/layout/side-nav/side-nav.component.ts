import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent implements OnInit {
  @Input() toggled!: boolean;
  @Output() toggledChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  expandBasic = true;
  expandRestaurants = true;

  expandGeneric = false;
  constructor() { }

  ngOnInit(): void {
  }

}
