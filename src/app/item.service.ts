import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
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

  /** POST: add a new project item to the server */
  addItem(item: Item, projectId: string): Observable<Item> {
    return this.http.post<Item>("api/item", {...item, projectId}, this.httpOptions)
      .pipe(
        catchError(this.handleError<Item>('addItem'))
      );
  }

  /** PUT: update the hero on the server */
  updateItem(item: Item): Observable<any> {
    return this.http.put(`api/item/${item.id}`, item, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateItem'))
    );
  }

  /** DELETE: delete a project item from the server */
  deleteItem(id: string): Observable<Item> {
    const url = `api/item/${id}`;
  
    return this.http.delete<Item>(url, this.httpOptions).pipe(
      catchError(this.handleError<Item>('deleteItem'))
    );
  }
}
