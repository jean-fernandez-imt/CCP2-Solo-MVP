import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }

  /** GET all projects from the server */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>("https://keeping-it-together-api.herokuapp.com/api/projects")
      .pipe(
        catchError(this.handleError<Project[]>('getProjects', []))
      );
  }

  /** GET project by id. Will 404 if id not found */
  getProject(id: string): Observable<Project> {
    const url = `https://keeping-it-together-api.herokuapp.com/api/project/${id}`;

    return this.http.get<Project>(url).pipe(
      catchError(this.handleError<Project>(`getProject id=${id}`))
    );
  }

  /** POST: add a new project to the server */
  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>("https://keeping-it-together-api.herokuapp.com/api/project", project, this.httpOptions)
      .pipe(
        catchError(this.handleError<Project>('createProject'))
      );
  }

  /** PUT: update a project on the server */
  updateProject(project: Project): Observable<any> {
    return this.http.put(`https://keeping-it-together-api.herokuapp.com/api/project/${project.id}`, project, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateProject'))
    );
  }

  /** DELETE: delete a project from the server */
  deleteProject(id: string): Observable<Project> {
    const url = `https://keeping-it-together-api.herokuapp.com/api/project/${id}`;
  
    return this.http.delete<Project>(url, this.httpOptions).pipe(
      catchError(this.handleError<Project>('deleteProject'))
    );
  }
}
