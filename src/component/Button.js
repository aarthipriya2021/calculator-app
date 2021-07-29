import React from "react";
import PropTypes from "prop-types";
import "./Button.css";



export const Button = (props) => {
    
    const className = [ 
        "component-button",
        props.orange ? "orange" : "",
        props.wide ? "wide" : "",
    ]
    Button.propTypes = {
        name: PropTypes.string,
        orange: PropTypes.bool,
        wide: PropTypes.bool,
        clickHandler: PropTypes.func,
    };

    const handleClick = (e) =>{
        e.preventDefault(props.name)
        
        
        console.log(props.name);
        props.clickHandler(props.name)
    }
    
    // console.log(typeof(clickHandler));

    return (
        <div className={className.join(" ").trim()}>
            <button onClick={handleClick}>{props.name}</button>
           
        </div>
    
    )

}

export default Button; 
