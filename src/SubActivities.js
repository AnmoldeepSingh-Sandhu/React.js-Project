import axios from 'axios';
import React from 'react';


const SubActivities = props => {
    
    const handleValue = event => {
        props.setValue(event.target.value);
        props.setErrors("");
    }
    
    const handleActivity = event => {
        event.preventDefault();
        props.setErrors("");
        
        const Value = {
            "Value":props.Value.trim()
        }

        axios.post("/subTypes", Value)
        .then(results => {
            props.setValue("");
            props.updateMainType();
        })
        .catch(error => {props.setErrors(error.response.data.message); console.log(error.response.data.message)});
        
        
    }
    
    
    return(<div className='subType' id="activity">
        
        <h1>Type:{props.type}</h1>

        <form onSubmit={event => handleActivity(event)}>
            
            <label>What is your {props.type} goal:
                <input type="text" name="Value" value={props.Value} onChange={event => handleValue(event)} />
            </label>
            <button name="activity">Submit {props.type} goal</button>
            <div style={{color:"red", margin:"10px", padding:"10px"}}>{props.Errors}</div>
        </form>
        
    </div>);

}
export default SubActivities;