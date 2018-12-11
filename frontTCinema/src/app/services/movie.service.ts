import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Movie } from './../classes/movie';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }

  baseURL = `http://localhost:8080/movie`;

  newMovieTitle: String;
  newMovieProductionYear: Date;
  newMovieDirector: String;

  movies: Movie[] = [];

  getMovies() {
    return this.http.get(`${this.baseURL}/all`);
  }

  addMovie(newMovieTitle, newMovieProductionYear, newMovieDirector) {
 
    return this.http.post(`${this.baseURL}/add`, {
      title: newMovieTitle,
      productionYear: newMovieProductionYear,
      director: newMovieDirector
    });
  }

  deleteMovie(movieId) {
    return this.http.request('delete', `${this.baseURL}/remove`, { body: { id: movieId } });
  }
}
