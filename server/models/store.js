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
var ProductsSchema = new mongoose.Schema({
	name: String, 
	url: String, 
	description: String, 
	quantity: Number
}); 

mongoose.model('Customer', CustomerSchema); 
mongoose.model('Orders', OrdersSchema);
mongoose.model('Products', ProductsSchema);

// file location: /server/models/store.js