import React, {Dispatch, SetStateAction} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import ColorTool from './ColorTool';
import GameOptions from './GameOptions';
import Color from '../models/Color';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

export default function CustomDrawer(
  {
    isDrawerOpen,
    handleDrawerClose,
    pointerActionType,
    setPointerActionType,
    previewColor,
    setPreviewColor,
    colorSpreadStrategy,
    setColorSpreadStrategy,
    colorSpreadMagnitude,
    setColorSpreadMagnitude,
    tickRate,
    setTickRate
  }
  : 
  {
    isDrawerOpen: boolean,
    handleDrawerClose: () => void,
    pointerActionType: string,
    setPointerActionType: Dispatch<SetStateAction<string>>,
    previewColor: Color,
    setPreviewColor: Dispatch<SetStateAction<Color>>,
    colorSpreadStrategy: string,
    setColorSpreadStrategy: Dispatch<SetStateAction<string>>,
    colorSpreadMagnitude: number,
    setColorSpreadMagnitude: Dispatch<SetStateAction<number>>,
    tickRate: number,
    setTickRate: Dispatch<SetStateAction<number>>
  }
) 
{
  const classes = useStyles();

  return (
    <Drawer
    className={classes.drawer}
    variant="persistent"
    anchor="left"
    open={isDrawerOpen}
    classes={{
      paper: classes.drawerPaper,
    }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>

      <Divider />
      <ColorTool 
        pointerActionType={pointerActionType}
        setPointerActionType={setPointerActionType}
        previewColor={previewColor}
        setPreviewColor={setPreviewColor}
      />
      <Divider />
      <GameOptions 
        colorSpreadStrategy={colorSpreadStrategy}
        setColorSpreadStrategy={setColorSpreadStrategy}
        colorSpreadMagnitude={colorSpreadMagnitude}
        setColorSpreadMagnitude={setColorSpreadMagnitude}
        tickRate={tickRate}
        setTickRate={setTickRate}
      />
      <Divider />

      <List>
        <ListItem>
          <Button variant="contained">
            Reset Grid
          </Button>
        </ListItem>
      </List>
      
    </Drawer>
  );
}