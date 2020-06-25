
var app = angular.module('mainApp', []);

app.controller("HotelController", function ($scope, $http) {

    var url = "../components/json/data.json";
    //window.setInterval(function () {           
    //}, 5000);

    $http.get(url)
        .then(function (response) {
            $scope.Hotels = response.data[1].entries;

            console.log(response.data[1].entries); //mou fernei ta ksenodoxia ta opoia vazw se ena $scope

            $scope.Rooms = response.data[0].roomtypes; //mou fernei ola ta roomtypes ta opoia ta vazei kai ayta se ena $scope
            //ston idio controller

            var pinakasFilters = [];
            for (var a in $scope.Hotels) {

                for (var b in $scope.Hotels[a].filters) {
                    // if ($.inArray($scope.Hotels[a].filters[b], pinakasFilters) === -1) pinakasFilters.push($scope.Hotels[a].filters[b]);

                    pinakasFilters.push($scope.Hotels[a].filters[b]);
                }
            }          
            // $scope.pinakasFilters = pinakasFilters;

            var filtra = [];
         
            for(var f in pinakasFilters)
            {
                filtra.push(pinakasFilters[f].name)
            }

            function removeDublicates(data){
                return[...new Set(data)]
            }

            $scope.filtra= removeDublicates(filtra);
            console.log($scope.filtra);


            $scope.sortType="hotelName";

            //ana Cities:
            var pinakasCities = [];
            for(var k in $scope.Hotels)
            {
                pinakasCities.push($scope.Hotels[k].city)
            }
            $scope.Cities = removeDublicates(pinakasCities);
            console.log($scope.Cities);
            
            //ana guestratings
            var guestratings =[];
            for (var a in $scope.Hotels) {

                guestratings.push($scope.Hotels[a].guestrating);
            }
            $scope.guestratings = guestratings;
            console.log(guestratings);

            // $scope.pinakasFilters = function (obj) {
            //     return obj.name;
            // };




            // console.log(response.data[1].entries[0].rating); //fere mou to prwto rating
            // for (var j in response.data[1].entries) {          
            //     var numberOfStars =response.data[1].entries[j].rating;

            // // var numberOfStars = $scope.Hotels[j].rating;
            // console.log(numberOfStars);

            // // $scope.asteria = numberOfStars;
            // }    
            // $scope.asteria = 5;





            var prices = [];
            for (var i in $scope.Hotels) {
                prices.push($scope.Hotels[i].price);
            }
            $scope.max = Math.max(...prices);
            $scope.rangemax = $scope.max;

            console.log(response.data);
        }, function myError(response) {
            console.log(response);

        });

    $scope.filterPrice = function (obj) {
        return obj.price > 0 && obj.price <= $scope.max;
    };


});

