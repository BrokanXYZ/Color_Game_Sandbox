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
    cell
  }: {
    cell: Cell
  }) {

    const classes = useStyles(cell);
    
  return (
        <Grid item className={classes.cell} />
  )
}