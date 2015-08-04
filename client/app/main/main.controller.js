  'use strict';

  angular.module('bookswapApp')
    .controller('MainCtrl', function ($scope, $http, Auth, User) {

    $scope.getBooks = function(_id) {
        $http.get('api/books/' + _id).success(function(data) {
                $scope.myBooks = data;
        });
      };

    $http.get('api/users/me').success(function(data) { //User.get() and Auth.getCurrentUser()._id were returning undefined, so I used direct get request to user api instead
      $scope.getBooks(data._id);
    });


    $scope.isLoggedIn = function() {
      return Auth.isLoggedIn();
    };

    $scope.userIDKnown = function() {
      return Auth.getCurrentUser()._id
    };

      alert($scope.userIDKnown());



    $scope.addBook = function() {
      $http.get('api/search/' + $scope.newBook).success(function(data) {

        var owner = Auth.getCurrentUser()._id;

        var bookObj = JSON.parse(data.body);
        var volumeInfo = bookObj.items[0].volumeInfo;

        var name = volumeInfo.title;
        var imageURL = volumeInfo.imageLinks.smallThumbnail;
        var isbn = volumeInfo.industryIdentifiers[0].identifier;

        $http.post('api/books', {owner: owner,
                                  name: name,
                                  isbn: isbn,
                                  imageUrl: imageURL
        }).success(function(data) {
            $scope.getBooks(owner);
        });

      });
    };
  });
