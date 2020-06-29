import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';


const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    marginRight: '60px',
    marginBottom: '30px',
    backgroundColor: 'rgb(15, 165, 15)',
    '&:hover':{
      backgroundColor: 'rgb(15, 185, 15)'
    }
  }
}));

export default function StartStopFab() {
    
  const classes = useStyles();

  const [tickRate, setTickRate] = useState<number>(1000);
  
  return (
    <Fab color="primary" className={classes.fab}>
        <PlayArrowIcon />
    </Fab>
  );
}