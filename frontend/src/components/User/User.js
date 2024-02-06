import React, { useState, useRef, useEffect } from "react";
import "./User.css";
import axios from 'axios';
import url from '../../utils/urlconfig';
import jwtDecode from "jwt-decode";
import CardComponent from "../User/Card"
import backgroundImage from './gymbackground.jpeg';

function Users() {
  const [selectedValue, setSelectedValue] = useState("");
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
  const [locations, setLocations] = useState([]);
  const [classes, setClasses] = useState([]);
  const [memberships, setMemberships] = useState([]);

  const options = locations.map((item) => (
    <option key={item.gym_location} value={item.gym_location}>
      {item.gym_location}
    </option>
  ));  

  const handleDropdownChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    setIsScrollEnabled(true);
    if (value !== "") {
      console.log("changed dropdown vallue "+ value);
      setShowDiv(true);
      document.body.classList.add("scroll-enabled");
    // Call to backend to fetch membership and class details according to the location selected
    axios({
      url: `${url}` + "/users/"+value,
      method: "get",
    })
      .then(async (response) => {
        if (response.status == 200) {
         await setClasses(response.data.classes);
         await setMemberships(response.data.memberships);
         console.log("These are the set of classes from db "+response.data.classes[0]);
         console.log("These are the memberships from db "+response.data.memberships);
        } else {
          <Alert variant="danger">Could not fetch all available flights!</Alert>;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    } else {
      setShowDiv(false);
      document.body.classList.remove("scroll-enabled");
    }
  };

      const handleTouchMove = (event) => {
        if (!isScrollEnabled) {
          event.preventDefault();
    }
  };
  useEffect(() => {
    const scrollToTop = document.querySelector(".stt");
    const memDisplay = document.querySelector(".memContainer");
    const classesDisplay = document.querySelector(".classesContainer");
    const headingOne = document.querySelector(".headingOne");
    const headingTwo = document.querySelector(".headingTwo");
    document.addEventListener("scroll", (e)=> {
      if(window.pageYOffset >= 800) {
        scrollToTop.style.display = "flex";
        memDisplay.style.display = "flex";
        classesDisplay.style.display = "flex";
        headingOne.style.display = "flex";
        headingTwo.style.display = "flex";
      } else {
        scrollToTop.style.display = "none";
        memDisplay.style.display = "none";
        classesDisplay.style.display = "none";
        headingOne.style.display = "none";
        headingTwo.style.display = "none";
      }
    });
  }, []);  


  //cards display
  const animatingElements = Array.from(document.getElementsByClassName("item"));

document.addEventListener("scroll", (e) => {
  animatingElements.forEach((el) => {
      el.classList.add("animated");   
  });
});


useEffect(() => {
  const fetchData = async () => {
    try {
      await getLocations();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();
}, []);


const getLocations = async () => {
  axios({
    url: `${url}/users/getlocations`,
    method: "get",
  })
    .then(async (response) => {
      if (response.status == 200) {
        await setLocations(response.data);
        console.log("THis is the locations list"+ locations);
      } else {
        alert("No locations available!");
      }
    })
    .catch((err) => {
      console.log("Hey there is an error"+ err);
    });
};

  return (
    <div>
     
      <div style={{ height: "300vh", width: "100vw", background: `url(${backgroundImage}) no-repeat center center fixed`,backgroundSize: "cover"}}></div>
        <div onTouchMove={handleTouchMove} className="overlay">
        <a href = "/login" style={{ color: "white", position: "fixed", top: "2rem", right: "5rem", fontWeight:"bold" }}>Sign-In/Sign-Up</a>
         <h1>Welcome to APYY Fitness</h1>
        </div>
         {/* <img src="/Users/yashasvirao/Desktop/TeamProject/team-project-team_apyy/healthclub_project/frontend/src/components/User/gymbackground.jpeg'" alt="Gym Background"style={{ height: "100vh", width: "100vw",backgroundSize: "cover"}} /> */}
         <div className="location">
            <select className="stt" value={selectedValue} onChange={handleDropdownChange}>
              <option value="">Select a location</option>
              {options}
            </select>
         </div>
         <div className="pointer">
         <h3>Scroll Down</h3>
        </div>

        <h1 className="headingOne">Memberships</h1>
        <div className="memContainer">
          {
            memberships.map((item, index) => (
             <CardComponent title={item.name} info={["memberships",item.name, item.cost, item.duration]}/>
            ))
          }
        </div>  
         <h1 className="headingTwo">Classes Schedules</h1>
        <div className="classesContainer">
          {
            classes.map((item, index) => {
              const daysList=[];
              if(item.day_mon==1)
              daysList.push("MON");
              if(item.day_tue==1)
              daysList.push("TUE");
              if(item.day_wed==1)
              daysList.push("WED");
              if(item.day_thur==1)
              daysList.push("THUR");
              if(item.day_fri==1)
              daysList.push("FRI");
              if(item.day_sat==1)
              daysList.push("SAT");
              
              const start_date=new Date(item.start_date);
              const formattedStartDate = `${start_date.getFullYear()}-${(start_date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${start_date.getDate().toString().padStart(2, "0")}`;
              const end_date=new Date(item.end_date);
              const formattedEndDate = `${end_date.getFullYear()}-${(end_date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${end_date.getDate().toString().padStart(2, "0")}`;
              console.log("start date: " +formattedStartDate+" endDate: "+formattedEndDate+" days offered : "+ daysList);  
             return(
             <CardComponent title={item.class_name} info={["classes",item.class_name,item.duration,item.capacity,formattedStartDate,formattedEndDate,daysList]}/>
             );
             })
          }
        </div>
  </div>

  );  
}

export default Users;
