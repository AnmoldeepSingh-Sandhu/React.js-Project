import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import Activities from './Activities';
import ShowActivities from './ShowActivities';
import SubActivities from './SubActivities';

const App = props => {

    const [type, setType] = useState();
    const [Value, setValue] = useState("");
    

    return (<>
        
        <Activities type={type} setType={setType} setValue={setValue}/>
        <SubActivities type={type} Value={Value} setValue={setValue}/>
        <ShowActivities type={type} Value={Value} setValue={setValue}/>
    </>);
}

export default App;