import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { ItemDialogData } from '../itemDialogData';

@Component({
  selector: 'app-new-component-dialog',
  templateUrl: './new-component-dialog.component.html',
  styleUrls: ['./new-component-dialog.component.css']
})
export class NewComponentDialogComponent implements OnInit {
  item: ItemDialogData = {
    name: "",
    manufacturer: "",
    provider: "",
    price: 0,
    description: ""
  };

  constructor(
    public dialogRef: MatDialogRef<NewComponentDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  onBack(): void {
    this.dialogRef.close();
  }
}
