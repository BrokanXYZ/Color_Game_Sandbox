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
        setPreviewColor,
        isSimulationRunning,
        colorSpreadStrategy,
        colorSpreadMagnitude,
        tickRate
    }
    :
    {
        pointerActionType: string,
        previewColor: Color,
        setPreviewColor: Dispatch<SetStateAction<Color>>,
        isSimulationRunning: boolean,
        colorSpreadStrategy: string,
        colorSpreadMagnitude: number,
        tickRate: number
    }
) 
{

    const rows: number = 20;
    const columns: number = 30;

    const [gameGrid, setGameGrid] = useState<GameGrid>( () => {
        let initialGameGrid = new GameGrid(rows, columns);
        initialGameGrid.setStartingCells();
        return initialGameGrid;
    });

    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

    const spreadColor = (cell: Cell, i: number, j: number): Color => {

        let newColor: Color = cell.color;
        let neighborColors: Color[] = [];

        // Get neighborColors
        for(let x=i-1; x<i+2; x++)
        {
            const isRowOutOfRange: boolean = x < 0 || x >= gameGrid.rows;
            if(!isRowOutOfRange)
            {
                for(let y=j-1; y<j+2; y++)
                {
                    const isColumnOutOfRange: boolean = y < 0 || y >= gameGrid.columns;
                    const isThisCell: boolean = x === i && y === j;
                    if(!isColumnOutOfRange && !isThisCell)
                    {
                        neighborColors.push(gameGrid.cells[x][y].color);
                    }
                }
            }
        }

        const neighborRedValues: number[] = neighborColors.map(val => val.r);
        const neighborGreenValues: number[] = neighborColors.map(val => val.g);
        const neighborBlueValues: number[] = neighborColors.map(val => val.b);

        const averagedRed: number = neighborRedValues.reduce((acc, cur) => acc + cur) / neighborRedValues.length;
        const averagedGreen: number = neighborGreenValues.reduce((acc, cur) => acc + cur) / neighborGreenValues.length;
        const averagedBlue: number = neighborBlueValues.reduce((acc, cur) => acc + cur) / neighborBlueValues.length;

        const redDiff: number = averagedRed - cell.color.r;
        const greenDiff: number = averagedGreen - cell.color.g;
        const blueDiff: number = averagedBlue - cell.color.b;
        
        const normalizedRedDiff: number = (redDiff / 255) * colorSpreadMagnitude;
        const normalizedGreenDiff: number = (greenDiff / 255) * colorSpreadMagnitude;
        const normalizedBlueDiff: number = (blueDiff / 255) * colorSpreadMagnitude;

        const deltaRed = cell.color.r + normalizedRedDiff;
        const deltaGreen = cell.color.g + normalizedGreenDiff;
        const deltaBlue = cell.color.b + normalizedBlueDiff;

        const newRed = deltaRed > 255 || deltaRed < 0 ? cell.color.r : deltaRed;
        const newGreen = deltaGreen > 255 || deltaGreen < 0 ? cell.color.g : deltaGreen;
        const newBlue = deltaBlue > 255 || deltaBlue < 0 ? cell.color.b : deltaBlue;

        newColor = new Color(newRed, newGreen, newBlue);

        return newColor;
    };

    const gameLoop = () => {

        if(isSimulationRunning){
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
        }
    };    
    
    useInterval(() => {
        gameLoop();
    }, tickRate);

    return (
    <Grid 
        container 
        style={{marginTop: "20px", boxShadow: "0px 0px 25px 4px grey"}}
        onMouseEnter={()=>setIsMouseDown(false)}
    >
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
                                                isMouseDown={isMouseDown}
                                                setIsMouseDown={setIsMouseDown}
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