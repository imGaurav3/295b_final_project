import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Table, Button, Form, Card, Alert } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import Navbar from "../Common/Navbar";
import url from "../../utils/urlconfig";
import "../../App.css";
import jwtDecode from "jwt-decode";

const MyActivities = () => {

    const [selectedDate, setStartDate] = useState(new Date());
    const [selectedDate1, setEndDate] = useState(new Date());
    const [activities, setActivity] = useState([]);
    const [selectedOrigin, setSelectedOrigin] = useState("");

    function getDate() {
        return selectedDate.getFullYear() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate();
    }
    function getDate1() {
        return selectedDate1.getFullYear() + "-" + (selectedDate1.getMonth() + 1) + "-" + selectedDate1.getDate();
    }

    // useEffect(() => {
    //     getActivities();
    // }, []);
    
    const getActivities = () => {
        const data = {
            userId: jwtDecode(localStorage.getItem("currentUser")).user_id,
            fromDate: getDate(),
            toDate: getDate1()
        };
        //let url1 = "/userdashboard/myactivities";
        //url1 += localStorage.getItem("currentUser").user_id;
        //url1 += getDate();
        //url1 += getDate1();
        //console.log(getDate());
        axios({
          url: `${url}/userdashboard/myactivities`,
          method: "post",
          data,
        })
          .then(async (response) => {
            if (response.status == 200) {
              await setActivity(response.data.enclass);
            } else {
              <Alert variant="danger">Could not fetch all available flights!</Alert>;
            }
          })
          .catch((err) => {
            console.log(err);
          });
    };

    //console.log(flights);


  return (
    <div
      style={{
        backgroundColor: "#ffe4e1",
      }}
    >
      <div>
        <Navbar />
      </div>
      <div
        style={{
          border: "solid",
          backgroundColor: "#f0f0f0",
          height: "100px",
          marginTop: "2%",
          width: "820px",
          marginLeft: "22%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <br></br>


        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker style={{ marginLeft: '1rem' }}
            autoOk
            variant="inline"
            inputVariant="outlined"
            label="Start Date"
            format="yyyy-MM-dd"
            value={selectedDate}
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
            value={selectedDate1}
            InputAdornmentProps={{ position: "start" }}
            onChange={date => setEndDate(date)}
        />
        </MuiPickersUtilsProvider>

        <Button variant="secondary" style={{ marginLeft: '1rem' }} onClick={getActivities}>
            Search
        </Button>
    </div>
    <div
        style={{
          display: "flex",
          justifyContent: "center",
        //   alignItems: "center",
        height: "100vh",
        }}
      >
        <MDBContainer>
          <br></br>
          <MDBRow>
            <MDBCol col="6">
              <form>
                <div className="Home-form-content">
                  <br />
                  {activities.map((activity) => (
                    <Card
                      style={{
                        border: "solid",
                        borderColor: "black",
                        margin: "2%",
                        width: "59em",
                        background: "#3b9dc4",
                      }}
                    >
                      <Card.Body>
                        {/* <Card.Title>{activity.user_id}</Card.Title> */}
                        <div className="row">
                          <div
                            className="column"
                          >
                        <Card.Text>
                          <b>Activity Name:</b> &nbsp;{activity.activity_name}
                          <br />
                          <b>Time Spent on the Activity:</b> &nbsp;{activity.logged_mins} mins
                          <br />
                          <b>Activity Date:</b> &nbsp;{`${activity.logged_date.toString().split("T")[0] + "   " + activity.logged_date.toString().split("T")[1].split("Z")[0]}`}
                          <br />
                          <b>Location:</b> &nbsp; {activity.location}
                        </Card.Text>
                        </div>
                      </div>
                      <br></br>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
}

export default MyActivities;
