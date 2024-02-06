import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import url from '../../utils/urlconfig';
import jwtDecode from "jwt-decode";


const DisplayTableComponent = () => {

  const [member, setMemDetails] = useState([]);
  const [sclasses, setEnrollClasses] = useState([]);

  useEffect(() => {
    getMemDetails();
  }, []);
  useEffect(() => {
    getEnrollClasses();
  }, []);

  const getMemDetails = () => {
    axios({
      url: `${url}/userdashboard/mymem/${jwtDecode(localStorage.getItem("currentUser")).user_id}`,
      method: "get",
    })
      .then(async (response) => {
        if (response.status == 200) {
            setMemDetails(response.data.mem);    
        } else {
          alert("No Membership Detail found!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getEnrollClasses = () => {
    axios({
      url: `${url}/userdashboard/myclasses/${jwtDecode(localStorage.getItem("currentUser")).user_id}`,
      method: "get",
    })
      .then(async (response) => {
        if (response.status == 200) {
            setEnrollClasses(response.data.enclass);    
        } else {
          alert("No Membership Detail found!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  function active() {
    return (member.is_member == 1 ? 'Yes' : 'No');
  }

  function getDate(selectedDate) {
    return selectedDate.getFullYear() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate();
  }

    return (
      <div className="container">

        <div className="row">
          <h2>Your Scheduled Classes: &nbsp;&nbsp;</h2>
          
          <div class="tableFixHead" >
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Class Name</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Scheduled Date</th>
                  <th scope="col">Gym Location</th>
                </tr>
              </thead>
              <tbody>
              {sclasses.map((sclass) => (
                  <tr>
                    <td>{sclass.class_name}</td>
                    <td>{sclass.duration} mins</td>
                    <td>{getDate(new Date(sclass.enroll_date))}</td>
                    <td>{sclass.location}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="row">
          <h2>Your membership details:&nbsp;&nbsp;&nbsp;</h2>
          {/* <div class="tableFixHead" > */}
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Membership</th>
                  <th scope="col">Start Date&nbsp;&nbsp;&nbsp;</th>
                  <th scope="col">End Date&nbsp;&nbsp;&nbsp;</th>
                  <th scope="col">Active&nbsp;&nbsp;&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>{member.mem_name}</td>
                    <td>{getDate(new Date(member.start_date))}</td>
                    <td>{getDate(new Date(member.end_date))}</td>
                    <td>{active()}</td>
                  </tr>
              </tbody>
            </table>
          {/* </div> */}
        </div>
      </div>
    );
}

export default DisplayTableComponent;