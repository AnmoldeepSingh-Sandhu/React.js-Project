import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

const ShowActivities = props => {

    const [MainType , setMainType] = useState([]);

    useEffect(() => {

        axios.get("/type")
        .then(results => {
            setMainType(results.data)
        })
        .catch(error => console.log(error))

    })
    
    useEffect(() => {
        
        axios.get("/type")
        .then(results => {
            setMainType(results.data)
        })
        .catch(error => console.log(error))
        
    },[props.Value])
    

    return(<div className='details'>
        <h1>Activities</h1>
        <ul>
            {MainType.map((one, index) => <div key={index}><h2>{one.type}</h2>{one.subTypes.map((two,index) => <li key={index}>{two}</li>)}</div>)}
        </ul>
    
    </div>)
}

export default ShowActivities;