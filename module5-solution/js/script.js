(function () {
"use strict";

var baseURL = "https://coursera-jhu-default-rtdb.firebaseio.com/";

document.addEventListener("DOMContentLoaded", function () {
  $ajaxUtils.sendGetRequest(
    "snippets/home-snippet.html",
    function (response) {
      $ajaxUtils.sendGetRequest(
        baseURL + "categories.json",
        function (categories) {
          var randomIndex = Math.floor(Math.random() * categories.length);
          var randomCategoryShortName = categories[randomIndex].short_name;
          var homeHtml = response.replace(
            "{{randomCategoryShortName}}",
            "'" + randomCategoryShortName + "'"
          );
          document.querySelector("#main-content").innerHTML = homeHtml;
        }
      );
    },
    false
  );
});

window.$dc = {
  loadMenuItems: function (shortName) {
    $ajaxUtils.sendGetRequest(
      baseURL + "menu_items/" + shortName + ".json",
      function (data) {
        var items = data.menu_items;
        var html = "<div class='container'><h2>" + data.category.name + "</h2><ul>";
        for (var i = 0; i < items.length; i++) {
          html += "<li>" + items[i].name + "</li>";
        }
        html += "</ul></div>";
        document.querySelector("#main-content").innerHTML = html;
      }
    );
  },
  loadMenuCategories: function () {},
  loadMap: function () {}
};

})();
