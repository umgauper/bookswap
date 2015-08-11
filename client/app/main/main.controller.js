  'use strict';

  angular.module('bookswapApp')
    .controller('MainCtrl', function ($scope, $http, Auth, User, $modal) {

    $scope.page = 'myBooks';

    $scope.openUserUpdate = function() {
      $scope.firstName = '';
      $scope.lastName = '';
      $scope.city = '';
      $scope.state = '';

      $scope.$modalInstance = $modal.open({
        templateUrl: 'components/modal/modal.html',
        controller: 'userUpdateCtrl',
        scope: $scope
      });
    };

    $scope.modal =  {
      dismissable: true,
      title: 'Settings'
    };

    $scope.getAllBooks = function() {
      $http.get('api/books').success(function(data) {
        $scope.allBooks = data;
        console.log(data);
      });
    };

    $scope.getMyBooks = function(_id) {
        $http.get('api/books/' + _id).success(function(data) {
                $scope.myBooks = data;
        });
      };

//User.get() and Auth.getCurrentUser()._id were returning undefined, so I used a direct get request to user api instead
    $http.get('api/users/me').success(function(data) {
      console.log(data);
      $scope.username = data.username;
      $scope.getMyBooks(data._id);
      $scope.firstName = data.firstName;
      $scope.lastName = data.lastName;
      $scope.city = data.city;
      $scope.state = data.state;
    });


    $scope.isLoggedIn = function() {
      return Auth.isLoggedIn();
    };

    $scope.userIDKnown = function() {
      return Auth.getCurrentUser()._id
    };

    $scope.addBook = function() {
      $http.get('api/search/' + $scope.newBook).success(function(data) {

        var owner = Auth.getCurrentUser()._id;

        var bookObj = JSON.parse(data.body);
        var volumeInfo = bookObj.items[0].volumeInfo;

        console.log(volumeInfo);

        var name = volumeInfo.title;

        if(volumeInfo.imageLinks) {
          var imageURL = volumeInfo.imageLinks.thumbnail; //If the title doesn't have a thumbnail image, assign generic book cover
        } else {
          var imageURL = 'http://i.istockimg.com/file_thumbview_approve/5523935/3/stock-photo-5523935-antique-leather-book-cover.jpg';
        }

        var isbn = volumeInfo.industryIdentifiers[0].identifier;

        $http.post('api/books', {owner: owner,
                                  name: name,
                                  isbn: isbn,
                                  imageUrl: imageURL
        })
        .success(function(data) {
            $scope.getMyBooks(owner);
        });
      });
    };
  });
