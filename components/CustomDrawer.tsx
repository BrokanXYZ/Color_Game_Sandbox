import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Color from '../models/Color';
import PreviewColor from './PreviewColor';


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

      <List>
      </List>

      <Divider />

      <List>
      </List>
    </Drawer>
  );
}