export class Movie {

  name: string;
  category: string;
  length: number;
  photoURL: string;
  producer: string;
  actors: string[];
  rating: number;
  aboutMovie: string;
  releaseDate: Date;

  constructor(
    name: string,
    category: string,
    length: number,
    photoURL: string,
    producer: string,
    actors: string[],
    rating: number,
    aboutMovie: string,
    releaseDate: Date){

      this.name = name;
      this.category = category;
      this.length = length;
      this.photoURL = photoURL;
      this.producer = producer;
      this.actors = actors;
      this.rating = rating;
      this.aboutMovie = aboutMovie;
      this.releaseDate = releaseDate;
  }
}
