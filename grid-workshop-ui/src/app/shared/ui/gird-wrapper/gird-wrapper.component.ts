import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gird-wrapper',
  templateUrl: './gird-wrapper.component.html',
  styleUrls: ['./gird-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GirdWrapperComponent implements OnInit {

  @Input() title = '';
  constructor() { }
  @HostBinding('style.flex-grow')
  flexGrow = '1';

  ngOnInit(): void {
  }

}
