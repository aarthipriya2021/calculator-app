import React from "react";
import PropTypes from "prop-types";

import "./Display.css";

export const  Display = (props) => {
  Display.propTypes = {
      value: PropTypes.string,
  }
  console.log('Display - ',props);
  return (
      <div className="component-display">
          <div>{props.value}</div> 
      </div>
       
  )
  
}

export default Display;
