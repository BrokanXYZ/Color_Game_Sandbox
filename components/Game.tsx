import { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';

import Cell from '../models/Cell';
import Color from '../models/Color';

import useInterval from '../hooks/UseInterval';

import GameCell from './GameCell';


export default function Game() {

    const rows: number = 20;
    const columns: number = 30;
    const tickLength: number = 500;

    const initGameGridCells = (): Cell[][] => {

        let newGameGrid: Cell[][] = [];

        for(let i: number = 0; i<rows; i++){
            let row = [];

            for(let j: number = 0; j<columns; j++){
                row.push(
                    {
                        color: new Color(255, 255, 255)
                    }
                );
            }

            newGameGrid.push(row);
        }

        newGameGrid[0][0].color = new Color(255, 0, 0);
        newGameGrid[0][columns-1].color = new Color(255, 255, 0);
        newGameGrid[rows-1][0].color = new Color(0, 255, 0);
        newGameGrid[rows-1][columns-1].color = new Color(0, 0, 255);

        newGameGrid[rows/2-1][columns/2-1].color = new Color(0, 0, 0);

        return newGameGrid;
    }

    const [gameGrid, setGameGrid] = useState<Cell[][]>(initGameGridCells());

    const getClonedGameGrid = (): Cell[][] => {

        let clonedGameGrid: Cell[][] = [];

        gameGrid.forEach(row => {
            let clonedRow: Cell[] = [];

            row.forEach(cell => {
                clonedRow.push(Object.assign({},cell));
            });

            clonedGameGrid.push(clonedRow);
        });

        return clonedGameGrid;
    };

    const spreadColor = (cell: Cell, i: number, j: number): Color => {

        let newColor: Color;

        if(cell.color.g > 0){
            newColor = new Color(cell.color.r, cell.color.g - 1, cell.color.b);
        }
        else{
            newColor = new Color(cell.color.r, cell.color.g, cell.color.b);
        }

        return newColor;
    };

    const gameLoop = () => {

        const newGameGrid: Cell[][] = getClonedGameGrid();

        gameGrid.forEach(
            (row, i) => {
                row.forEach(
                    (cell, j) => {
                        newGameGrid[i][j].color = spreadColor(cell, i, j);
                    }
                );
            }
        );

        setGameGrid(newGameGrid);
    };    
    
    useInterval(() => {
        gameLoop();
    }, tickLength);


  return (
   <Grid container>
       {gameGrid.map(
                (row, index) => {
                    return(
                        <Grid container item xs={12} key={"row-"+index}>
                            {row.map(
                                (cell, index) => {
                                    return(
                                        <GameCell cell={cell} key={"cell-"+index}/>
                                    )
                                }
                            )}
                        </Grid>
                    )
                }
        )}
   </Grid>
  )
}