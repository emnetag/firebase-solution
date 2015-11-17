'use strict';

angular.module('ChirperApp', [])
.controller('ChirperCtrl', ['$scope', function($scope) {

	/* define reference to your firebase app */

	/* define reference to the "chirps" value in the app */

	/* define reference to the "users" value in the app */

	/* create a $firebaseArray for the chirps reference and add to scope */
	
	/* create a $firebaseObject for the users reference and add to scope (as $scope.users) */




	/* Write an accessible (on scope) chirp() function to save a tweet */

	   /* Add a new object to the tweets array by calling the
	      firebaseArray .$add method on the chirps $firebaseArray. Include:
	         text: the text in textarea,
	         userId:current user id (make "-1" for now),
	         likes:0,
	         time:Firebase.ServerValue.TIMESTAMP
	              // this tells firebase server to save the current time
	   */


	   /* Once the tweet is saved, reset the value
	      of $scope.newChirp to empty string for the next tweet */

}])
