import Grid from '@material-ui/core/Grid';
import Cell from '../models/Cell';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    cell: (cell: Cell) => ({
      width: '40px',
      height: '40px',
      backgroundColor: 'rgb(' + cell.color.r + ',' + cell.color.g + ',' + cell.color.b + ')'
    }),
  });

export default function GameCell({
    cell,
    row,
    column
  }: {
    cell: Cell,
    row: number,
    column: number
  }) {

    const classes = useStyles(cell);
    
    return (
          <Grid item className={classes.cell} onClick={()=>{console.log("cell (" + row + ", " + column + ")")}}/>
    )
}