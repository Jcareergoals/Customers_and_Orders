var mongoose = require('mongoose'); 
var Customer = mongoose.model('Customer');

module.exports = {
	index: function(req, res){
		Customer.find({}, function(error, data){
			res.json(data); 
		}); 
	},
	create: function(req, res){
		var customer = new Customer({
			name: req.body.name, 
		});  
		Customer.find({name: req.body.name}, function(err, data){
			if(data.length > 0){
				Customer.find({}, function(err, data){
					var error = {error:"This name already exists"}
					data.push(error); 
					res.json(data); 
				}); 
			} else {
				customer.save(); 
				Customer.find({}, function(err, data){
					res.json(data);
				}); 
			}
		});  
	},
	delete: function(req, res){
		Customer.remove({_id:req.body._id}, function(err){
			Customer.find({}, function(err, data){
				res.json(data);
			});
		});
	}
}

// file location: /server/controllers/customers.js