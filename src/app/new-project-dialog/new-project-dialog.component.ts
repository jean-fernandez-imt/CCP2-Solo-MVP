import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-project-dialog',
  templateUrl: './new-project-dialog.component.html',
  styleUrls: ['./new-project-dialog.component.css']
})
export class NewProjectDialogComponent implements OnInit {
  name?: string;

  constructor(
    public dialogRef: MatDialogRef<NewProjectDialogComponent>
  ) {}

  ngOnInit(): void {
  }

  onBack(): void {
    this.dialogRef.close();
  }
}
