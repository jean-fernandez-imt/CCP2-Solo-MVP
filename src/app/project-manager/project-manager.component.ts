import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Project } from '../project';
import { NewProjectDialogComponent } from '../new-project-dialog/new-project-dialog.component';
import { EditProjectDialogComponent } from '../edit-project-dialog/edit-project-dialog.component';
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

  openNewProjectDialog(): void {
    const dialogRef = this.dialog.open(NewProjectDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.createProject(result);
      }
    });
  }

  openEditProjectDialog(project: Project): void {
    const dialogRef = this.dialog.open(EditProjectDialogComponent, {
      width: '250px',
      data: {
        id: project.id,
        name: project.name,
        items: project.items
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.editProject(result);
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

  editProject(project: Project): void {
    if (project) {
      const target = this.projects.filter(p => p.id === project.id);
      const index = this.projects.indexOf(target[0]);
      this.projects[index].name = project.name;
      this.projectService.updateProject(project).subscribe();
    }
  }

  deleteProject(project: Project): void {
    this.projects = this.projects.filter(p => p !== project);
    this.projectService.deleteProject(project.id).subscribe();
  }
}
