import { Movie } from './../classes/movie';
import { MoviesService } from './../services/movies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies;
  p:number = 1;
  constructor(private moviesService:MoviesService) { }

  ngOnInit() {
    this.moviesService.getMovies().then((movies) => {
      this.movies = movies;
    })
  }

}
