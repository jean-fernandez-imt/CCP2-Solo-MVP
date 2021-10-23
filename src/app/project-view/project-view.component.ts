import { Component, OnInit } from '@angular/core';

import { Project } from '../project';
import { Item } from '../item';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {
  selectedProject?: Project;

  items: Item[] = [];

  constructor() { }

  ngOnInit(): void {
    if (this.selectedProject) {
      this.items = this.selectedProject.items;
    }
  }

}
