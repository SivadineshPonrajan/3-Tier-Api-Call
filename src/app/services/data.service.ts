import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {  throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { dat } from "../classes/dat";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:5000/userbill/";

  constructor(public httpClient: HttpClient) { }

  public login(){
    return this.httpClient.get<dat[]>(this.REST_API_SERVER+"999").pipe(retry(3), catchError(this.handleError));
  }

  // get requeest function
  public sendGetRequest(key):Observable<dat[]> {
    return this.httpClient.get<dat[]>(this.REST_API_SERVER+key).pipe(retry(3), catchError(this.handleError));
  }

  public sendPostRequest(key, name, prod, price):Observable<any[]> {
    return this.httpClient.post<any[]>(this.REST_API_SERVER+key,{"name": name, "prod": prod,"price": price}).pipe(retry(3), catchError(this.handleError));
  }

  public sendPutRequest(key, name, prod, price):Observable<any[]> {
    return this.httpClient.put<any[]>(this.REST_API_SERVER+key,{"name": name, "prod": prod,"price": price}).pipe(retry(3), catchError(this.handleError));
  }
  public sendDeleteRequest(key):Observable<any[]> {
    return this.httpClient.delete<any[]>(this.REST_API_SERVER+key).pipe(retry(3), catchError(this.handleError));
  }

  public uns(){
  }

  // Error handling
  public handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
