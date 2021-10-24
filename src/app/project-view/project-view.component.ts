import { Component, OnInit, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Project } from '../project';
import { Item } from '../item';
import { ItemDialogData } from '../itemDialogData';
import { NewComponentDialogComponent } from '../new-component-dialog/new-component-dialog.component';
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
      .subscribe(project => this.project = project);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewComponentDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.addItem(result);
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
      });
  }
}
