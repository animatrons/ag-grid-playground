import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

@Component({
  selector: 'app-checkbox-header',
  template: `
    <div>
      <mat-checkbox [formControl]="checkBox" ></mat-checkbox>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxHeaderComponent<T = any> implements IHeaderAngularComp {
  public params!: IHeaderParams;
  public checkBox = new FormControl(false);
  constructor() { }

  agInit(params: IHeaderParams<T>): void {
    this.params = params;
    this.checkBox.valueChanges.subscribe(value => {
      if (value) {
        this.params.api.dispatchEvent({type: 'headerCheckboxSelected'})
      } else {
        this.params.api.dispatchEvent({type: 'headerUnCheckboxSelected'})
      }

    })
  }
  refresh(params: IHeaderParams<T>): boolean {
    return false;
  }
}
