'use strict';

angular.module('ChirperApp', ['firebase'])
.controller('ChirperCtrl', ['$scope', '$firebaseArray', '$firebaseObject', '$firebaseAuth', function($scope, $firebaseArray, $firebaseObject, $firebaseAuth) {

	/* define reference to your firebase app */
	var ref = new Firebase("https://chirper-demo-emnet.firebaseio.com/");
	
	/* define reference to the "chirps" value in the app */
	var chirpsRef = ref.child("chirps");

	/* define reference to the "users" value in the app */
	var usersRef = ref.child("users");

	/* create a $firebaseArray for the chirps reference and add to scope */
	$scope.chirps = $firebaseArray(chirpsRef);

	/* create a $firebaseObject for the users reference and add to scope (as $scope.users) */
	$scope.users = $firebaseObject(usersRef);

	var Auth = $firebaseAuth(ref);

	$scope.newUser = {}; //empty object

	// Saves new chirp to Firebase then clears textArea ($scope.newChirp)
	$scope.chirp = function() {
		$scope.chirps.$add({
			text: $scope.newChirp,
			userId: -1,
			likes: 0,
			time: Firebase.ServerValue.TIMESTAMP
		}).then(function() {
				$scope.newChirp = '';
		});
	};

	$scope.signIn = function() {
		var promise = Auth.$authWithPassword({
			'email': $scope.newUser.email,
			'password': $scope.newUser.password
		});
		return promise;
	};

	$scope.signUp = function() {
		console.log("Creating user " + $scope.newUser.email);

		Auth.$createUser({
			'email': $scope.newUser.email,
			'password': $scope.newUser.password,
		})
		.then($scope.signIn)
		.then(function(authData) {
			if ($scope.newUser.avatar === undefined) {
				$scope.newUser.avatar = 'img/no-pic.png'
			}	

			var newUserInfo = {
				'handle': $scope.newUser.handle,
				'avatar': $scope.newUser.avatar
			};

			$scope.users[authData.uid] = newUserInfo;

			$scope.users.$save();
			$scope.userId = authData.uid;
		})
		.catch(function(error) {
			console.log(error);
		});
	};



}])
