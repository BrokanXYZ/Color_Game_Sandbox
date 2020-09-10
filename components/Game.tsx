import React from 'react';
import { useState, useEffect, SetStateAction, Dispatch } from 'react';

import Grid from '@material-ui/core/Grid';

import Cell from '../models/Cell';
import Color from '../models/Color';
import GameGrid from '../models/GameGrid';
import ColorToolCellProperties from '../models/ColorToolCellProperties';

import useInterval from '../hooks/UseInterval';

import GameCell from './GameCell';


export default function Game(
    {
        pointerActionType,
        previewColor,
        setPreviewColor,
        isSimulationRunning,
        colorSpreadWeightStrategy,
        colorSpreadMagnitude,
        tickRate,
        colorToolCellProperties,
        pleaseSetTheMap,
        mapName
    }
    :
    {
        pointerActionType: string,
        previewColor: Color,
        setPreviewColor: Dispatch<SetStateAction<Color>>,
        isSimulationRunning: boolean,
        colorSpreadWeightStrategy: string,
        colorSpreadMagnitude: number,
        tickRate: number,
        colorToolCellProperties: ColorToolCellProperties,
        pleaseSetTheMap: boolean,
        mapName: string
    }
) 
{

    const rows: number = 20;
    const columns: number = 30;

    const [gameGrid, setGameGrid] = useState<GameGrid>( () => {
        let initialGameGrid = new GameGrid(rows, columns);
        initialGameGrid.setMap("basic");
        return initialGameGrid;
    });

    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

    useEffect(() => {
        let newGameGrid: GameGrid = gameGrid.clone();
        newGameGrid.setMap(mapName);
        setGameGrid(newGameGrid);
    }, [pleaseSetTheMap]);

    const spreadColor = (cell: Cell, i: number, j: number): Color => {
        
        let newColor: Color = cell.color;
        
        if(!cell.isColorStatic)
        {
            let neighborColors: Color[] = [];
            let neighborColorWeights: number[] = [];

            // Get neighbor colors and weights
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
                            const cell: Cell = gameGrid.cells[x][y];
                            neighborColors.push(cell.color);
                            neighborColorWeights.push(cell.getSpreadWeight(colorSpreadWeightStrategy));
                        }
                    }
                }
            }

            const neighborRedValues: number[] = neighborColors.map(val => val.r);
            const neighborGreenValues: number[] = neighborColors.map(val => val.g);
            const neighborBlueValues: number[] = neighborColors.map(val => val.b);

            const sumOfWeights: number = neighborColorWeights.reduce((prev, cur) => prev + cur);

            const weightedSumRed: number = neighborRedValues.reduce((prev, cur, index) => prev + (cur * neighborColorWeights[index]), 0);
            const weightedSumGreen: number = neighborGreenValues.reduce((prev, cur, index) => prev + (cur * neighborColorWeights[index]), 0);
            const weightedSumBlue: number = neighborBlueValues.reduce((prev, cur, index) => prev + (cur * neighborColorWeights[index]), 0);
            
            const weightedAveragedRed: number = sumOfWeights === 0 ? cell.color.r : weightedSumRed / sumOfWeights;
            const weightedAveragedGreen: number = sumOfWeights === 0 ? cell.color.g : weightedSumGreen / sumOfWeights;
            const weightedAveragedBlue: number = sumOfWeights === 0 ? cell.color.b : weightedSumBlue / sumOfWeights;

            const redDiff: number = weightedAveragedRed - cell.color.r;
            const greenDiff: number = weightedAveragedGreen - cell.color.g;
            const blueDiff: number = weightedAveragedBlue - cell.color.b;
            
            const normalizedRedDiff: number = redDiff / 255 ;
            const normalizedGreenDiff: number = greenDiff / 255;
            const normalizedBlueDiff: number = blueDiff / 255;

            const deltaRed = cell.color.r + (normalizedRedDiff * colorSpreadMagnitude);
            const deltaGreen = cell.color.g + (normalizedGreenDiff * colorSpreadMagnitude);
            const deltaBlue = cell.color.b + (normalizedBlueDiff * colorSpreadMagnitude);

            const newRed = deltaRed > 255 || deltaRed < 0 ? cell.color.r : deltaRed;
            const newGreen = deltaGreen > 255 || deltaGreen < 0 ? cell.color.g : deltaGreen;
            const newBlue = deltaBlue > 255 || deltaBlue < 0 ? cell.color.b : deltaBlue;

            newColor = new Color(newRed, newGreen, newBlue);
        }

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
                                                colorToolCellProperties={colorToolCellProperties}
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