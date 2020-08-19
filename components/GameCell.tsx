import { useState, Dispatch, SetStateAction } from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Cell from '../models/Cell';
import Color from '../models/Color';
import GameGrid from '../models/GameGrid';


const useStyles = makeStyles({
    cell: (cell: Cell) => ({
      width: '40px',
      height: '40px',
      backgroundColor: 'rgb(' + cell.color.r + ',' + cell.color.g + ',' + cell.color.b + ')'
    }),
  });

export default function GameCell( 
  { 
    cell,
    pointerActionType,
    previewColor,
    setPreviewColor,
    gameGrid,
    setGameGrid
  } 
  : 
  { 
    cell: Cell, 
    pointerActionType: string,
    previewColor: Color,
    setPreviewColor: Dispatch<SetStateAction<Color>>,
    gameGrid: GameGrid,
    setGameGrid: Dispatch<SetStateAction<GameGrid>>
  } 
)
{
    const classes = useStyles(cell);

    const handleClick = () => {
      switch(pointerActionType){
        case "get":
          setPreviewColor(cell.color)
          break;
        case "set":
          let newGameGrid = gameGrid.clone();
          newGameGrid.cells[cell.x][cell.y].color = previewColor;
          setGameGrid(newGameGrid);
          break;
        default:
          console.error("pointerActionType is incorrectly set: " + pointerActionType);
      }
    }

    
    return (
      <Grid item className={classes.cell} onClick={handleClick}/> 
    )
}