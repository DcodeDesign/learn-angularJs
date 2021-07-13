'use strict';

app.controller('categoryIndex', function ($scope) {

    })

    .controller('categoryList',  function ($scope, categoryProvider) {
        $scope.categories = categoryProvider.getCategories();
    })

    .controller('categoryCreate',  function ($scope)  {


    })

    .controller('categoryRemove',  function ($scope)  {

    })

;
