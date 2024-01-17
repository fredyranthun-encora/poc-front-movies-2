/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieSearchServiceService {
  private baseUrl: string = 'https://api.themoviedb.org/3';
  private apiKey: string = 'feb6f0eeaa0a72662967d77079850353';

  constructor(private http: HttpClient) {
    this.http;
  }

  getMovies(query: string, page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search/movie`, {
      params: {
        page,
        query,
        api_key: this.apiKey,
      },
    });
  }

  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/${movieId}`, {
      params: {
        api_key: this.apiKey,
      },
    });
  }
}
