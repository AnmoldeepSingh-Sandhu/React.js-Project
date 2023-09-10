import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

const ShowActivities = props => {

    const [MainType , setMainType] = useState([]);
    const [showItem, setShowItem] = useState(new Array(MainType.length).fill(false));
    const [count, setCount] = useState(0);
    const [loadCount, setLoadCount] = useState(0);

   
    useEffect(() => {
        
        axios.get("/type")
        .then(results => {
            setMainType(results.data)
            console.log("Value");
        })
        .catch(error => console.log(error))
        
    },[props.Value])

    useEffect(() => {
        
        axios.get("/subTypes")
        .then(results => {
            setMainType(results.data)
            props.setValue(" ");
            setLoadCount(loadCount + 1);
            console.log("load");
        })
        .catch(error => console.log(error))
        
    },[props.load])


    useEffect(() => {
        
        axios.get("/deleteActivity")
        .then(results => {
            setMainType(results.data)
            setLoadCount(loadCount + 1);
            props.setLoad("Calling" + loadCount);
            console.log("count");
        })
        .catch(error => console.log(error))
        
    },[count])

    useEffect(() => {
        
        axios.get("/deleteActivity")
        .then(results => {
            setMainType(results.data)
            console.log("loadCount");
        })
        .catch(error => console.log(error))
        
    },[loadCount])


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
            setCount(1 + count)
        }).catch(error => console.log(error.data));

        setCount(1 + count)
        setLoadCount(loadCount + 1);
    }

    return(<div className='details'>
                <h1>Activities</h1>
  
                <div className='grid'>
                    <div className='buttons'>
                        {MainType.map((one, index) => (
                            <button key={index} className='dropdown-btn' onClick={() => toggle(index)}><h2>{one.type}</h2></button>
                        ))}
                    </div>
  
                    <div className='content'>
                        {MainType.map((one, index) => (
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