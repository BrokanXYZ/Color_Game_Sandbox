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

    clone(): Cell
    {
        return new Cell(this.color, this.x, this.y, this.isColorStatic);
    }

    getSpreadWeight(colorSpreadWeightStrategy: string): number
    {
        let weight: number;
        let rgbSum: number = this.color.r + this.color.b + this.color.g;

        switch(colorSpreadWeightStrategy)
        {
            case "asSumOfRgbValuesIncreasesWeightIncreases":
                weight = rgbSum/765;
                break;
            case "asSumOfRgbValuesIncreasesWeightDecreases":
                weight = 1-(rgbSum/765);
                break;
            case "allEqual":
            default:
                weight = 1;
        }

        return weight;

    } 
}