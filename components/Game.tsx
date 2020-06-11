import { useState } from 'react';

import Grid from '@material-ui/core/Grid';

import Cell from '../models/Cell';
import Color from '../models/Color';

import GameCell from './GameCell';


export default function Game() {

    const rows: number = 20;
    const columns: number = 30;
    let gameGrid: Cell[][] = [];

    let [tickNumber, setTickNumber] = useState(1);
    const gameTick: number = 1000;

    const initGameGridCells = () => {

        for(let i: number = 0; i<rows; i++){
            let row = [];

            for(let j: number = 0; j<columns; j++){
                row.push(
                    {
                        color: new Color(255, 255, 255)
                    }
                );
            }

            gameGrid.push(row);
        }

        gameGrid[0][0].color = new Color(255, 0, 0);
        gameGrid[0][columns-1].color = new Color(255, 255, 0);
        gameGrid[rows-1][0].color = new Color(0, 255, 0);
        gameGrid[rows-1][columns-1].color = new Color(0, 0, 255);

        gameGrid[rows/2-1][columns/2-1].color = new Color(0, 0, 0);

    }

    const spreadColor = (cell: Cell, i: number, j: number) => {

        //let colorTransform: Color = new Color(0, 0, 0);

        if(cell.color.g > 0){
            return new Color(cell.color.r, cell.color.g - 3, cell.color.b);
        }
        else{
            return new Color(cell.color.r, cell.color.g, cell.color.b);
        }
    }

    const gameLoop = (gameTick: number) => {

        //let newGameGrid: Cell[][] = ;

        //console.groupCollapsed("Tick - " + tickNumber);

        gameGrid.forEach(
            (row, i) => {
                row.forEach(
                    (cell, j) => {
                        gameGrid[i][j].color = spreadColor(cell, i, j);
                    }
                );
            }
        );

        //console.log(gameGrid);

        //console.groupEnd();

        //setTickNumber(tickNumber++);

        setTimeout(gameLoop, gameTick, gameTick);
    }

    

    initGameGridCells();
    gameLoop(gameTick);



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