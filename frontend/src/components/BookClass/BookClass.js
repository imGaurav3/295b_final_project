import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Table, Button, Form, Card, Alert } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import Navbar from "../Common/Navbar";
import url from "../../utils/urlconfig";
import "../../App.css";
import flightImg from "../../../src/yoga.png";
import jwtDecode from "jwt-decode";

const BookClass = () => {
    const [enrollDate, setClassDate] = useState(new Date());
    const [classes, setClasses] = useState([]);
    const history = useHistory();
    

    useEffect(() => {
        getClasses();
    }, []);
    
    const getClasses = () => {
        let url1 = "/userdashboard/classes";
        //console.log(getDate());
        axios({
          url: `${url}` + url1,
          method: "get",
        })
          .then(async (response) => {
            if (response.status == 200) {
              await setClasses(response.data.classes);
            } else {
              <Alert variant="danger">Could not fetch all available classes!</Alert>;
            }
          })
          .catch((err) => {
            console.log(err);
          });
    };

    //classId, userId, enrollDate
    const handleBookClass = (classId) => {
      const data = {
        classId,
        userId: jwtDecode(localStorage.getItem("currentUser")).user_id,
        enrollDate
      };
      axios({
        url: `${url}/userdashboard/enroll/class`,
        method: "post",
        data,
      })
        .then((response) => {
          if (response.status == 200) {
            alert("Class Booked Successfully!");
            history.push(`/userdashboard`);
          } else {
            alert("Could not book class!");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //console.log(flights);

    function getDate(selectedDate) {
        return selectedDate.getFullYear() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate();
    }


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

        <h2>Select from Available Classes:</h2>
        {/* <Button variant="secondary" style={{ marginLeft: '1rem' }} onClick={getClasses}>
            <Link style={{ color: "white" }} >
            Search
            </Link>
        </Button> */}
    </div>
    <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MDBContainer>
          <br></br>
          <MDBRow>
            <MDBCol col="6">
              <form>
                <div className="Home-form-content">
                  <br />
                  {classes.map((cls) => (
                    <Card
                      style={{
                        border: "solid",
                        borderColor: "black",
                        margin: "2%",
                        width: "59em",
                        background: "#3b9dc4",
                        height: '24em',
                      }}
                    >
                      <Card.Body>
                        <Card.Title>{cls.class_name}</Card.Title>
                        <div className="row">
                          <div
                            className="column"
                            style={{
                              marginLeft: "2%",
                              width: "75%",
                              marginTop: "2%",
                              // border: "solid",
                            }}
                          >
                            <Card.Text>
                            <b>Class Name:</b> &nbsp;{cls.class_name}
                            <br />
                            <b>Duration:</b> &nbsp;{cls.duration} mins
                            <br />
                            <b>Gym Location:</b> &nbsp;{cls.location}
                            <br />
                            <b>Start Date:</b> &nbsp;{getDate(new Date(cls.start_date))}
                            <br />
                            <b>End Date:</b> &nbsp;{getDate(new Date(cls.end_date))}
                            <br />
                            </Card.Text>
                          </div>
                          <div className="column" style={{}}>
                            <img
                              src={flightImg}
                              alt="class"
                              width="120"
                              height="120"
                              key={cls.class_id}
                            />
                          </div>
                        </div>
                          <br></br>
                          <div >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker style={{ marginLeft: '1rem' }}
                                    autoOk
                                    variant="inline"
                                    inputVariant="outlined"
                                    label="Select Date"
                                    format="yyyy-MM-dd"
                                    value={enrollDate}
                                    // InputAdornmentProps={{ position: "start" }}
                                    onChange={date => setClassDate(date)}
                                />
                            </MuiPickersUtilsProvider> 
                          </div>
                        
                      <br></br>
                        <Button variant="secondary" onClick={() => handleBookClass(cls.class_id)}>
                            Book
                        </Button>
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

export default BookClass;
