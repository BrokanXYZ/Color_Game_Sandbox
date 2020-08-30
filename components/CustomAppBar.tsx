import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';

import CustomDrawer from './CustomDrawer';
import { Dispatch, SetStateAction } from 'react';

import Color from '../models/Color';
import ColorToolCellProperties from '../models/ColorToolCellProperties';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundImage: 'linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)'
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
  }));


export default function CustomAppBar({
    open,
    handleDrawerOpen,
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
  }: {
    open: boolean,
    handleDrawerOpen: () => void,
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
  }) {
    const classes = useStyles();
    
  
    return (
        <>
            <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
            >
                <Toolbar>
                    <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap style={{textShadow: '0px 0px 4px black', width: '200px'}}>
                        &nbsp;Color Game Sandbox
                    </Typography>
                </Toolbar>
            </AppBar>
            <CustomDrawer
                isDrawerOpen={open}
                handleDrawerClose={handleDrawerClose}
                pointerActionType={pointerActionType}
                setPointerActionType={setPointerActionType}
                previewColor={previewColor}
                setPreviewColor={setPreviewColor}
                colorSpreadStrategy={colorSpreadStrategy}
                setColorSpreadStrategy={setColorSpreadStrategy}
                colorSpreadMagnitude={colorSpreadMagnitude}
                setColorSpreadMagnitude={setColorSpreadMagnitude}
                tickRate={tickRate}
                setTickRate={setTickRate}
                colorToolCellProperties={colorToolCellProperties}
                setColorToolCellProperties={setColorToolCellProperties}
                pleaseSetTheMap={pleaseSetTheMap}
                setPleaseSetTheMap={setPleaseSetTheMap}
                mapName={mapName}
                setMapName={setMapName}
            />
        </>
    );
}