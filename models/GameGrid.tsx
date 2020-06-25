import Cell from './Cell';
import Color from './Color';

export default class GameGrid {
    cells: Cell[][];
    rows: number;
    columns: number;

    constructor(rows: number, columns: number) {
        this.cells = [];
        this.rows = rows;
        this.columns = columns;
    }

    setStartingCells(){
        let newCells: Cell[][] = [];

        for(let i: number = 0; i<this.rows; i++){
            let row = [];

            for(let j: number = 0; j<this.columns; j++){
                row.push( new Cell(new Color(255, 255, 255)));
            }

            newCells.push(row);
        }

        newCells[0][0].color = new Color(255, 0, 0);
        newCells[0][this.columns-1].color = new Color(255, 255, 0);
        newCells[this.rows-1][0].color = new Color(0, 255, 0);
        newCells[this.rows-1][this.columns-1].color = new Color(0, 0, 255);

        newCells[this.rows/2-1][this.columns/2-1].color = new Color(0, 0, 0);

        this.cells = newCells;
    }

    clone(): GameGrid{

        let clonedGameGrid: GameGrid = new GameGrid(this.rows, this.columns);

        this.cells.forEach(row => {
            let clonedRow: Cell[] = [];

            row.forEach((cell: Cell) => {
                clonedRow.push(cell.clone());
            });

            clonedGameGrid.cells.push(clonedRow);
        });

        return clonedGameGrid;
    }


}