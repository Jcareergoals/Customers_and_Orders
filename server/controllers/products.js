var mongoose = require('mongoose');
var Products = mongoose.model('Products');

module.exports = {
	index: function(req, res){
		Products.find({}, function(err, data){
			res.json(data);
		}); 
	}, 
	create: function(req, res){
		Products.find({name:req.body.name}, function(err, data){
			if(data.length > 0){
				console.log('This item already exists'); 
				Products.find({}, function(err, data){
					res.json(data);
				}); 
			} else {
				var product = new Products(req.body); 
				product.save();
				Products.find({}, function(err, data){
					res.json(data);
				}); 
			}
		}); 
	}
}