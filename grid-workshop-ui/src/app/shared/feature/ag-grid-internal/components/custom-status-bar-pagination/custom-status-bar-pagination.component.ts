import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { IStatusPanelAngularComp } from 'ag-grid-angular';
import { IStatusPanelParams } from 'ag-grid-community';
import { BehaviorSubject } from 'rxjs';

@Component({
  templateUrl: './custom-status-bar-pagination.component.html',
  styleUrls: ['./custom-status-bar-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomStatusBarPaginationComponent implements IStatusPanelAngularComp {

  params!: IStatusPanelParams;
  public currentPage$ = new BehaviorSubject(1);
  public lastPage$ = new BehaviorSubject(300);
  public pageSize$ = new BehaviorSubject(10);
  public total$ = new BehaviorSubject(1500);

  public count = 0;


  agInit(params: IStatusPanelParams): void {
    this.params = params;
    this.params.api.addEventListener('gridReady', this.onGridReady.bind(this));
    this.params.api.addEventListener('modelUpdated', () => this.updatePageinationStatus());
  }

  onGridReady() {
    this.count = this.params.api.getModel().getRowCount();
    this.updatePageinationStatus();
  }

  updatePageinationStatus() {
    const pageSize = this.params.api.paginationGetPageSize();
    const total = this.params.api.paginationGetRowCount();
    const currentPage = this.params.api.paginationGetCurrentPage();
    const lastPage = this.params.api.paginationGetTotalPages();

    this.currentPage$.next(currentPage);
    this.total$.next(total);
    this.pageSize$.next(pageSize);
    this.lastPage$.next(lastPage);

    console.log('[[StatusBar]] Grid model updated: ', this.currentPage$.value, this.lastPage$.value);
  }

  onBtnFirst() {
    this.params.api.paginationGoToFirstPage();
    this.updatePageinationStatus();
  }

  onBtnLast() {
    this.params.api.paginationGoToLastPage();
    this.updatePageinationStatus();
  }

  onBtnNext() {
    this.params.api.paginationGoToNextPage();
    this.updatePageinationStatus();
  }

  onBtnPrevious() {
    this.params.api.paginationGoToPreviousPage();
    this.updatePageinationStatus();
  }

}
