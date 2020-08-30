import React, {Dispatch, SetStateAction} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import ColorTool from './ColorTool';
import GameOptions from './GameOptions';
import MapOptions from './MapOptions';
import Color from '../models/Color';
import ColorToolCellProperties from '../models/ColorToolCellProperties';


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
    setTickRate,
    colorToolCellProperties,
    setColorToolCellProperties,
    pleaseSetTheMap,
    setPleaseSetTheMap,
    mapName,
    setMapName
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
    setTickRate: Dispatch<SetStateAction<number>>,
    colorToolCellProperties: ColorToolCellProperties,
    setColorToolCellProperties: Dispatch<SetStateAction<ColorToolCellProperties>>,
    pleaseSetTheMap: boolean,
    setPleaseSetTheMap: Dispatch<SetStateAction<boolean>>,
    mapName: string,
    setMapName: Dispatch<SetStateAction<string>>
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
        colorToolCellProperties={colorToolCellProperties}
        setColorToolCellProperties={setColorToolCellProperties}
      />
      <Divider />
      <MapOptions
        pleaseSetTheMap={pleaseSetTheMap}
        setPleaseSetTheMap={setPleaseSetTheMap}
        mapName={mapName}
        setMapName={setMapName}
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
    </Drawer>
  );
}