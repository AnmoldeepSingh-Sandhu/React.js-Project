const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubTypeSchema = new Schema({

	Value:{

		type:"String",

		minLength: 5,
		maxLength: 100,

		required:true,

	}


});


exports.SubTypeSchema;