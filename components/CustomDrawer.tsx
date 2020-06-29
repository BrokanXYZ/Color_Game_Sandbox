import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import PreviewColor from './PreviewColor';
import GameOptions from './GameOptions';


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

export default function CustomDrawer({
  isDrawerOpen,
  handleDrawerClose,
}: {
  isDrawerOpen: boolean,
  handleDrawerClose: () => void,
}) {
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
      <PreviewColor />
      <Divider />
      <GameOptions />
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