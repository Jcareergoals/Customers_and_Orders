var store = angular.module('store', ['ngRoute']); 

// ANGULAR ROUTES
store.config(function($routeProvider){
	$routeProvider
			.when('/', {templateUrl:'./../partials/customers.html'})
			.when('/orders', {templateUrl:'./../partials/orders.html'})
			.otherwise({
				redirectTo:"/"
			})
}); 

// FACTORIES 
 
// ******* customers factory ********   1
store.factory('CustomersFactory', function($http){
	var factory = {}; 
	// get customers
	factory.index = function(callback){
		$http.get('/customers').success(function(data){
			callback(data);
		}); 
	} 
	// add customers
	factory.addCustomer = function(newCustomer, callback){
		$http.post('/customers', newCustomer).success(function(data){
			callback(data); 
		}); 
	}
	// remove customers 
	factory.removeCustomer = function(customer, callback){
		$http.post('/customer/remove', customer).success(function(data){
			callback(data); 
		}); 
	}
	return factory; 
}); 
// ******** orders factory ********  2
store.factory('OrdersFactory', function($http){
	var factory = {}; 
	var products = [
    	{name:"Iphone"},
		{name:"Laptop"},
		{name:"Xbox360"},
		{name:"Nike Shoes"},
		{name:"Sunglasses"},
		{name:"BlueTooth Player"},
		{name:"Television"}
	]; 
	var orders = []; 
	factory.index = function(callback){
		callback(orders);
	}
	factory.getProducts = function(callback){
		$http.get('/products', function(data){
			callback(products); 
		}); 
	}
	factory.addOrder = function(order){
		orders.push(order); 
	}
	return factory; 
})

// CONTROLLERS

// ******** customers controller ********  1
store.controller('CustomersController', function($scope, CustomersFactory){
	$scope.customers = []; 
	CustomersFactory.index(function(data){
		// console.log(data);
		$scope.customers = data;
	}); 
	$scope.addCustomer = function(){
		CustomersFactory.addCustomer($scope.newCustomer, function(data){
			$scope.customers = data; 
			$scope.newCustomer = {}; 
		}); 
	}
	$scope.delete = function(customer){
		CustomersFactory.removeCustomer(customer, function(data){
			$scope.customers = data; 
		});
	}
}); 
// ******** orders controller *********  2
store.controller('OrdersController', function($scope, OrdersFactory, CustomersFactory){
	$scope.orders, $scope.products, $scope.customers = []; 
	CustomersFactory.index(function(data){
		$scope.customers = data; 
	}); 
	OrdersFactory.index(function(data){
		$scope.orders = data; 
	});
	OrdersFactory.getProducts(function(data){
		$scope.products = data; 
	}); 
	$scope.addOrder = function(){
		if($scope.newOrder && $scope.newOrder.customer && $scope.newOrder.product && $scope.newOrder.quantity){
			OrdersFactory.addOrder($scope.newOrder);	 
			$scope.newOrder = {}; 
		} else {
			$scope.error = "Make sure all fields are filled";
		}
	}
}); 