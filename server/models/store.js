var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/store'); 

var CustomerSchema = new mongoose.Schema({
	name: String, 
	creation_date: {type: Date, default: Date.now}
}); 
var OrdersSchema = new mongoose.Schema({
	customer: String, 
	product: String, 
	quantity: Number, 
	date: {type:Date, default:Date.now}
});

mongoose.model('Customer', CustomerSchema); 
mongoose.model('Orders', OrdersSchema);