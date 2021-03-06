
function ProductController($state, ProductsService, $rootScope, _) {
  var ctrl = this;
  ctrl.products = [];

  
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addProduct = false;
	  ctrl.error = null;
	  loadProducts();
  };
  
  function loadProducts(){
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  ctrl.company = $rootScope.selectedCompany;
	  ProductsService.listByCompany(ctrl.company.id).then(function(response){
	  	  console.log("list response: {}", response.data);
		  ctrl.products = response.data;
	  });
  }
  
  ctrl.searchPrf = function(event){
	  ctrl.productTable.DataTable.search(event).draw();
  };
  
  ctrl.createNewProduct = function (event) {
	    console.log('createNewProduct');
	    $state.go('product-new');
  };
  
  ctrl.openModal = function(product){
	  console.log("show modal" +  ctrl.showModal);
	  console.log("product" + JSON.stringify(product));
	  ctrl.product = product;
	  $('#productInfoModal').modal('show');
	  
  };
  
  ctrl.editProduct = function (id) {
	  $state.go('product-edit', { 'productId': id });
  };
  /*
  ctrl.showAddProduct = function (show){
	  ctrl.addProduct = show;
  };
  
  
  
  ctrl.saveProduct = function (event) {
	    ProductsService.save(event.purchaserequest).then(function () {
	    	  loadProducts();
	    	  ctrl.showAddProduct(false);
	    	  ctrl.purchaserequest = null;
	    });
  };
  */
  
  ctrl.deleteProduct = function (id){
	  ProductsService.delete(id).then(function(response){
		  loadProducts();
	  });
  };
  
  ctrl.approve = function(id){
	  ProductsService.approve(id).then(function(response){
		  console.log("Approved" + id);
	  });
  };
  
  ctrl.reject = function(id){
	  ProductsService.reject(id).then(function(response){
		  console.log("Rejected" + id);
	  });
  };
}

angular
  .module('admin.maintenance')
  .controller('ProductController', ProductController);
