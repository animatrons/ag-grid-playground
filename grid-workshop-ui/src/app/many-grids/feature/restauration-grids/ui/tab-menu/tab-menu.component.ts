import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tab-menu',
  template: `
    <div>
      <span  class="flex-row between ailgn-items-center">
        <div>
          {{ itemName }}
        </div>
        <div class="tab-margin-4">
        </div>
      </span>
      <span class="tab-menu">
        <button mat-icon-button [matMenuTriggerFor]="menu" (click)="$event.stopPropagation()">
          <mat-icon color="primary" aria-label="Example icon-button with a heart icon">menu</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item (click)="emitEdit()">Edit</button>
          <button mat-menu-item class="danger-color" (click)="emitDelet()">Delete</button>
        </mat-menu>
      </span>
    </div>
  `,
  styles: [`
    .tab-menu {
      position: absolute;
      right: 0px;
      top: 2px;
      mat-icon {
        font-weight: 500;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabMenuComponent {

  @Input() itemName!: string;
  @Input() itemId!: string;
  @Output() edit = new EventEmitter<{itemId: string}>();
  @Output() delete = new EventEmitter<{itemId: string}>();

  emitEdit() {
    this.edit.emit({itemId: this.itemId});
  }

  emitDelet() {
    this.delete.emit({itemId: this.itemId});
  }

}
