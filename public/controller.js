function AppCtrl($scope, $http) {

	var refresh = function(){
		$http.get('/contactlist').success(function(response){
			$scope.list = response;
			$scope.contact = '';
		});
	}

	var password = "";
	$scope.isAdmin = false;

	refresh();

	$scope.addContact = function(){
	 	console.log($scope.contact);

	 	if($scope.contact=='') return;

	 	$http.post('/contactlist',$scope.contact).success(function(response){
	 		console.log(response);
	 		refresh();
	 	});
	 }

	 $scope.remove = function(id){
	 	console.log(id);
	 	$http.get('/contactlist/remove/?id='+ id + "&pass="+password).success(function(response){
	 		refresh();
	 	});
	 }

	 $scope.getAdmin = function() {
	 	var userPass = prompt("Enter admin password:");
	 	$http.post('/contactlist/checkAdminPassword', {pass: userPass}).success(function(res) {
	 		if (!res.result) {
	 			alert("Oops, password is wrong!");
	 		} else {
	 			password = userPass;
	 			$scope.isAdmin = true;
	 			var elements = document.getElementsByClassName("deleteBtn");
	 			for (var i =0; i<elements.length;i++) {
	 				elements[i].style.display = 'block';
	 			}
	 			refresh();
	 			//document.getElementById('input').style.display = 'block';
	 			console.log(password);
	 		}
	 	});
	 }
}
