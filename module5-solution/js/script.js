(function () {
"use strict";

angular.module("NarrowItDownApp", [])
.controller("HomeController", HomeController)
.service("MenuCategoryService", MenuCategoryService)
.constant("baseURL", "https://coursera-jhu-default-rtdb.firebaseio.com/");

HomeController.$inject = ["$scope", "MenuCategoryService"];
function HomeController($scope, MenuCategoryService) {
  var home = this;

  MenuCategoryService.getAllCategories()
  .then(function (response) {
    var categories = response.data;
    var randomIndex = Math.floor(Math.random() * categories.length);
    home.randomCategoryShortName = categories[randomIndex].short_name;
  })
  .catch(function (error) {
    console.log("Error: " + error);
  });
}

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