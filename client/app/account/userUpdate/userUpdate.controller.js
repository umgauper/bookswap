'use strict';

angular.module('bookswapApp')
  .controller('userUpdateCtrl', function($scope, $http, Auth, $modalInstance, $window) {
    $scope.updateUserInfo = function() {
      $http.put('api/users/' + Auth.getCurrentUser()._id, {
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        city: $scope.city,
        state: $scope.state
      }).success(function(data) {
           console.log(data);
           $window.location.reload();
           $modalInstance.dismiss('cancel');
          })
    };





















  });

