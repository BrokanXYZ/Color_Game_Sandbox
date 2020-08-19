import React, {useState, Dispatch, SetStateAction} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';


const useStyles = makeStyles((theme) => ({
  fab: isSimulationRunning => ({
    position: 'absolute',
    right: '0',
    bottom: '0',
    marginRight: '60px',
    marginBottom: '30px',
    backgroundColor: isSimulationRunning ? 'rgb(165, 15, 15)' : 'rgb(15, 165, 15)',
    '&:hover':{
      backgroundColor: isSimulationRunning ? 'rgb(185, 15, 15)' : "rgb(15, 185, 15)"
    }
  })
}));

export default function StartStopFab(
  {
    isSimulationRunning,
    setIsSimulationRunning
  }
  :
  {
      isSimulationRunning: boolean,
      setIsSimulationRunning: Dispatch<SetStateAction<boolean>>
  }
) 
{
    
  const classes = useStyles(isSimulationRunning);
  
  return (
    <Fab 
      className={classes.fab} 
      onClick={()=>{setIsSimulationRunning(!isSimulationRunning)}}
    >
      { isSimulationRunning ? 
        <StopIcon style={{color: 'white'}}/>
        :
        <PlayArrowIcon style={{color: 'white'}}/>
      }
    </Fab>
  );
}