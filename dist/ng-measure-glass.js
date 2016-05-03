'use strict';
(function(){

  var ui = {};
  /**
    * Constructor
    */
  var Glass = function(element, values, min, max, colors){
    this.element = element;
    this.values = [];
    for(var i in values){
      this.values.push(parseInt(values[i],10));
    }
    this.min = min;
    this.max = max;
    this.colors = colors;
    this.svg;
    this.svgGroup;
    this.width;
    this.height;
    this.glass;
    this.liquids;
    this.liquidsText;
  };

  Glass.prototype.valueToHeight = function(value,max){
    return this.height * (value/max);
  };

  Glass.prototype.calculateLiquidsData = function(){
    var data = [];
    var currentTop = this.height;
    for(var i in this.values){
      currentTop -= this.valueToHeight(this.values[i], this.max);
      data.push({
        'x': 0,
        'y': currentTop,
        'width': this.width*0.7,
        'height': this.valueToHeight(this.values[i], this.max),
        'rx': this.width * 0.02,
        'value': this.values[i],
      });
    }
    return data;
  }

  Glass.prototype.makeValid = function(values, min, max){
    var v = [], sum=0;
    for(var i in values){
      sum += values[i];
    }
    if(sum > max){
      for(var i in values){
        values[i] = Math.floor(values[i] * max/sum);
      }
    }
    return values;
  };

  Glass.prototype.createMainComponents = function(){
    this.svg = d3.select(this.element)
    .append('svg')
    .attr({
      "width": '100%',
      "height": '100%'
    });
    this.width = parseInt(this.svg.style("width"),10);
    this.height = parseInt(this.svg.style("height"),10);

    this.svgGroup = this.svg.append('g');
  };

  Glass.prototype.drawLiquid = function(parent,  label, data, style){
    var elem = parent.append('rect')
    .attr('id', label)
    .attr(data)
    .attr("transform", "translate(" + this.width*0.15 + ", 0)")
    .style(style)
    return elem;
  };

  Glass.prototype.drawLiquidText = function(parent, label, data){
    var fontSize = (this.width*0.1) + "px",
    text = "";
    if(data.value > this.max*0.075) text = data.value;

    var elem = parent.append('text')
    .attr('id', label)
    .attr('x', this.width/2)
    .attr('y', data.y + data.height/2)
    .attr('text-anchor','middle')
    .attr('font-size', fontSize)
    .style('fill', '#1A1A1A')
    .text(text);

    return elem;
  };

  Glass.prototype.drawLiquids = function(parent, data, colors){
    //var that = this;
    var elements = [],
    label = 'liquid'+i;
    for(var i in data){
     elements.push(this.drawLiquid(parent, label, data[i],  { "fill": colors[i]}));
    }
    return elements;
  };

  Glass.prototype.drawLiquidsText = function(parent, data){
    var elements = [],
    label = 'liquidText'+i;
    for(var i in data){
     elements.push(this.drawLiquidText(parent, label, data[i]));
    }
    return elements;
  };

  Glass.prototype.drawGlassContainer = function(parent, label){
    var data = [
      //Left border
      "M " + this.width*0.1  + "," + (-this.height*0.14) +
      "Q " + this.width*0.15 + "," + (-this.height*0.1)  + " " + this.width*0.15 + "," + (-this.height*0.05) +
      // Body
      "L " + this.width*0.15 + "," + this.height*0.9 +
      "Q " + this.width*0.15 + "," + this.height + " " + this.width*0.2 + "," + this.height +
      "L " + this.width*0.8  + "," + this.height +
      "Q " + this.width*0.85 + "," + this.height + " " + this.width*0.85 + "," + this.height*0.9 +
      // Right border
      "L " + this.width*0.85  + "," + (-this.height*0.05) +
      "Q " + this.width*0.85  + "," + (-this.height*0.1)  + " " + this.width*0.9 + "," + (-this.height*0.14)


    ];
    var elem = parent.append('path')
    .attr('id', label)
    .attr('d', data)
    .style('stroke-width', this.width*0.03) // .attr("stroke-width", 16)
    .style('stroke', '#16a085') // .attr("stroke", '#16a085')
    .style('fill', 'none') // .attr("fill", 'none')
    .style('stroke-linecap','round'); //.attr("stroke-linecap","round");
    return elem;
  };

  Glass.prototype.drawMarkers = function(parent, label){
    var fontSize = (this.width*0.1) + "px";
    // Max marker
    parent.append('text')
    .attr('id', label)
    .attr('text-anchor','end')
    .attr('font-size', fontSize)
    .attr('transform','translate(' + this.width/8 + ',' + this.height*0.03 + ')')
    .text(this.max + "-");
    // Middle marker
    parent.append('text')
    .attr('id', label)
    .attr('text-anchor','end')
    .attr('font-size', fontSize)
    .attr('transform','translate(' + this.width/8 + ',' + this.height/1.9 + ')')
    .text(this.max/2 + "-");
    // Min marker
    parent.append('text')
    .attr('id', label)
    .attr('text-anchor','end')
    .attr('font-size', fontSize)
    .attr('transform','translate(' + this.width/8 + ',' + this.height + ')')
    .text(this.min + "-");
  }

  Glass.prototype.drawComponents = function(){
    var data = this.calculateLiquidsData();

    this.liquids = this.drawLiquids(this.svgGroup, data, this.colors);
    this.liquidsText = this.drawLiquidsText(this.svgGroup, data);

    this.glassContainer = this.drawGlassContainer(this.svgGroup, 'glassContainer');
    this.glassMarkers = this.drawMarkers(this.svgGroup, 'glassMarkers');
    this.animate(this.min);

    //this.svgGroup.append('rect').attr({'x': 0, 'y': 0, 'width': this.width, 'height': this.height}).style({'stroke-width': 2, 'stroke': 'black', 'fill': 'none'}); // reference frame
    //this.svgGroup.attr("transform", "scale(0.5) translate(" + this.width/2 + "," + this.height/2 + ")"); // Scale to half
    this.svgGroup.attr("transform", "scale(0.75) translate(" + this.width*0.2 + "," + this.height*0.25 + ")");
  }

  Glass.prototype.draw = function(update){
    d3.select(this.element).select('svg').remove();
    var that = this;
    that.values = that.makeValid(that.values, that.min, that.max);
    that.createMainComponents();
    that.drawComponents();
  }

  Glass.prototype.setValues = function(newValues){
    this.values = [];
    for(var i in newValues){
      this.values.push(parseInt(newValues[i],10));
    }
    this.values = this.makeValid(this.values, this.min, this.max);
    this.animate(this.max*0.95);
  };

  Glass.prototype.setColors = function(newColors){
    this.colors = newColors;
    for(var i in this.liquids){
      this.liquids[i].style('fill', this.colors[i]);
    }

  };

  Glass.prototype.animate = function(bottom){
    var that = this;
    that.svgGroup.transition().ease("elastic").duration(3000).tween('',function(){
      var i = d3.interpolate(bottom, that.max);
      return function(t){
        var val = i(t);
        var currentTop = that.height;
        for(var l in that.liquids){
          currentTop -= that.valueToHeight(that.values[l]*(val/that.max), that.max);
          var data = {
            'x': 0,
            'y': currentTop,
            'width': that.width*0.7,
            'height': that.valueToHeight(that.values[l]*(val/that.max), that.max),
            'rx': that.width * 0.02,
            'value': that.values[l],
          };
          that.liquids[l].attr(data);
          //console.log("data.value: " + data.value + "\nthis.max: " + that.max + "\nthis.max*0.075 = " + that.max*0.075 );
          if(Math.floor(data.value) > that.max*0.075) that.liquidsText[l].text(Math.floor(data.value));
          else that.liquidsText[l].text("");
          that.liquidsText[l].attr('y', (data.y + data.height/2));
        }
      }
    });
  };

  ui.Glass = Glass
  ui.MeasureGlassDirective = function(){
    return {
      restrict: 'E',
      scope: {
        values: '=',
        colors: '=',
        min: '=',
        max: '='
      },

      link: function(scope, element){
        scope.values = scope.values || [];
        scope.min = scope.min || 0;
        scope.max = scope.max || 100;
        scope.colors = scope.colors || [];

        var glass = new ui.Glass(element[0], scope.values, scope.min, scope.max, scope.colors);

        scope.$watchCollection('values', function(newValues, oldValues){
          if((newValues !== null || typeof newValues !== 'undefined') && typeof oldValues !== 'undefined' && newValues != oldValues){
            glass.setValues(newValues);
          }
        });

        scope.$watchCollection('colors', function(newColors, oldColors){
          if((newColors !== null || typeof newColors !== 'undefined') && typeof oldColors !== 'undefined' && newColors != oldColors){
            glass.setColors(newColors);
          }
        });

        var drawGlass = function(){
          glass.draw(function(values, colors) {
            scope.$apply(function() {
              scope.values = values;
              scope.colors = colors;
            });
          });
        };

        drawGlass();
      }
    };
  }

  angular.module('ui.measureGlass',[]).directive('uiMeasureGlass', ui.MeasureGlassDirective);
})();
