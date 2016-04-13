var store = angular.module('store', ['ngRoute']); 

// ANGULAR ROUTES
store.config(function($routeProvider){
	$routeProvider
		.when('/', {templateUrl:'./../partials/dashboard.html'})
		.when('/products', {templateUrl:'./../partials/products.html'})
		.when('/orders', {templateUrl:'./../partials/orders.html'})
		.when('/customers', {templateUrl:'./../partials/customers.html'})
		.otherwise({
			redirectTo:'/'
		})
}); 

// FACTORIES 
 
// ******* customers factory ********   1
store.factory('CustomersFactory', function($http){
	var factory = {}; 
	factory.index = function(callback){
		$http.get('/customers').success(function(data){
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
// ******** orders factory ********  2
store.factory('OrdersFactory', function($http){
	var factory = {}; 
	factory.index = function(callback){
		$http.get('/orders').success(function(data){
			callback(data);
		});
	}
	factory.addOrder = function(order, callback){
		$http.post('/orders', order).success(function(data){
			callback(data); 
		});
	}
	return factory; 
});
store.factory('ProductsFactory', function($http){
	var factory = {}; 
	factory.index = function(callback){
		$http.get('/products').success(function(data){
			callback(data);
		}); 
	}
	factory.create = function(data, callback){
		$http.post('/products', data).success(function(data){
			callback(data);
		}); 
	}
	return factory; 
}); 

// CONTROLLERS

// ******** customers controller ****** 1
store.controller('CustomersController', function($scope, CustomersFactory){
	$scope.customers = []; 
	CustomersFactory.index(function(data){
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
// ******** orders controller ********* 2
store.controller('OrdersController', function($scope, OrdersFactory, CustomersFactory, ProductsFactory){
	$scope.orders, $scope.customers = []; 
	CustomersFactory.index(function(data){
		$scope.customers = data; 
	}); 
	OrdersFactory.index(function(data){
		$scope.orders = data; 
	});
	ProductsFactory.index(function(data){
		$scope.products = data; 
	}); 
	$scope.addOrder = function(){
		if($scope.newOrder && $scope.newOrder.customer && $scope.newOrder.product && $scope.newOrder.quantity){
			OrdersFactory.addOrder($scope.newOrder, function(data){
				$scope.orders = data; 
				$scope.newOrder = {}; 
			});	 
			ProductsFactory.index(function(data){
				$scope.products = data; 
			}); 
		} else {
			$scope.error = "Make sure all fields are filled";
		}
	}
}); 
// ******** products controller ******* 3
store.controller('ProductsController', function($scope, ProductsFactory){
	$scope.products = []; 
	$scope.limitValue = 8;
	ProductsFactory.index(function(data){
		$scope.products = data;
	}); 
	$scope.addProduct = function(){
		if($scope.newProduct && $scope.newProduct.name && $scope.newProduct.url && $scope.newProduct.quantity){
			ProductsFactory.create($scope.newProduct, function(data){
				$scope.products = data; 
				$scope.newProduct = {}; 
				$scope.error = '';
			});
		} else {
			$scope.error = "Please make sure 'name', 'image', and 'initial quantity' fields are filled";
			console.log($scope.newProduct); 
		}
	}
	$scope.showMore = function(){
		$scope.limitValue = ''; 
	}
}); 
store.controller('DashboardController', function($scope, OrdersFactory, CustomersFactory, ProductsFactory){
	$scope.products, $scope.orders, $scope.products = []; 
	OrdersFactory.index(function(data){
		$scope.orders = data; 
		// console.log("orders",data);
	}); 
	CustomersFactory.index(function(data){
		$scope.customers = data; 
		// console.log("customers", data);
	}); 
	ProductsFactory.index(function(data){
		$scope.products = data;
		// console.log("products", data);
	}); 
}); 

// File location: /clients/angular.js