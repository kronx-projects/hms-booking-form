import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Request } from './interfaces/request';
@Injectable({
  providedIn: 'root',
})

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  apiUrl: string = 'https://localhost:8080/api/v1/request';
  
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  httpOptions = {
    headers: this.headers
  };
  constructor(private http: HttpClient) {}
  // Create
  createRequest(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/new-request`;
    console.log(data);
    return this.http.post<any>(API_URL, data, this.httpOptions).pipe(catchError(this.error));
  }
  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
