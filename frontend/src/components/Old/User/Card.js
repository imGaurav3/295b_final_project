import React, { useState } from "react";
import "./Card.css"; // You can create a separate CSS file for styling

const Card = ({ title, info }) => {
//   console.log("Card details : "+JSON.stringify(info));
  const [isFlipped, setIsFlipped] = useState(false);
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="cardContainer">
    <div className={`card ${isFlipped ? "flipped" : ""}`}>
      <div className="cardFront">
        <div className="cardContent">
          <div className="cardTitle">{title}</div>
          <div className="cardButton" onClick={flipCard}>
            Click to Flip
          </div>
        </div>
        <div className="arrowIcon">
          <i className="fas fa-arrow-right"></i>
        </div>
      </div>
      <div className="cardBack">
        <div className="cardContent">
          <div className="cardInfo">
          {/* ["classes",item.class_name,item.duration,item.capacity,formattedStartDate,formattedEndDate,daysList] */}
            <h5>{info[1]}</h5>
            {
                info[0] === 'memberships' &&
                <h5>Duration : {info[3]} months<br></br>
                Cost : ${info[2]}</h5>
            }
            {
                info[0] === 'classes' &&
                <h5>Duration : {info[2]} months<br></br>
                Class Strength : {info[3]} members<br></br>
                Start Date : {info[4]}<br></br>
                End Date : {info[5]}<br></br>
                {info[6].map((item, index) => (
                  <span key={index}>
                    {item}{index !== info[6].length - 1 ? ", " : ""}
                  </span>
                ))}
               
                </h5>

            }
            
          </div>
          <div className="cardButton" onClick={flipCard}>
            Click to Flip
          </div>
        </div>
        <div className="arrowIcon">
          <i className="fas fa-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Card;
