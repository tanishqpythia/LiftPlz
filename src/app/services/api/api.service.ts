import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, lastValueFrom } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'http://localhost:8000';

  constructor(private http: HttpClient, private auth: AuthService,  private ngxLoader: NgxUiLoaderService) { }

  // Helper method to handle errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError({ status: error.status, error: errorMessage });
  }

  // Asynchronous GET request with error handling
  async getAsync(
    endpoint: string,
    params?: HttpParams,
    headers?: HttpHeaders,
    isAuthRequired = false,
    isUserIdRequired = false
  ): Promise<any> {
    this.ngxLoader.start();
  
    let url = `${this.baseUrl}/${endpoint}`;
    let requestHeaders = headers || new HttpHeaders();
    const requestParams = params || new HttpParams();
  
    if (isAuthRequired) {
      const token = this.auth.getToken();
      requestHeaders = requestHeaders.set('Authorization', `Bearer ${token}`);
    }
  
    if (isUserIdRequired) {
      const userId = this.auth.getUserId();
      url = url.includes('?') ? `${url}&userId=${userId}` : `${url}?userId=${userId}`;
    }
  
    try {
      const response = await lastValueFrom(
        this.http.get(url, { headers: requestHeaders, params: requestParams }).pipe(
          map(data => ({ status: 200, data })),
          catchError(this.handleError)
        )
      );
      return response;
    } catch (error) {
      return error;
    } finally {
      this.ngxLoader.stop();
    }
  }
  














  getSync(options: {
    endpoint: string;
    params?: HttpParams;
    headers?: HttpHeaders;
    isAuthRequired?: boolean;
    isUserIdRequired?: boolean;
  }): Observable<any> {
    // this.ngxLoader.start();
    const { endpoint, params = new HttpParams(), headers = new HttpHeaders(), isAuthRequired = false, isUserIdRequired = false } = options;
  
    let url = `${this.baseUrl}/${endpoint}`;
    let requestHeaders = headers;
    let requestParams = params;
  
    if (isAuthRequired) {
      const token = this.auth.getToken();
      requestHeaders = requestHeaders.set('Authorization', `Bearer ${token}`);
    }
  
    if (isUserIdRequired) {
      const userId = this.auth.getUserId();
      // Add userId as a query parameter
      if (url.includes('?')) {
        url += `&userId=${userId}`;
      } else {
        url += `?userId=${userId}`;
      }
    }
  
    console.log("URL:", url);
    console.log("Headers:", requestHeaders);
    console.log("Params:", requestParams);
  
    // this.ngxLoader.stop();
    return this.http.get(url, { headers: requestHeaders, params: requestParams }).pipe(
      map(data => ({ status: 200, data })),
      catchError(this.handleError)
    );
  }
  
  










  // Asynchronous POST request with error handling
  async postAsync(
    endpoint: string,
    body: any,
    headers?: HttpHeaders,
    isAuthRequired = false,
    isUserIdRequired = false
  ): Promise<any> {
    this.ngxLoader.start();
  
    let url = `${this.baseUrl}/${endpoint}`;
    let requestHeaders = headers || new HttpHeaders();
  
    if (isAuthRequired) {
      const token = this.auth.getToken();
      requestHeaders = requestHeaders.set('Authorization', `Bearer ${token}`);
    }
  
    if (isUserIdRequired) {
      const userId = this.auth.getUserId();
      url = url.includes('?') ? `${url}&userId=${userId}` : `${url}?userId=${userId}`;
    }
  
    try {
      const response = await lastValueFrom(
        this.http.post(url, body, { headers: requestHeaders }).pipe(
          map(data => ({ status: 200, data })),
          catchError(this.handleError)
        )
      );
      return response;
    } catch (error) {
      return error;
    } finally {
      this.ngxLoader.stop();
    }
  }
  

  // Synchronous POST request with error handling
  postSync(options: {
    endpoint: string;
    body: any;
    headers?: HttpHeaders;
    isAuthRequired?: boolean;
    isUserIdRequired?: boolean;
  }): Observable<any> {
    this.ngxLoader.start();

    const { endpoint, body , headers = new HttpHeaders(), isAuthRequired = false, isUserIdRequired = false } = options;
  
    let url = `${this.baseUrl}/${endpoint}`;
    let requestHeaders = headers || new HttpHeaders();
  
    if (isAuthRequired) {
      const token = this.auth.getToken();
      requestHeaders = requestHeaders.set('Authorization', `Bearer ${token}`);
    }
  
    if (isUserIdRequired) {
      const userId = this.auth.getUserId();
      url = url.includes('?') ? `${url}&userId=${userId}` : `${url}?userId=${userId}`;
    }
  
    this.ngxLoader.stop();

    console.log("calling URL", url)
    console.log("calling body", body)
  
    return this.http.post(url, body, { headers: requestHeaders }).pipe(
      map(data => ({ status: 200, data })),
      catchError(this.handleError)
    );
  }
  

  // Asynchronous DELETE request with error handling
  async deleteAsync(
    endpoint: string,
    headers?: HttpHeaders,
    isAuthRequired = false,
    isUserIdRequired = false
  ): Promise<any> {
    this.ngxLoader.start();
  
    let url = `${this.baseUrl}/${endpoint}`;
    let requestHeaders = headers || new HttpHeaders();
  
    if (isAuthRequired) {
      const token = this.auth.getToken();
      requestHeaders = requestHeaders.set('Authorization', `Bearer ${token}`);
    }
  
    if (isUserIdRequired) {
      const userId = this.auth.getUserId();
      url = url.includes('?') ? `${url}&userId=${userId}` : `${url}?userId=${userId}`;
    }
  
    try {
      const response = await lastValueFrom(
        this.http.delete(url, { headers: requestHeaders }).pipe(
          map(data => ({ status: 200, data })),
          catchError(this.handleError)
        )
      );
      return response;
    } catch (error) {
      return error;
    } finally {
      this.ngxLoader.stop();
    }
  }
  

  // Synchronous DELETE request with error handling
  deleteSync(
    endpoint: string,
    headers?: HttpHeaders,
    isAuthRequired = false,
    isUserIdRequired = false
  ): Observable<any> {
    this.ngxLoader.start();
  
    let url = `${this.baseUrl}/${endpoint}`;
    let requestHeaders = headers || new HttpHeaders();
  
    if (isAuthRequired) {
      const token = this.auth.getToken();
      requestHeaders = requestHeaders.set('Authorization', `Bearer ${token}`);
    }
  
    if (isUserIdRequired) {
      const userId = this.auth.getUserId();
      url = url.includes('?') ? `${url}&userId=${userId}` : `${url}?userId=${userId}`;
    }
  
    this.ngxLoader.stop();
  
    return this.http.delete(url, { headers: requestHeaders }).pipe(
      map(data => ({ status: 200, data })),
      catchError(this.handleError)
    );
  }
  
}
