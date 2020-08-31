import React, {useState, Dispatch, SetStateAction} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));

export default function MapOptions(
  {
    pleaseSetTheMap,
    setPleaseSetTheMap,
    mapName,
    setMapName
  }
  : 
  {
    pleaseSetTheMap: boolean,
    setPleaseSetTheMap: Dispatch<SetStateAction<boolean>>,
    mapName: string,
    setMapName: Dispatch<SetStateAction<string>>
  }
) 
{   

  const classes = useStyles();

  return (
    <List>
      <ListItem>
        <Typography variant="h6">
          Map Options
        </Typography>
      </ListItem>
      <ListItem>
        <FormControl className={classes.formControl}>
          <InputLabel shrink >
            Map Name
          </InputLabel>
          <Select
            value={mapName}
            onChange={(event: any)=>{
              const mapName: string = event.target.value;
              setMapName(mapName)
            }}
            displayEmpty
            style={{marginTop: '30px'}}
          >
            <MenuItem value="white">
              <em>All White</em>
            </MenuItem>
            <MenuItem value="fourCorners">
              <em>Four Corners</em>
            </MenuItem>
            <MenuItem value="fourCornersWithNoWhite">
              <em>Four Corners - no white</em>
            </MenuItem>
            <MenuItem value="redAndBlue">
              <em>Red and Blue</em>
            </MenuItem>
          </Select>
        </FormControl>
      </ListItem>
      <ListItem>
        <Button 
          variant="contained" 
          onClick={()=>setPleaseSetTheMap(!pleaseSetTheMap)}
        >
          Set Map
        </Button>
      </ListItem>
    </List>
  );
}