import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';


const SubActivities = props => {

    
    
    const handleValue = event => {

        props.setValue(event.target.value);
    }
    
    const handleActivity = event => {

        
        event.preventDefault();
        
        const Value = {
            "Value":props.Value.trim()
        }

        axios.post("/subTypes", Value)
        .then(results => {
            console.log(results);
        })
        .catch(error => console.log(error));
        
        props.setValue("");
    }
    
    
    return(<div className='subType'>
        
        <h1>Type:{props.type}</h1>

        <form onSubmit={event => handleActivity(event)}>
            
            <label>What is your {props.type} goal:
                <input type="text" name="Value" value={props.Value} onChange={event => handleValue(event)}/>
            </label>
            <button name="activity">Submit {props.type} goal</button>
            
        </form>
        
    </div>);

}
export default SubActivities;