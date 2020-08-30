import Color from './Color';

export default class Cell {
    color: Color;
    x: number;
    y: number;
    isColorStatic: boolean;

    constructor(color: Color, x: number, y: number, isColorStatic: boolean) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.isColorStatic = isColorStatic;
    }

    clone(): Cell{
        return new Cell(this.color, this.x, this.y, this.isColorStatic);
    }
}