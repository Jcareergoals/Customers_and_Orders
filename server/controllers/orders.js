var mongoose = require('mongoose');
var Orders = mongoose.model('Orders');

module.exports = {
	index: function(req, res){
		Orders.find({}, function(err, data){
			res.json(data);
		}); 
	},
	create: function(req, res){ 
		var order = new Orders(req.body);
		order.save();
		Orders.find({}, function(err, data){
			res.json(data);
		}); 
	}
}