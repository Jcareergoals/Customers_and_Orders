var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/store'); 

var CustomerSchema = new mongoose.Schema({
	name: String, 
	creation_date: {type: Date, default: Date.now}
}); 

mongoose.model('Customer', CustomerSchema); 