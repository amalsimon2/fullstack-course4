(function () {
"use strict";

// TODO: STEP 0
// Set up the $dc (Data Controller) object on the window
var dc = {};

// Base URL for the Firebase database
var baseURL = "https://coursera-jhu-default-rtdb.firebaseio.com/";

// TODO: STEP 1
// Load the home snippet when page loads
document.addEventListener("DOMContentLoaded", function () {
  $ajaxUtils.sendGetRequest(
    "snippets/home-snippet.html",
    function (response) {

      // TODO: STEP 2
      // Get all categories from the server
      $ajaxUtils.sendGetRequest(
        baseURL + "categories.json",
        function (categories) {

          // TODO: STEP 3
          // Pick a random category short_name
          var randomIndex = Math.floor(Math.random() * categories.length);
          var randomCategoryShortName = categories[randomIndex].short_name;

          // TODO: STEP 4
          // Insert the random short_name into the home snippet
          // and load it into the page
          var homeHtml = response.replace(
            "{{randomCategoryShortName}}",
            "'" + randomCategoryShortName + "'"
          );
          document.querySelector("#main-content").innerHTML = homeHtml;
        }
      );
    },
    false // not JSON, it's HTML
  );
});

// Load menu items for a category
dc.loadMenuItems = function (shortName) {
  $ajaxUtils.sendGetRequest(
    baseURL + "menu_items/" + shortName + ".json",
    function (data) {
      $ajaxUtils.sendGetRequest(
        "snippets/menu-items-snippet.html",
        function (response) {
          var html = buildMenuItemsHTML(response, data);
          document.querySelector("#main-content").innerHTML = html;
        },
        false
      );
    }
  );
};

dc.loadMenuCategories = function () {
  $ajaxUtils.sendGetRequest(
    baseURL + "categories.json",
    function (data) {
      $ajaxUtils.sendGetRequest(
        "snippets/categories-snippet.html",
        function (response) {
          document.querySelector("#main-content").innerHTML = response;
        },
        false
      );
    }
  );
};

dc.loadMap = function () {
  document.querySelector("#main-content").innerHTML =
    "<div class='container'><h2>Map goes here</h2></div>";
};

function buildMenuItemsHTML(template, data) {
  // Simple replacement - just show items in a list
  var items = data.menu_items;
  var html = "<div class='container'><h2>" + data.category.name + "</h2><ul>";
  for (var i = 0; i < items.length; i++) {
    html += "<li>" + items[i].name + " - $" + items[i].price_small + "</li>";
  }
  html += "</ul></div>";
  return html;
}

// Expose $dc to global
window.$dc = dc;

})();
