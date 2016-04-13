var mongoose = require('mongoose');
var Orders = mongoose.model('Orders');
var Products = mongoose.model('Products');

module.exports = {
	index: function(req, res){
		Orders.find({}, function(err, data){
			res.json(data);
		}); 
	},
	create: function(req, res){ 
		var order = new Orders(req.body);
		Products.find({name:req.body.product}, function(err, data){
			if(data[0].quantity > 0 && data[0].quantity - req.body.quantity >= 0){
				var newValue = data[0].quantity - req.body.quantity; 
				Products.update({name:req.body.product}, {quantity:newValue}, function(err, data){
					order.save(); 
					Orders.find({}, function(err, data){
						res.json(data);
					}); 
				}); 
				
			} else {
				console.log('Cannot provide the amount requested');
				console.log('Amount requested: ', req.body.quantity);
				console.log('Amount available: ', data[0].quantity);
			}
		}); 
		
	}
}

// file location: /serer/controllers/orders.js