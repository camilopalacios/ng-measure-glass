ng-measure-glass
=============

> Angular.js directive to draw a measure glass component powered by d3.js

![screenshot](https://raw.githubusercontent.com/camilopalacios/ng-measure-glass/master/img/glass.png)

Features
-------
- very easy to implement
- without jQuery dependencies
- powered by d3.js
- 2-way data binding
- configurable minimum, maximum, values, names and colors
- animated
- configurable scale

#### Dependencies

- AngularJS (tested with 1.4.x)
- D3.js (tested with 3.5.x)

#### Browser Support

- Chrome, Firefox, Safari, Opera, IE9+

Get started
-------

#### Installation
You can also use bower to install the component:
```bash
$ bower install ng-measure-glass --save
```


#### Usage

###### HTML:
```html
<html ng-app="MeasureGlassApp">
<body ng-controller="GlassController as glassCtrl">
  <div>
    <label for="bar2">Value:</label>
    <input name="bar2" type="range" ng-attr-min="{{glassCtrl.min}}" ng-attr-max="{{glassCtrl.max}}" ng-model="glassCtrl.values[0]">
    <label for="name2">Name:</label>
    <input type="text" ng-model="glassCtrl.names[0]">
    <label for="color2">Color:</label>
    <input type="text" ng-model="glassCtrl.colors[0]">
  </div>
  <div>
    <ui-gauge value="gaugeCtrl.value" intervals="gaugeCtrl.intervals" options="gaugeCtrl.options"></ui-gauge>
  </div>
</body>

<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.10/d3.min.js"></script>
<script src="bower_components/ng-gauge/dist/ng-measure-glass.min.js"></script>
...
</html>
```
###### Angular.js:

```javascript
angular
  .module('MeasureGlassApp', ['ui.measureGlass'])
  .controller('GlassController', GlassController);

function GlassController($scope){
  var controller ={
    min: 0,
    max: 100,
    values: ["20","15","54"],
    names: ["Sugar","Honey","Water"],
    colors: ["#6B5619", "yellow", "#7ADAFA"],
  };

  return controller;
}
```

License
-------

Licensed under the MIT license
