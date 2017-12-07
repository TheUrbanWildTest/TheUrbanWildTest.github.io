(function () {
  'use strict';

  angular
      .module('app.main')
      .controller('mainCtrl', mainCtrl);

  mainCtrl.$inject = [
      '$ionicPlatform',
      '$scope',
      '$timeout',
      'locationsSrvc'
      ];


  function mainCtrl(
      $ionicPlatform,
      $scope,
      $timeout,
      locationsSrvc
  ) {
      var vm = angular.extend(this, {

      });

      vm.hardwareBackButton = $ionicPlatform.registerBackButtonAction(function() {
          //called when hardware back button pressed
          //vm.cancel();
      }, 100);
      $scope.$on('$destroy', vm.hardwareBackButton);

      //Controller below
      var createMap = function() {
        var mymap = L.map('mymap').setView([53.471528, -2.241224], 16);
        
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1IjoiYWxpY2VkaWdpdGFsbGFicyIsImEiOiJjamF3YnA1a3UwbWliMnZta3B5b3NpbDBzIn0.39_7KL6gzUbNJEsbeYkpVg'
        }).addTo(mymap);

        return mymap;
      }
      var removeMarker = function(map, marker){
        map.removeLayer(marker);
      }
      var removeAllMarkers = function(){
        mapMarkers.forEach(function(e,index){
          removeMarker(mymap, mapMarkers[index]);
        });
      }

      vm.busy = false;
      var mymap = createMap()
      var mapMarkers = [];
      vm.postcode = "M1 5GD";

      vm.refreshMap = function(postcode) {
        vm.busy = true
        removeAllMarkers();
        
        postcode = postcode.replace(/\s+/g, ''); //remove spaces
        
        locationsSrvc.getMarkers(postcode)
          .then(function(markersList){
            markersList.forEach(function(e,index){
              mapMarkers[index] = L.marker([e.location.lat, e.location.long]).addTo(mymap);
            });
            vm.busy = false;
          });

      }
      vm.clearMap = function(){
        removeAllMarkers();
      }

      


      
      
      
      
    }
})();
