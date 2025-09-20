import React from 'react';
import './cards.css';

function Cards (props) {
  return (
    <div className="card-container">
      <div className="card-wrapper">
        <div className="card-image">
          <img src={props.icon}/>
        </div>

        <div className="card-text text-color">
          <div className="card-heading">
            {/* <h3>Add Employee</h3> */}
            <h3>{props.title}</h3>
          </div>
          <div className="card-description">
            {/* <p>
              The Admin Add Employee feature allows administrators to
              quickly register new hospital staff by entering their details,
              assigning roles, and organizing them into departments,
              ensuring smooth operations and secure system access.
            </p> */}
            <p>{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
