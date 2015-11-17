
// Modules

var dragonAdmin = angular.module('dragonAdmin', [
    'ngRoute'
]);

// Factories

var dragonAdminFactory = function($http) {
    var factory = {};

    factory.getUsers = function(f){

        var users = [
            {
                name: 'Test Racer',
                email: 'test@jsolutions.co.uk',
                category: 3,
                type: 'road'
            }];
        return users;
    };

    factory.getPlan = function(f) {

        $http({
            method: 'GET',
            url: '/api/'
        }).then(function(response) {
            f(response);
        }, function (response) {
            f({test: false});
        });
    }

    return factory;
};

dragonAdmin.factory('dragonAdminFactory', ['$http', dragonAdminFactory]);

// Controllers

var dragonUserController = function($scope, dragonAdminFactory){

    $scope.userSummary = {};
    $scope.summaryVisible = false;

    $scope.users = dragonAdminFactory.getUsers();

    $scope.getPlan = function(){
        dragonAdminFactory.getPlan(function(data) {
            $scope.userSummary = data.data;
            $scope.summaryVisible = true;
            $scope.formattedUserSummary = JSON.stringify(data.data, null, 1);
        });
    };

    $scope.clearSummary = function(){
        $scope.userSummary = {};
        $scope.summaryVisible = false;
    };
};

dragonAdmin.controller('dragonUserController', ['$scope', 'dragonAdminFactory', dragonUserController]);


// Config

dragonAdmin.config(['$routeProvider', '$logProvider',
                    function($routeProvider, $logProvider) {

                        $logProvider.debugEnabled(true);

                        $routeProvider.
                            when('/summary',{
                                controller: 'dragonUserController',
                                templateUrl: 'views/listusers.html'
                            }).
                            otherwise({
                                redirectTo: '/summary'
                            });

                    }]);
