import { useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import Game from '../components/Game';
import CustomAppBar from '../components/CustomAppBar';
import StartStopFab from '../components/StartStopFab';

import Color from '../models/Color';
import ColorToolCellProperties from '../models/ColorToolCellProperties';


const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    width: '1250px',
    padding: '25px',
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
  const [pointerActionType, setPointerActionType] = useState<string>("get");
  const [previewColor, setPreviewColor] = useState<Color>(new Color(255,255,255));
  const [colorSpreadMagnitude, setColorSpreadMagnitude] = useState<number>(15);
  const [tickRate, setTickRate] = useState<number>(500);
  const [colorSpreadWeightStrategy, setColorSpreadWeightStrategy] = useState<string>("allEqual");
  const [isSimulationRunning, setIsSimulationRunning] = useState<boolean>(false);
  const [colorToolCellProperties, setColorToolCellProperties] = useState<ColorToolCellProperties>(new ColorToolCellProperties(false));
  const [mapName, setMapName] = useState<string>("white");
  const [pleaseSetTheMap, setPleaseSetTheMap] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Layout>
      
      <CssBaseline />

      <CustomAppBar 
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        pointerActionType={pointerActionType}
        setPointerActionType={setPointerActionType}
        previewColor={previewColor}
        setPreviewColor={setPreviewColor}
        colorSpreadWeightStrategy={colorSpreadWeightStrategy}
        setColorSpreadWeightStrategy={setColorSpreadWeightStrategy}
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
      <main
        className={classes.content}
      >
        <Game 
          pointerActionType={pointerActionType}
          previewColor={previewColor}
          setPreviewColor={setPreviewColor}
          isSimulationRunning={isSimulationRunning}
          colorSpreadWeightStrategy={colorSpreadWeightStrategy}
          colorSpreadMagnitude={colorSpreadMagnitude}
          tickRate={tickRate}
          colorToolCellProperties={colorToolCellProperties}
          pleaseSetTheMap={pleaseSetTheMap}
          mapName={mapName}
        />
        <StartStopFab 
          isSimulationRunning={isSimulationRunning}
          setIsSimulationRunning={setIsSimulationRunning}
        />
      </main>

    </Layout>
  )
}