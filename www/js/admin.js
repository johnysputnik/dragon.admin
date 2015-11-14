
// Modules

var dragonAdmin = angular.module('dragonAdmin', [
    'ngRoute'
]);

// Factories

var dragonAdminFactory = function() {
    var factory = {};

    factory.getUsers = function(){
        var users = [
            {
                name: 'Test Racer',
                email: 'test@jsolutions.co.uk',
                category: 3,
                type: 'road'
            },
            {
                name: 'John Cumming',
                email: 'john@jsolutions.co.uk',
                category: 0,
                type: 'sportive'
            }];
        return users;
    };

    factory.getPlan = function() {
        return {test: "test"};
    }

    return factory;
};

dragonAdmin.factory('dragonAdminFactory', dragonAdminFactory);

// Controllers

var dragonUserController = function($scope, dragonAdminFactory){

    $scope.userSummary = {};
    $scope.summaryVisible = false;

    $scope.users = dragonAdminFactory.getUsers();

    $scope.getPlan = function(){
        $scope.userSummary = dragonAdminFactory.getPlan();
        $scope.summaryVisible = true;
    };

    $scope.clearSummary = function(){
        $scope.userSummary = {};
        $scope.summaryVisible = false;

    };
};

dragonAdmin.controller('dragonUserController', ['$scope', 'dragonAdminFactory', dragonUserController]);


// Config

dragonAdmin.config(['$routeProvider',
                    function($routeProvider) {
                        $routeProvider.
                            when('/summary',{
                                controller: 'dragonUserController',
                                templateUrl: 'views/listusers.html'
                            }).
                            otherwise({
                                redirectTo: '/summary'
                            });

                    }]);
