import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl || 'http://localhost:3000/api';

  /**
   * Requête GET générique
   */
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Requête POST générique
   */
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Requête PUT générique
   */
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Requête DELETE générique
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Gestion d'erreur centralisée
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    
    if (error.status === 0) {
      // Erreur réseau
      errorMessage = 'Impossible de contacter le serveur';
    } else if (error.status >= 400 && error.status < 500) {
      // Erreur client
      errorMessage = error.error?.message || 'Erreur de requête';
    } else if (error.status >= 500) {
      // Erreur serveur
      errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
    }

    console.error('Erreur API:', error);
    return throwError(() => new Error(errorMessage));
  }
} 