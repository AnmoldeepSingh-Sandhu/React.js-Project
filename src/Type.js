const mongoose = require("mongoose");

const SubTypeSchema = require("./SubType.js");

const Schema = mongoose.Schema;

const TypeSchema = new Schema({

    type:{
        
        type:String,
        enum: ["Cleaning", "Study", "Work" , "Exercise", "Trip", "Other"],
        required:true,
    },

    subTypes: [SubTypeSchema],
})

exports.Type = mongoose.model("Type", TypeSchema);

