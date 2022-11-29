import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DynamicGrid } from '../../types/dynamic-grid-base.class';

@Component({
  selector: 'app-dynamic-grid-infinite',
  templateUrl: './dynamic-grid-infinite.component.html',
  styleUrls: ['./dynamic-grid-infinite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicGridInfiniteComponent extends DynamicGrid implements OnInit, OnChanges {

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

}
