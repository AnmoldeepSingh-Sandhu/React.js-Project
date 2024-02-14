import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

const ShowActivities = props => {
    const [showItem, setShowItem] = useState(new Array(props.MainType.length).fill(false));

    useEffect(() => {
        props.updateMainType(); // Fetch initial data when component mounts
    }, []);


    const toggle = (index) => {
        const updatedShowItem = [...showItem];
        updatedShowItem[index] = !updatedShowItem[index];
        setShowItem(updatedShowItem);
    };

    const deleteActivity = (Type, SubType) => {

        const Value = {
            "Type": Type,
            "SubType": SubType
        }

        axios.post('/deleteActivity', Value).then(results =>{
            props.updateMainType();
            
        }).catch(error => console.log(error.data));

    }

    return(<div className='details'>
                <h1>Activities</h1>
  
                <div className='grid'>
                    <div className='buttons'>
                        {props.MainType.map((one, index) => (
                            <button key={index} className='dropdown-btn' onClick={() => toggle(index)}><h2>{one.type}</h2></button>
                        ))}
                    </div>
  
                    <div className='content'>
                        {props.MainType.map((one, index) => (
                            <ul key={index} className={`dropdown-content ${showItem[index] ? 'active' : ''}`}>
                                <h1>{one.type}</h1>
                                {one.subTypes.map((two, subIndex) => (
                                    <li key={subIndex}>{two}<button className='deleteButton' onClick={event => deleteActivity(one, two)}>X</button></li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
  )
}

export default ShowActivities;