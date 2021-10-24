import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Project } from '../project';
import { NewProjectDialogComponent } from '../new-project-dialog/new-project-dialog.component';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.getProjects();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewProjectDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.createProject(result);
      }
    });
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

  createProject(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.projectService.createProject({ name } as Project)
      .subscribe(project => {
        this.projects.push(project);
      });
  }

  deleteProject(project: Project): void {
    this.projects = this.projects.filter(p => p !== project);
    this.projectService.deleteProject(project.id).subscribe();
  }
}
