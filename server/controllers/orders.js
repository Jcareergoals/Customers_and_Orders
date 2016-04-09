var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var Orders = mongoose.model('Orders');

var products = [{name:"Iphone"},{name:"Laptop"},
				{name:"Xbox360"},{name:"Nike Shoes"},
				{name:"Sunglasses"},{name:"BlueTooth Player"},
				{name:"Television"},{name:"Ipod"}]; 

module.exports = {
	index: function(req, res){

	}
	create: function(req, res){

	}
	delete: function(req, res){
		
	}
}