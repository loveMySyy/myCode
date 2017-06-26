app.controller('myNoteCtrl',function($scope){
	$scope.message='';
	$scope.save=function(){
		alert('已经保存');
	}
	$scope.clear=function(){
		$scope.message='';
	}
	$scope.left=function(){
		return 100-$scope.message.length;
	}
});