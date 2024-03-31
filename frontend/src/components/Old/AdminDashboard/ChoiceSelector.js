import React,{ useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { Table, Button, Form, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { alpha } from '@material-ui/core/styles'
import "bootstrap/dist/css/bootstrap.css";

function ChoiceSelector(props) {

  const [location, setLocation] = useState([
    "San Jose",
    "Santa Clara",
    "Fremont"
]);
  const [selectedLocation, setSelectedLocation] = useState(" ");
  const [startDate, setStartDate] = useState(" ");
  const [endDate, setEndDate] = useState(" ");

  function handleLocation(event) {
    setSelectedLocation(event.target.value);
  }
  const formDataObject = () => {
    const data = {
      location: selectedLocation,
      startDate: startDate,
      endDate: endDate,
    };
    props.getDataFunc(data);
    console.log("in child component selector : "+JSON.stringify(data));
  };
  useEffect(() => {
    if (selectedLocation !== " " && startDate !== " " && endDate !== " ") {
        formDataObject();
    }
  }, [selectedLocation, startDate, endDate]);


  return (
    <div style={{ display: 'flex', flexDirection: 'row',justifyContent:'center', gap: '20px',"height" : "100%", "width" : "95%"}}>
    <FormControl>
    <InputLabel htmlFor="origin-id">Location</InputLabel>
      <Select style={{ marginLeft: '2rem',
        margin: '10px',
        }}
        value={selectedLocation}
        onChange={handleLocation}
        inputProps={{
          name: "Location",
          id: "location-id"
        }}
      >
        {location.map((value, index) => {
          return <MenuItem value={value}>{value}</MenuItem>;
        })}
      </Select>
  </FormControl>
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
  <KeyboardDatePicker style={{ marginLeft: '1rem' }}
      autoOk
      variant="inline"
      inputVariant="outlined"
      label="Start Date"
      format="yyyy-MM-dd"
      value={startDate}
      InputAdornmentProps={{ position: "start" }}
      onChange={date => setStartDate(date)}
  />
  </MuiPickersUtilsProvider>
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
  <KeyboardDatePicker style={{ marginLeft: '1rem' }}
      autoOk
      variant="inline"
      inputVariant="outlined"
      label="End Date"
      format="yyyy-MM-dd"
      value={endDate}
      InputAdornmentProps={{ position: "start" }}
      onChange={date => setEndDate(date)}
  />
  </MuiPickersUtilsProvider>
  
  </div>
  );
}

export default ChoiceSelector;
