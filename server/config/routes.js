var mongoose = require('mongoose'); 
var Customer = mongoose.model('Customer'); 
// var customerController = require('./../controllers/stores'); 
var customers = [{name:"josue"},{name:"john"},{name:"angelita"}]; 
module.exports = function(app){
	app.get('/customers', function(req, res){
		Customer.find({}, function(err, data){
			res.json(data);
		}); 
	});
	app.post('/customers', function(req, res){
		var customer = new Customer({
			name:req.body.name
		});
		Customer.find({name: req.body.name}, function(err, data){
			if(data.length > 0){
				Customer.find({}, function(err, data){
					var error = {error:"This name already exists"};
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
	}); 
	app.post('/customer/remove', function(req, res){
		Customer.remove({_id:req.body._id}, function(){
			Customer.find({}, function(err, data){
				res.json(data);
			});
		}); 
	}); 
}