import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-conformation-dialog',
  template: `
    <h4 class="title" mat-dialog-title>{{ title }}</h4>
    <p>{{ message }}</p>
    <mat-dialog-actions align="end">
      <button mat-stroked-button (click)="no()">{{dismissAction}}</button>
      <button color="primary" mat-raised-button (click)="yes()">{{confirmAction}}</button>
    </mat-dialog-actions>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConformationDialogComponent {
  title = 'Confirm';
  message = 'Are you sure?';
  confirmAction = 'Ok';
  dismissAction = 'Cancel';

  constructor(public dialogRef: MatDialogRef<ConformationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string, message: string, confirmAction: string, dismissAction: string}) {
      if (data.title) {
        this.title = data.title;
      }
      if (data.message) {
        this.message = data.message;
      }
      if (data.confirmAction) {
        this.confirmAction = data.confirmAction;
      }
      if (data.dismissAction) {
        this.dismissAction = data.dismissAction;
      }
    }

  yes() {
    this.dialogRef.close(true);
  }

  no(): void {
    this.dialogRef.close(false);
  }

}
