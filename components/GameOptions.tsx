import React, {useState} from 'react';

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

export default function PreviewColor() {
    
  const classes = useStyles();

  const [tickRate, setTickRate] = useState<number>(1000);
  const [colorSpreadMagnitude, setColorSpreadMagnitude] = useState<number>(1);
  const [colorSpreadWeightStrategy, setColorSpreadWeightStrategy] = useState<string>("");

  return (
    <List>
      <ListItem>
        <Typography>
          Game Options
        </Typography>
      </ListItem>
      <ListItem>
        <TextField
          label="Tick Rate"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={tickRate}
          onChange={(event)=>{setTickRate(parseInt(event.target.value))}}
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
          onChange={(event)=>{setColorSpreadMagnitude(parseInt(event.target.value))}}
        />
      </ListItem>
      <ListItem>
        <FormControl className={classes.formControl}>
          <InputLabel shrink >
            Color Spread Weight Strategy
          </InputLabel>
          <Select
            value={colorSpreadWeightStrategy}
            onChange={(event)=>{setColorSpreadWeightStrategy(String(event.target.value))}}
            displayEmpty
            style={{marginTop: '30px'}}
          >
            <MenuItem value="">
              <em>Basic</em>
            </MenuItem>
          </Select>
        </FormControl>
      </ListItem>
    </List>
  );
}