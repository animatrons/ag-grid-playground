import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ILoadingOverlayAngularComp } from 'ag-grid-angular';
import { ILoadingOverlayParams } from 'ag-grid-community';

@Component({
  selector: 'app-loading-spinner-overlay',
  template: `
    <div class="spinner-wrapper">
      <strong> {{params.loadingMessage}} </strong> <span><mat-spinner class="grid-spinner" [diameter]="20" [strokeWidth]="10"></mat-spinner></span>
    </div>
  `,
  styleUrls: ['./loading-spinner-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSpinnerOverlayComponent implements ILoadingOverlayAngularComp {

  public params!: ILoadingOverlayParams & { loadingMessage: string };

  agInit(params: ILoadingOverlayParams<any> & { loadingMessage: string }): void {
    this.params = params;
  }

}
