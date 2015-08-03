'use strict';

angular.module('bookswapApp')
  .controller('MainCtrl', function ($scope, $http, Auth) {
    $scope.isLoggedIn = function() {
      return Auth.isLoggedIn();
    };

    $scope.getBooks = function(_id) {
        $http.get('api/books/' + _id).success(function(data) {
                $scope.myBooks = data;
        });
      };

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
            $scope.getBooks();
        });

      });
    };

    $scope.getBooks(Auth.getCurrentUser()._id); //TODO: this is going before Auth.getCurrentUser()._id is defined..so only renders books after page refresh..

  });
