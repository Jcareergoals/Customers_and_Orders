var store = angular.module('store', ['ngRoute']); 

store.config(function($routeProvider){
	$routeProvider
			.when('/', {templateUrl:'./../partials/customers.html'})
			.when('/orders', {templateUrl:'./../partials/orders.html'})
			.otherwise({
				redirectTo:"/"
			})
}); 

// factory 
store.factory('c_factory', function($http){
	var factory = {}; 
	factory.index = function(callback){
		$http.get('/customers').success(function(data){
			console.log("Response in c_factory:"); 
			console.log(data); 
			callback(data); 
		}); 
	} 
	factory.addCustomer = function(newCustomer, callback){
		$http.post('/customers', newCustomer).success(function(data){
			callback(data); 
		}); 
	}
	factory.removeCustomer = function(customer, callback){
		$http.post('/customer/remove', customer).success(function(data){
			callback(data); 
		}); 
	}
	return factory; 
}); 

// controller
store.controller('c_controller', function($scope, c_factory){
	$scope.customers = []; 
	c_factory.index(function(results){
		$scope.customers = results;
	}); 
	$scope.addCustomer = function(){
		c_factory.addCustomer($scope.newCustomer, function(data){
			$scope.customers = data; 
		}); 
	}
	$scope.delete = function(customer){
		c_factory.removeCustomer(customer, function(data){
			$scope.customers = data; 
		})
	}
}); 