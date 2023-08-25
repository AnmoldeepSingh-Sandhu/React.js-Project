const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubTypeSchema = new Schema({

	Value:{

		type:"String",

		minLength: 5,
		maxLength: 50,

		required:true,

	}


});


exports.SubTypeSchema;