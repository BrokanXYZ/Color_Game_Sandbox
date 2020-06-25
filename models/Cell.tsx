import Color from './Color';

export default class Cell {
    color: Color;

    constructor(color: Color) {
        this.color = color;
    }

    clone(): Cell{
        return new Cell(this.color);
    }
}