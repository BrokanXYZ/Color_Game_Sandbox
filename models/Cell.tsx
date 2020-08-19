import Color from './Color';

export default class Cell {
    color: Color;
    x: number;
    y: number;

    constructor(color: Color, x: number, y: number) {
        this.color = color;
        this.x = x;
        this.y = y;
    }

    clone(): Cell{
        return new Cell(this.color, this.x, this.y);
    }
}