import React, { useState, useEffect } from "react";
import axios from 'axios';
import url from '../../utils/urlconfig';
import Charts from "./Chart.js"
import "bootstrap/dist/css/bootstrap.css";
import ChoiceSelector from "./ChoiceSelector";
import Navbar from "../NavBar/Navbar.js";


function GymDashboard() {

  const [classes,setClasses]=useState({});
  const [enrollments, setEnrollments]=useState({});
  const [hours, setHours]=useState({});
  const [visitors, setVisitors]=useState({});

  const generateGraphs=()=>{
    const fetchData = async () => {
      try {
        await getClasses();
        await getEnrollment();
        await getHours();
        await getVisitors();
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  };
   
  function getClassData(data){
    // setClassesData(data);
    console.log("In parent compo - class, received following object  :"+JSON.stringify(data));
      axios({
        url: `${url}/admin/dashboard/getClasses`,
        method: "post",
        data: data
      })
        .then(async (response) => {
          if (response.status == 200) {
            await setClasses(response.data);
            console.log("I set classes data whoahuuu, : "+JSON.stringify(classes));
          } else {
            alert("No classes available!");
          }
        })
        .catch((err) => {
          console.log("Hey there is an error"+ err);
        });
  }
  function getEnrollmentData(data){
    axios({
      url: `${url}/admin/dashboard/getenrollment`,
      method: "post",
      data: data
    })
      .then(async (response) => {
        if (response.status == 200) {
          await setEnrollments(response.data);
        } else {
          alert("No enrollments available!");
        }
      })
      .catch((err) => {
        console.log("Hey there is an error"+ err);
      });
    console.log("In parent compo - enrollment, received following object  :"+JSON.stringify(data));
  }
  function getHoursData(data){
    axios({
      url: `${url}/admin/dashboard/gethours`,
      method: "post",
      data: data
    })
      .then(async (response) => {
        if (response.status == 200) {
          await setHours(response.data);
        } else {
          alert("No hours available!");
        }
      })
      .catch((err) => {
        console.log("Hey there is an error"+ err);
      });
    console.log("In parent compo - hours, received following object  :"+JSON.stringify(data));
  }
  function getVisitorsData(data){
    axios({
      url: `${url}/admin/dashboard/getvisitors`,
      method: "post",
      data: data
    })
      .then(async (response) => {
        if (response.status == 200) {
          await setVisitors(response.data);
        } else {
          alert("No classes available!");
        }
      })
      .catch((err) => {
        console.log("Hey there is an error"+ err);
      });
    console.log("In parent compo - visitors, received following object  :"+JSON.stringify(data));
  }
 
  return (
    <div>
      <div>
        <Navbar />
        <a href = "/admin/console" style={{ color: "white", position: "fixed", top: "1.5rem", right: "5rem", fontWeight:"bold" }}>back</a>
      </div>
      
      <div style={{padding:"50px 200px",alignItems:'center', backgroundColor:"#d7edee"}}>
        <ChoiceSelector getDataFunc={getClassData} />
        <Charts data={classes} label={'No.of users in each Class'} type={'bar'} 
        legend={'X-axis : Classes offered , Y-axis : No.of members in each class'} backgroundColor={'rgba(54, 162, 235, 0.5)'} 
        borderColor={'rgba(54, 162, 235, 1)'} getDataFunc={getClassData}/>
        <br></br>
        <br></br>
        <ChoiceSelector getDataFunc={getEnrollmentData}/>
        <Charts data={enrollments} label={'No.of users in each Membership'} type={'bar'} 
        legend={'X-axis : Memeberships available , Y-axis : No.of members with a membership'}backgroundColor={'rgba(	235, 127, 54, 0.5)'}
        borderColor={'rgba(	235, 127, 54, 1)'} getDataFunc={getEnrollmentData}/>
        <br></br>
        <br></br>
        <ChoiceSelector getDataFunc={getHoursData}/>
        <Charts data={hours} label={'Total number of hours of each user'} type={'bar'} 
        legend={'X-axis : MemberId , Y-axis : No.of hours each member spent in gym'}backgroundColor={'rgba(127, 54, 235, 0.5)'} 
        borderColor={'rgba(127, 54, 235, 1)'} getDataFunc={getHoursData}/>
        <br></br>
        <br></br>
        <ChoiceSelector getDataFunc={getVisitorsData}/>
      <Charts data={visitors} label={'Total number of visitors'} type={'line'} 
        legend={'X-axis : Time , Y-axis : No.of visitors in each hour'}backgroundColor={'rgba(235, 54, 72, 0.5)'} 
        borderColor={'rgba(235, 54, 72, 1)'} getDataFunc={getVisitorsData} />
        <br></br>
      </div>
    </div>
  );
}
export default GymDashboard;
