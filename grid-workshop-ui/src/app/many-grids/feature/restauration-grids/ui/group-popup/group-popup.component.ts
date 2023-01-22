import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-group-popup',
  template: `
    <h4 class="title" mat-dialog-title>Group Name</h4>
      <mat-form-field appearance="outline">
        <mat-label for="groupName">Group Name</mat-label>
        <input matInput [type]="'text'" maxlength="300" name="groupName" [formControl]="formControl">
      </mat-form-field>
      <mat-dialog-actions align="end">
        <button mat-stroked-button (click)="close()">Cancel</button>
        <button color="primary" mat-raised-button (click)="save()">Save</button>
      </mat-dialog-actions>
  `,
  styles: [
    `
      mat-form-field{
        width: 100%
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupPopupComponent implements OnInit {

  formControl = new FormControl('');

  constructor( public dialogRef: MatDialogRef<GroupPopupComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(false);
  }

  save() {
    const groupName = this.formControl.value;
    this.dialogRef.close({groupName});
  }

}
