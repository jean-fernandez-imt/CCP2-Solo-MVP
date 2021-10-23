import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Project } from '../project';
import { NewProjectDialogComponent } from '../new-project-dialog/new-project-dialog.component';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit {
  projects: Project[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewProjectDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const newProject: Project = {
        id: this.projects.length + 1,
        name: result,
        items: []
      };

      this.projects.push(newProject);
    });
  }
}
