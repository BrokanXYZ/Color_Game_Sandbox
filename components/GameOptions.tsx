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
    colorSpreadStrategy,
    setColorSpreadStrategy,
    colorSpreadMagnitude,
    setColorSpreadMagnitude,
    tickRate,
    setTickRate
  }
  : 
  {
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
        <Typography>
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
            value={colorSpreadStrategy}
            onChange={(event)=>{setColorSpreadStrategy(String(event.target.value))}}
            displayEmpty
            style={{marginTop: '30px'}}
          >
            <MenuItem value="basic">
              <em>Basic</em>
            </MenuItem>
          </Select>
        </FormControl>
      </ListItem>
    </List>
  );
}