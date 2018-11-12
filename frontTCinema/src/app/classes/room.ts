export class Room {
    id: String;
    number: Number;
    rows: Number;
    columns: Number;
    constructor(i: String, n: Number, r: Number, c: Number) {
        this.id = i;
        this.number = n;
        this.rows = r;
        this.columns = c;
    }
}
