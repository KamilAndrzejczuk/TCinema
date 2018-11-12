export class Movie {
    id: String
    title: String;
    productionYear: Date;
    director: String;

    constructor(i,t, p, d) {
        this.id = i;
        this.title = t;
        this.productionYear = p;
        this.director = d;
    }
}
