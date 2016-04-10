var mongoose = require('mongoose'); 
var OrdersController = require('./../controllers/orders.js'); 
var CustomersController = require('./../controllers/customers.js'); 
// var customers = [{name:"josue"},{name:"john"},{name:"angelita"}]; 

module.exports = function(app){
	app		// Customers Routes
		.get('/customers', function(req, res){
			CustomersController.index(req, res)
		})
		.post('/customers', function(req, res){
			CustomersController.create(req, res)
		}) 
		.post('/customer/remove', function(req, res){
			CustomersController.delete(req, res)
		}) 

		// Orders Routes
		.get('/orders', function(req,res){
			OrdersController.index(req, res) 
		})
		.post('/orders', function(req, res){
			OrdersController.create(req, res) 
		})
}