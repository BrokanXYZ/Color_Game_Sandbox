import { useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import Game from '../components/Game';
import CustomAppBar from '../components/CustomAppBar';
import StartStopFab from '../components/StartStopFab';

import Color from '../models/Color';

import { SetPreviewColorContext } from '../contexts/SetPreviewColorContext';


const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    width: '1250px',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Index() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [setPreviewColor, initSetPreviewColor] = useState<(newPreviewColor: Color)=>void>(
    () => (newPreviewColor: Color) => {}
  );

  const SetPreviewColorContextValue = 
    { 
      setPreviewColor: setPreviewColor, 
      initSetPreviewColor: initSetPreviewColor
    };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Layout>
      
      <CssBaseline />

      <SetPreviewColorContext.Provider value={SetPreviewColorContextValue}>
        <CustomAppBar 
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
        <main
          className={classes.content}
        >
          <Game />
          <StartStopFab />
        </main>
      </SetPreviewColorContext.Provider>

    </Layout>
  )
}