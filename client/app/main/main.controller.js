  'use strict';

  angular.module('bookswapApp')
    .controller('MainCtrl', function ($scope, $http, Auth, User, $modal, $window) {

    $scope.page = 'myBooks';

    $scope.openUserUpdate = function() {
      $scope.firstName = '';
      $scope.lastName = '';
      $scope.city = '';
      $scope.state = '';

      $scope.$modalInstance = $modal.open({
        templateUrl: 'components/modal/modal.html',
        controller: 'MainCtrl'
      });
    };

   $scope.updateUserInfo = function() {
        $http.put('api/users/' + Auth.getCurrentUser()._id, {
          firstName: $scope.firstName,
          lastName: $scope.lastName,
          city: $scope.city,
          state: $scope.state
        }).success(function(data) {
          console.log(data);
          $window.location.reload();
        })
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
      $scope.name = data.name;
      $scope._id = data._id;
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

   $scope.openTradeModal = function(bookID, bookName) {
     $scope.bookID = bookID;
     $scope.bookToTrade = bookName; // name of book user clicked....pass via the propose trade, along w/book ID!
     $scope.modal = {
       dismissable: true,
       title: 'Propose Trade'
     };
     $scope.$modalInstance = $modal.open({
       templateUrl: 'components/modal/tradeModal.html',
       controller: 'MainCtrl',
       scope: $scope
     });
   };

  $scope.submitTrade = function(bookID) {
   // what needs to be done? add to Book Model tradesProposed: [{user: '', book: ''}] do $http.put thing-a-majig
    $http.put('api/books/' + bookID, {user:'test', book: 'test book'}).success(function(){
      //$modalInstance.dismiss('cancel');
      //$window.location.reload(); //hmm...
      //$scope.page = 'allBooks';
    }); // push userID of user proposing trade, and book ID of book offered !!

  }
  });
