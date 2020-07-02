import { useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Cell from '../models/Cell';

import { UpdatePreviewColorContext } from '../contexts/UpdatePreviewColorContext';


const useStyles = makeStyles({
    cell: (cell: Cell) => ({
      width: '40px',
      height: '40px',
      backgroundColor: 'rgb(' + cell.color.r + ',' + cell.color.g + ',' + cell.color.b + ')'
    }),
  });

export default function GameCell( { cell } : { cell: Cell } )
{
    const classes = useStyles(cell);

    const { updatePreviewColor, setUpdatePreviewColor } = useContext(UpdatePreviewColorContext);
    
    return (
      <Grid item className={classes.cell} onClick={()=>updatePreviewColor(cell.color)}/> 
    )
}