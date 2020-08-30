import React, { Dispatch, SetStateAction } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import Color from '../models/Color';
import ColorToolCellProperties from '../models/ColorToolCellProperties';


const useStyles = makeStyles((theme) => ({
  colorPreview: (previewColor: Color) => ({
    width: '100%',
    height: '75px',
    backgroundColor: 'rgb(' + previewColor.r + ',' + previewColor.g + ',' + previewColor.b + ')',
    border: 'solid 1px rgb(195,195,195)'
  }),
}));

export default function PreviewColor(
  {
    pointerActionType,
    setPointerActionType,
    previewColor,
    setPreviewColor,
    colorToolCellProperties,
    setColorToolCellProperties
  }
  :
  {
    pointerActionType: string,
    setPointerActionType: Dispatch<SetStateAction<string>>,
    previewColor: Color,
    setPreviewColor: Dispatch<SetStateAction<Color>>,
    colorToolCellProperties: ColorToolCellProperties,
    setColorToolCellProperties: Dispatch<SetStateAction<ColorToolCellProperties>>
  }
) 
{
    
  const classes = useStyles(previewColor);

  const handleGetSetChange = (event: any, newType: string) => {
    if(newType != null){
      setPointerActionType(newType);
    }
  };

  return (
    <List>
      <ListItem>
        <Typography variant="h6">
          Color Tool
        </Typography>
      </ListItem>
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
      <ListItem>
        <FormControl component="fieldset">
          <FormLabel component="legend">Cell Properties</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox 
                  color="primary" 
                  name="staticColor" 
                  value={colorToolCellProperties.staticColor} 
                  onChange={(event)=>{
                    const isStaticColor: boolean = event.target.checked;
                    let newProperties: ColorToolCellProperties = colorToolCellProperties.clone();
                    newProperties.staticColor = isStaticColor;
                    setColorToolCellProperties(newProperties);
                  }}
                />
              }
              label="Static Color"
            />
          </FormGroup>
        </FormControl>
      </ListItem>
    </List>
  );
}