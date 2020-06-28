import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

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
  colorPreview: (previewColor: Color) => ({
    width: '100%',
    height: '75px',
    backgroundColor: 'rgb(' + previewColor.r + ',' + previewColor.g + ',' + previewColor.b + ')',
    border: 'solid 1px rgb(195,195,195)'
  }),
}));

export default function PreviewColor() {
    
  const [previewColor, setPreviewColor] = useState<Color>(new Color(255,255,255));
  const [pointerActionType, setPointerActionType] = useState<string>("get");
  const classes = useStyles(previewColor);

  const handleGetSetChange = (event: any, newType: string) => {
    setPointerActionType(newType);
  };

  return (
    <List>
      <ListItem>
        <div className={classes.colorPreview}/>
      </ListItem>
      <ListItem>
        <TextField
          label="R"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={previewColor.r}
          onChange={(event)=>{setPreviewColor(new Color(parseInt(event.target.value), previewColor.g, previewColor.b))}}
        />
      </ListItem>
      <ListItem>
        <TextField
          label="G"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={previewColor.g}
          onChange={(event)=>{setPreviewColor(new Color(previewColor.r, parseInt(event.target.value), previewColor.b))}}
        />
      </ListItem>
      <ListItem>
        <TextField
          label="B"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={previewColor.b}
          onChange={(event)=>{setPreviewColor(new Color(previewColor.r, previewColor.g, parseInt(event.target.value)))}}
        />
      </ListItem>
      <ListItem>
        <ToggleButtonGroup
        value={pointerActionType}
        exclusive
        onChange={handleGetSetChange}
        aria-label="text alignment"
        >
          <ToggleButton value="get" aria-label="left aligned">
            Get
          </ToggleButton>
          <ToggleButton value="set" aria-label="centered">
            Set
          </ToggleButton>
        </ToggleButtonGroup>
      </ListItem>
    </List>
  );
}