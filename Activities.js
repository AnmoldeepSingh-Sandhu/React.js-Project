import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';



const Activities = props => {
    
    const [Errors, setErrors] = useState("");
    
    const handleType = event => {

        props.setType(event.target.value);
    }

    
    const handleSubmit = event => {
            
            setErrors("");
            event.preventDefault();

            const type ={
                "type":props.type
            }

            axios.post("/type", type)
            .then(results => {
                console.log(results);
            })
            .catch(error => {setErrors(error.response.data.message); console.log(error.response.data.message)});
            props.setType("")
    }

    useEffect(()=>{
    
        setErrors("");
        const type ={
            "type":props.type
        }
        axios.post("/reuse", type)

    },[props.type]);

  
    return (<div className='types'>
        <h1>Types of Activities</h1>

        <form onSubmit={event => handleSubmit(event)}>

            <label className='labels'>Cleaning<input type="radio" name="type" value="Cleaning" onChange={(event)=> handleType(event)}/></label>

            <label className='labels'>Study<input type="radio" name="type" value="Study" onChange={(event)=> handleType(event)}/></label>

            <label className='labels'>Exercise<input type="radio" name="type" value="Exercise" onChange={(event)=> handleType(event)}/></label>

            <label className='labels'>Work/Job<input type="radio" name="type" value="Work" onChange={(event)=> handleType(event)}/></label>

            <label className='labels'>Trip<input type="radio" name="type" value="Trip" onChange={(event)=> handleType(event)}/></label>

            <label className='labels'>Other<input type="radio" name="type" value="Other" onChange={(event)=> handleType(event)}/></label>

            <div className='button'><button name='submit'>Sumit Type</button></div>

            <div style={{color:"red", margin:"10px", padding:"10px"}}>{Errors}</div>
            
        </form>
           
    </div>);
}

export default Activities;