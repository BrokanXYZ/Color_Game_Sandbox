import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Cell from '../models/Cell';

import { SetPreviewColorContext } from '../contexts/SetPreviewColorContext';


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
    
    return (
          <SetPreviewColorContext.Consumer>
          {({setPreviewColor, initSetPreviewColor}) => 
            {   
              return(
                <Grid item className={classes.cell} onClick={()=>setPreviewColor(cell.color)}/>
              )
            }
          }
          </SetPreviewColorContext.Consumer>
    )
}