import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IFloatingFilterAngularComp } from 'ag-grid-angular';
import { IFloatingFilterParams, FilterChangedEvent, TextFilterModel, GridApi } from 'ag-grid-community';
import { debounceTime } from 'rxjs';

@Component({
  template: `
    <input class="column-floating" type="text" style="width: 100%;" [formControl]="inputControl" [(ngModel)]="currentValue"/>
  `,
  styleUrls: ['./simple-text-column-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleTextColumnFilterComponent implements IFloatingFilterAngularComp {
  params!: IFloatingFilterParams;
  currentValue: string | null = null

  inputControl: FormControl = new FormControl('');
  constructor() { }

  @HostBinding('style.width')
  public width = '100%'

  agInit(params: IFloatingFilterParams<any, any>): void {
    this.params = params;

    this.inputControl.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(value => {
        if (!value) {
          this.params.parentFilterInstance((instance) => {
            instance.onFloatingFilterChanged(null, null);
          });
          return;
        }
        this.params.parentFilterInstance((instance) => {
          instance.onFloatingFilterChanged('contains', value);
        })
      })
  }

  onParentModelChanged(parentModel: TextFilterModel, filterChangedEvent?: FilterChangedEvent<any> | null | undefined): void {
    if (!parentModel) {
        this.currentValue = null;
        // this.inputControl.setValue(null)
    } else {
        this.currentValue = parentModel.filter ?? null;
        // this.inputControl.setValue(parentModel.filter)
    }
  }
}
