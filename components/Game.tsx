import React from 'react';
import { useState, SetStateAction, Dispatch } from 'react';

import Grid from '@material-ui/core/Grid';

import Cell from '../models/Cell';
import Color from '../models/Color';
import GameGrid from '../models/GameGrid';

import useInterval from '../hooks/UseInterval';

import GameCell from './GameCell';


export default function Game(
    {
        pointerActionType,
        previewColor,
        setPreviewColor
    }
    :
    {
        pointerActionType: string,
        previewColor: Color,
        setPreviewColor: Dispatch<SetStateAction<Color>>
    }
) 
{

    const rows: number = 20;
    const columns: number = 30;
    const tickLength: number = 500;

    const [gameGrid, setGameGrid] = useState<GameGrid>( () => {
        let initialGameGrid = new GameGrid(rows, columns);
        initialGameGrid.setStartingCells();
        return initialGameGrid;
    });

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

        const newGameGrid: GameGrid = gameGrid.clone();

        gameGrid.cells.forEach(
            (row, i) => {
                row.forEach(
                    (cell, j) => {
                        newGameGrid.cells[i][j].color = spreadColor(cell, i, j);
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
   <Grid container style={{marginTop: "20px"}}>
       {gameGrid.cells.map(
                (row, i) => {
                    return(
                        <Grid container item xs={12} key={"row-"+i}>
                            {row.map(
                                (cell, j) => {
                                    return(
                                        <GameCell 
                                            cell={cell} 
                                            key={"cell-"+j} 
                                            pointerActionType={pointerActionType}
                                            previewColor={previewColor}
                                            setPreviewColor={setPreviewColor}
                                            gameGrid={gameGrid}
                                            setGameGrid={setGameGrid}
                                        />
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