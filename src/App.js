import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import Activities from './Activities';
import ShowActivities from './ShowActivities';
import SubActivities from './SubActivities';


const App = props => {

    const [type, setType] = useState();// Only store Major Activity names like Cleaning, Study etc.
    const [Errors, setErrors] = useState(""); // all kind of errors
    const [Value, setValue] = useState();// This stores subActivity like clean your room, go to gym etc.
    const [MainType, setMainType] = useState([]);// Fatched data from databse


    const fetchData = () => {
        axios.get("/type")
            .then(results => {
                setMainType(results.data);
                console.log("Data fetched successfully");
            })
            .catch(error => console.log(error));
    };

    const updateMainType = () => {
        fetchData();// Re-fetch data after submitting or deleting a value
    };
    

    return (<>
        
        <Activities type={type} setType={setType} Errors={Errors} setErrors={setErrors}/>
        <SubActivities type={type} Value={Value} setValue={setValue} Errors={Errors} setErrors={setErrors} updateMainType={updateMainType}/>
        <ShowActivities updateMainType={updateMainType} MainType={MainType}/>
    </>);
}

export default App;