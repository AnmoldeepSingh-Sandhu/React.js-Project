const express = require('express');

const app = express();

const mongoose = require("mongoose");

const connection = require("./db/connection.js");

connection.once('open', ()=>{
    const server = app.listen(process.env.PORT || 8080, ()=>{
    console.log("Connected and listening");
    });
});


app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

app.use(express.json());

const {Type} = require("./src/Type.js");
const SubTypeSchema = require("./src/SubType.js");

let saveType;




app.post("/type",(req,res) =>{

    saveType = req.body.type;

    Type.findOne({"type":req.body.type}).exec((error, type) =>{

        if(type == null){

            console.log(req.body);
            let type = new Type(req.body);
    
            type.save()
            .then(results => {

                res.status(201).json(results);
                
            })
            .catch(error=> res.status(500).json(error));


        }else{
            
            res.status(500).json({message:"Given type already exist."});
            
        }

    }) 
    
})

app.get("/type",(req,res) =>{

    Type.find({}).exec()
    .then(results => {

        res.status(201).json(results);

    })
    .catch(error => console.log(error));

})



app.post("/reuse", (req,res) => {

    saveType = req.body.type;
    res.status(201).json("updated type value without pressing submit button")
})




app.post("/subTypes",(req,res) =>{

    Type.findOne({"type":saveType}).exec((error, type) =>{

        if(type == null || error){

            res.json("No type with that name found!");

        }else{

            let dublicate = false;

            if(type.subTypes.length >= 1){
                
                for(i=0; i< type.subTypes.length; i++){

                    if(type.subTypes[i].toLowerCase() == req.body.Value.toLowerCase()){

                            dublicate = true;
                    }
                }
            }


            if(dublicate == false){

                let Value = req.body.Value;
                        
                type.subTypes.push(Value);

                type.save()
                .then(results => {
                    res.status(201).json(results);
                    console.log(results);
                })
                .catch(error=> console.log(error));

                    
            }else{
                console.log("dublicate value");
            }

        }
        
    })
    
})


app.get("/subTypes",(req,res) =>{

    
    Type.find().exec()
    .then(results => {
        res.status(201).json(results);
    })
    .catch(error => console.log(error));

})