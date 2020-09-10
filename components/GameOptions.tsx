import React, {useState, Dispatch, SetStateAction, ChangeEvent} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
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

export default function PreviewColor(
  {
    colorSpreadWeightStrategy,
    setColorSpreadWeightStrategy,
    colorSpreadMagnitude,
    setColorSpreadMagnitude,
    tickRate,
    setTickRate
  }
  : 
  {
    colorSpreadWeightStrategy: string,
    setColorSpreadWeightStrategy: Dispatch<SetStateAction<string>>,
    colorSpreadMagnitude: number,
    setColorSpreadMagnitude: Dispatch<SetStateAction<number>>,
    tickRate: number,
    setTickRate: Dispatch<SetStateAction<number>>
  }
) 
{   
  const classes = useStyles();

  const handleTickRateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const tickRate: number = parseInt(event.target.value, 10);
    if(tickRate>=0)
    {
      setTickRate(tickRate);
    }
    else
    {
      setTickRate(0);
    }
  };

  const handleColorSpreadMagnitudeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const colorSpreadMagnitude: number = parseInt(event.target.value, 10);
    if(colorSpreadMagnitude>=0)
    {
      setColorSpreadMagnitude(colorSpreadMagnitude);
    }
    else
    {
      setColorSpreadMagnitude(0);
    }
  };

  return (
    <List>
      <ListItem>
        <Typography variant="h6">
          Game Options
        </Typography>
      </ListItem>
      <ListItem>
        <TextField
          disabled
          label="Tick Rate"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={tickRate}
          onChange={handleTickRateChange}
        />
      </ListItem>
      <ListItem>
        <TextField
          label="Color Spread Magnitude"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={colorSpreadMagnitude}
          onChange={handleColorSpreadMagnitudeChange}
        />
      </ListItem>
      <ListItem>
        <FormControl className={classes.formControl}>
          <InputLabel shrink >
            Color Spread Strategy
          </InputLabel>
          <Select
            value={colorSpreadWeightStrategy}
            onChange={(event)=>{setColorSpreadWeightStrategy(String(event.target.value))}}
            displayEmpty
            style={{marginTop: '30px'}}
          >
            <MenuItem value="allEqual">
              <em>All Equal</em>
            </MenuItem>
            <MenuItem value="asSumOfRgbValuesIncreasesWeightIncreases">
              <em>As sum of RGB values increases, weight increases</em>
            </MenuItem>
            <MenuItem value="asSumOfRgbValuesIncreasesWeightDecreases">
              <em>As sum of RGB values increases, weight decreases</em>
            </MenuItem>
          </Select>
        </FormControl>
      </ListItem>
    </List>
  );
}