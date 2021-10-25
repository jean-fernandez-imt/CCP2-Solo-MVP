import { Component, OnInit, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Project } from '../project';
import { Item } from '../item';
import { ItemDialogData } from '../itemDialogData';
import { NewComponentDialogComponent } from '../new-component-dialog/new-component-dialog.component';
import { EditItemDialogComponent } from '../edit-item-dialog/edit-item-dialog.component';
import { ProjectService } from '../project.service';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {
  @Input() project: Project = {
    id: "",
    name: "",
    items: []
  };

  itemsTotalPrice: number = 0;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private itemService: ItemService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getProject();
  }

  getProject(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProject(id)
      .subscribe(project => {
        this.project = project;
        this.calculateTotalPrice();
      });
  }

  calculateTotalPrice(): void {
    this.itemsTotalPrice = 0;
    for (const item of this.project.items) {
      this.itemsTotalPrice = this.itemsTotalPrice + item.price;
    }
  }

  openNewItemDialog(): void {
    const dialogRef = this.dialog.open(NewComponentDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.addItem(result);
      }
    });
  }

  openEditItemDialog(item: Item): void {
    const dialogRef = this.dialog.open(EditItemDialogComponent, {
      width: '250px',
      data: {
        id: item.id,
        name: item.name, 
        manufacturer: item.manufacturer,
        provider: item.provider,
        price: item.price,
        description: item.description
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.editItem(result);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  addItem(item: ItemDialogData): void {
    if (item.name === "" || item.price <= 0) { return; }

    this.itemService.addItem({ ...item } as Item, this.project.id)
      .subscribe(item => {
        this.project.items.push(item);
        this.calculateTotalPrice();
      });
  }

  editItem(item: Item): void {
    if (item) {
      const target = this.project.items.filter(i => i.id === item.id);
      const index = this.project.items.indexOf(target[0]);
      this.project.items[index] = item;
      this.calculateTotalPrice();
      this.itemService.updateItem(item).subscribe();
    }
  }

  deleteItem(item: Item): void {
    this.project.items = this.project.items.filter(i => i !== item);
    this.calculateTotalPrice();
    this.itemService.deleteItem(item.id).subscribe();
  }
}
