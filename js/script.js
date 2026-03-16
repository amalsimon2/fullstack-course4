(function () {
"use strict";

// STEP 0: Declare the app module and register components
angular.module("NarrowItDownApp", [])
.controller("HomeController", HomeController)
.service("MenuCategoryService", MenuCategoryService)
.constant("baseURL", "https://coursera-jhu-default-rtdb.firebaseio.com/");

// STEP 1: Inject $scope and MenuCategoryService
HomeController.$inject = ["$scope", "MenuCategoryService"];
function HomeController($scope, MenuCategoryService) {
  var home = this;

  // STEP 2: Call getAllCategories()
  MenuCategoryService.getAllCategories()
  .then(function (response) {
    var categories = response.data;

    // STEP 3: Pick a random category's short_name
    var randomIndex = Math.floor(Math.random() * categories.length);
    home.randomCategoryShortName = categories[randomIndex].short_name;
  })
  .catch(function (error) {
    console.log("Error: " + error);
  });
}

// STEP 4: Implement MenuCategoryService using $http
MenuCategoryService.$inject = ["$http", "baseURL"];
function MenuCategoryService($http, baseURL) {
  var service = this;

  service.getAllCategories = function () {
    return $http({
      method: "GET",
      url: (baseURL + "categories.json")
    });
  };
}

})();