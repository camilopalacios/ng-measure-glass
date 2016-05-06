;(function() {
"use strict";

angular
  .module('MeasureGlassApp', ['ui.measureGlass'])
  .controller('GlassController', GlassController)
  .filter('reverse', reverse);

function reverse(){
  return function(items) {
    return items.slice().reverse();
  };
};

GlassController.$inject = ['$scope'];

function GlassController($scope){
  var controller ={
    min: 0,
    max: 100,
    values: ["20","15","54"],
    names: ["Sugar","Honey","Water"],
    colors: ["#6B5619", "yellow", "#7ADAFA"],
    hide: true, // Used to show and hide the legend div in index.html
    updateValues: updateValues,
    onGlass: onGlass,
    leaveGlass: leaveGlass,
  };

  $scope.$watchCollection(function(){return controller.values;}, function(newValues, oldValues){
    if((newValues !== null || typeof newValues !== 'undefined') && typeof oldValues !== 'undefined' && newValues != oldValues){
      updateValues(newValues, controller.min, controller.max);
    }
  });

  return controller;

  function updateValues(values, min, max){
    var sum=0;
    for(var i in values){
      sum += parseInt(values[i],10);
    }
    if(sum > max){
      for(var i in values){
        values[i] = Math.floor(values[i] * max/sum);
      }
    }
    controller.values = values;
  }

  function onGlass(e, divId){
    controller.hide = false;
    var left  = (e.clientX + 30)  + "px";
    var top  = e.clientY  + "px";
    var div = document.getElementById(divId);
    div.style.left = left;
    div.style.top = top;
  }

  function leaveGlass(e, divId){
    controller.hide = true;
  }
}
}());
