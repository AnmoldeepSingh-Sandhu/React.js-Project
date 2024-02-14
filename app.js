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

let saveType;



app.post("/type",(req,res) =>{

    Type.findOne({type: req.body.type}).exec((error, type) =>{

        if(!type || error){
        }else{
            saveType = req.body.type;
        }
    })  
})


app.post("/subTypes",(req,res) =>{
    console.log("given value: ", req.body.Value)
    console.log("given value: ", req.body)


    Type.findOne({"type":saveType}).exec((error, type) =>{

        if(type == null || error){
            res.status(500).json({message:"No type with that name found!"});

        }else if(req.body.Value.length < 5 || req.body.Value.length > 100){
            res.status(500).json({message:"Length of Activity should be between 5 to 100 Characters"});

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
                })
                .catch(error=> console.log(error));
                    
            }else{
                res.status(500).json({message:"This value already exists in the list"});
            }
        }
    })
})


app.post("/deleteActivity", (req, res) => {
    const typeToDeleteFrom = req.body.Type.type;
    const subTypeToDelete = req.body.SubType;

    console.log("typeToDeleteFrom: ",typeToDeleteFrom);
    console.log("subTypeToDelete: ",subTypeToDelete);
  
    // Find the Type document that matches the provided type
    Type.findOne({ type: typeToDeleteFrom }, (error, type) => {
        if (error) {
            return res.status(500).json({ message: "Error finding Type" });
        }
    
        if (!type) {
            return res.status(404).json({ message: "Type not found" });
        }
  
        // Use the pull method to remove the subType from the subTypes array
        type.subTypes.pull(subTypeToDelete);
    
        // Save the updated Type document
        type.save((error) => {
            if (error) {
                return res.status(500).json({ message: "Error saving Type" });
            }
    
            return res.status(201).json({ message: "SubType deleted successfully" });
        });
    });
});
  



// Get Requests
app.get("/type",(req,res) =>{

    Type.find({}).exec()
    .then(results => {
        res.status(201).json(results);
    })
    .catch(error => console.log(error));

})