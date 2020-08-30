import Color from "./Color";

export default class ColorToolCellProperties {
    staticColor: boolean;

    constructor(staticColor: boolean) {
        this.staticColor = staticColor;
    }
    
    clone(): ColorToolCellProperties {
        return new ColorToolCellProperties(this.staticColor);
    }
}