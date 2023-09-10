import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import Activities from './Activities';
import ShowActivities from './ShowActivities';
import SubActivities from './SubActivities';


const App = props => {

    const [type, setType] = useState();
    const [Value, setValue] = useState();
    const [load, setLoad] = useState();
    const [Errors, setErrors] = useState("");
    

    return (<>
        
        <Activities type={type} setType={setType} setValue={setValue} Errors={Errors} setErrors={setErrors}/>
        <SubActivities type={type} Value={Value} setValue={setValue} setLoad={setLoad} Errors={Errors} setErrors={setErrors}/>
        <ShowActivities type={type} Value={Value} setValue={setValue} load={load} setLoad={setLoad}/>
    </>);
}

export default App;