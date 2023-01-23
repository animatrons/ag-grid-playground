import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  template: `
    <div class="btns">
      <button mat-icon-button *ngFor="let btn of buttons; index as i" (click)="onClick(i, btn.label)">
        <mat-icon class="icon-display" [ngStyle]="{'color': btn.color ? btn.color : 'blue'}">{{ btn.icon }}</mat-icon>
      </button>
    </div>
  `,
  styles: [`
    .btns {
      padding: 0px 5px
    }
    .icon-display {
      transform: scale(.6);
      margin-bottom: 20px;
      margin-left: -15px;
      margin-right: 5px;
      /* color: rgb(47, 0, 255); */
    }
    ::ng-deep .mat-icon-button {
      width: 30px
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonCellComponent<T=any> implements ICellRendererAngularComp {
  params!: ICellRendererParams<T, any> & {buttons: {onClick: (data: T) => void, icon: string, color?: string, label?: string}[]};
  icon = 'edit';
  buttons!: {onClick: (data: T) => void, icon: string, color?: string, label?: string}[];

  agInit(params: ICellRendererParams<T, any> & {buttons: {onClick: (data: T) => void, icon: string, color?: string, label?: string}[]}): void {
    this.params = params;
    this.buttons = params.buttons;
  }

  refresh(params: ICellRendererParams<T, any>): boolean {
    return true;
  }

  onClick(btnIndex:  number, btnLabel?: string) {
    // console.log('Cell btn ' + btnLabel + ' clickd', this.params.data);
    if (this.params.data) {
      this.buttons[btnIndex]?.onClick(this.params.data);
    }
  }

}
