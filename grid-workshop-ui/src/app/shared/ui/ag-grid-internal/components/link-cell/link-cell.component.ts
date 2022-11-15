import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-link-cell',
  template: `
    <button mat-icon-button aria-label="" (click)="open()">
      <mat-icon class="icon-display" >open_in_new</mat-icon>
    </button>
  `,
  styleUrls: ['./link-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkCellComponent implements ICellRendererAngularComp {
  public url = '';
  constructor() { }

  agInit(params: ICellRendererParams<any, any> & {url: string | undefined, urlField: string}): void {
    const columnKey = params.column?.getColId() ?? '';
    const column = params.colDef?.field ?? '';
    let urlField = params['urlField'];
    // params.columnApi.autoSizeColumn(columnKey)
    if (urlField === 'this') {
      urlField = column ;
    }
    if (params['url']) {
      this.url = params['url'];
    } else {
      this.url = params.data ? params.data['URL'] : 'NOTHISG';
    }
  }

  refresh(params: ICellRendererParams<any, any>): boolean {
    return true;
  }

  open() {
    window.open(this.url, '_blank');
  }

}
