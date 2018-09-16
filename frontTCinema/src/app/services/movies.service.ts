import { Movie } from './../classes/movie';
import { Injectable } from '@angular/core';

@Injectable()
export class MoviesService {
moviesList:Movie[] = [
  new Movie("Harry Potter: Czara Ognia", "Fantasy",150,"/urlbylejaki","J.K. Rowling",["rudy","ruda","Harry"],8, "Harry Potter jest głównym bohaterem książki J.K. Rowling pt. „Harry Potter i więzień Azkabanu”. Harry stracił swoich rodziców gdy miał około roku i teraz jest wychowywany przez siostrę swojej matki Petunię Dursley i wuja Vernona Dursleya. W swoje jedenaste urodziny Harry dowiedział się, że jest czarodziejem i, że będzie chodził do Hogwartu – szkoły dla czarodziejów. Poznajemy go gdy jest na trzecim roku nauki",new Date(1994,8,13)),
  new Movie("Harry Potter: Ksiaze Półkrwi", "Fantasy",140,"/urlbylejaki","J.K. Rowling",["ja","Ty","Harry"],5, "Harry Potter jest głównym bohaterem książki J.K. Rowling pt. „Harry Potter i więzień Azkabanu”. Harry stracił swoich rodziców gdy miał około roku i teraz jest wychowywany przez siostrę swojej matki Petunię Dursley i wuja Vernona Dursleya. W swoje jedenaste urodziny Harry dowiedział się, że jest czarodziejem i, że będzie chodził do Hogwartu – szkoły dla czarodziejów. Poznajemy go gdy jest na trzecim roku nauki",new Date(1998,2,16))
];


/*
      this.name = name;
      this.category = category;
      this.length = length;
      this.photoURL = photoURL;
      this.producer = producer;
      this.actors = actors;
      this.rating = rating;
      this.aboutMovie = aboutMovie;
      this.releaseDate = releaseDate;


*/
  constructor() { }

  getMovies(){
    return new Promise((res,rej) => {
      res(this.moviesList);
    })
  }
}
