export class Seat{
    row: Number;
    column: Number;
    isReserved: Boolean;
    
    constructor(r: Number,c: Number, isR: Boolean = false){
        this.row = r;
        this.column = c;
        this.isReserved = isR;
    }
}