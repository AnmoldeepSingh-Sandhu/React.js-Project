import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';


const Activities = props => {
    
    const handleType = value => {

        props.setType(value);
    }

    
    const handleSubmit = event => {
            
            props.setErrors("");
            event.preventDefault();
    }

    useEffect(()=>{
    
        props.setErrors("");

        const type ={
            "type":props.type
        }
        axios.post("/type", type).then(results => {

        }).catch(error => {props.setErrors(error.response.data.message); console.log(error.response.data.message)});

    },[props.type]);

  
    return (<div className='types'>
        <h1>Types of Activities</h1>
        
        <form onSubmit={event => handleSubmit(event)}>
      
            <div className='type-grid'>
                
                <label className='labels'>
                    <a href="#activity" onClick={(event)=> handleType("Cleaning")}>
                        <span>Cleaning</span>
                        <img src="Cleaning.jpg" alt='Cleaning Image' className='image'></img>
                    </a>
                </label>
                

                <label className='labels'>
                    <a href="#activity" onClick={(event)=> handleType("Study")}>
                        <span>Study</span>
                        <img src="Study.jpg" alt='Study Image' className='image'/>
                    </a>
                </label>

                <label className='labels'>
                    <a href="#activity" onClick={(event)=> handleType("Exercise")}>
                        <span>Exercise</span>
                        <img src="Exercise.jpg" alt='Exercise Image' className='image'/>
                    </a>
                </label>

                <label className='labels'>
                    <a href="#activity" onClick={(event)=> handleType("Work")}>
                        <span>Work/Job</span>
                        <img src="Work.jpg" alt='Work/Job Image' className='image'/>
                    </a>
                </label>

                <label className='labels'>
                    <a href="#activity" onClick={(event)=> handleType("Trip")}>
                        <span>Trip</span>
                        <img src="Trip.jpg" alt='Trip Image' className='image'/>
                    </a>
                </label>

                <label className='labels'>
                    <a href="#activity" onClick={(event)=> handleType("Other")}>
                        <span>Other</span>
                        <img src="Other.jpg" alt='Other Activity Image' className='image'/>
                    </a>
                </label>
            </div>
            
        </form>
           
    </div>);
}

export default Activities;