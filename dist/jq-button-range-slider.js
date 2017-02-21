/*
 *  jq-button-range-slider - v1.0.0
 *  jQuery range slider plugin with buttons as a values.
 *  https://mohandere.github.io/jq-button-range-slider/
 *
 *  Made by Mohan Dere
 *  Under MIT License
 */
/*!
 * jq-button-range-slider 1.0.0
 * https://mohandere.github.io/jq-button-range-slider/
 * @license MIT licensed
 *
 * Copyright (C) 2017 geekymohan.wordpress.com - A project by Mohan Dere
 */


/* global window, document, define, jQuery */
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var JqButtonRangeSlider = window.JqButtonRangeSlider || {};

    JqButtonRangeSlider = (function() {

      var instanceUid = 0;

      function JqButtonRangeSlider(element, settings) {

          var _ = this;

          _.isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);

          _.defaults = {
              className: "yo-button-range-slider",
              sliderOptions: [],
              template: '<% for ( var i = 0; i < sliderOptions.length; i++ ) { %> <button type="button" class="yo-btn yo-range-btn" value="<%=sliderOptions[i].value%>"><%=sliderOptions[i].name%></button><% } %>',
          };

          _.options = $.extend({}, _.defaults, settings);

          _.$el = $(element);
          _.$sliderButtons = null;

          //Slider variables
          _.lastClickedButtonIndex = -9999; //set to unexpected value

          //set lower and upper bound
          _.sliderVars = {
            lowerBound: { index: -1 }, upperBound: { index: -1 }
          };
          //set length
          _.sliderLength = _.options.sliderOptions.length;
          //calculate max index
          _.sliderMaxIndex = _.sliderLength - 1;

          _.instanceUid = instanceUid++;

          _.render();

      }
      return JqButtonRangeSlider;

    }());

    //Micro-Templating function
    JqButtonRangeSlider.prototype.tmpl = function(str, data){

      // Figure out if we're getting a template, or if we need to
      // load the template - and be sure to cache the result.
      var fn = !/\W/.test(str) ?
        cache[str] = cache[str] ||
          tmpl(document.getElementById(str).innerHTML) :

        // Generate a reusable function that will serve as a template
        // generator (and which will be cached).
        new Function("obj",
          "var p=[],print=function(){p.push.apply(p,arguments);};" +

          // Introduce the data as local variables using with(){}
          "with(obj){p.push('" +

          // Convert the template into pure JavaScript
          str
            .replace(/[\r\t\n]/g, " ")
            .split("<%").join("\t")
            .replace(/((^|%>)[^\t]*)'/g, "$1\r")
            .replace(/\t=(.*?)%>/g, "',$1,'")
            .split("\t").join("');")
            .split("%>").join("p.push('")
            .split("\r").join("\\'") + "');}return p.join('');");

      // Provide some basic currying to the user
      return data ? fn( data ) : fn;
    };


    JqButtonRangeSlider.prototype.render = function(){
      var _ = this;
      //add default class
      _.$el.addClass(_.options.className);

      //load html inside element
      _.$el.html( _.tmpl(_.options.template, {
        sliderOptions: _.options.sliderOptions
      }));

      _.$sliderButtons = _.$el.find(".yo-range-btn");
      //bind events on slider
      _.$sliderButtons
        //When slider button clicked
        .click(_.slideHandler);

      _.$el
        //when resizing the site, we adjust the heights of the sections, slimScroll...
        .resize(_.resizeHandler);
    };

    JqButtonRangeSlider.prototype.slideHandler = function(event){

      var _ = this;
      var $node = $(event.currentTarget);
      var index = _.$sliderButtons.index($node);
      var direction = _.getDirectionToMove(index);

      switch (direction) {
        case "L":
          if (_.lastClickedButtonIndex === index ||
            _.deActivateBtnAtIndex(index, direction)) {
            index += 1;
            _.setSliderBounds(index);

          } else {
            //if lower limit is not set then set both handle at same index
            if (!_.isLowerBoundSet()) {
              _.setSliderBounds(index);
              _.setSliderBounds(index, 1);
            } else {
              //if current index is greater than upper limit and direction is L
              //then set upper limit to index
              if (index > _.getSliderBounds(1)) {
                _.setSliderBounds(index, 1);
              } else {
                _.setSliderBounds(index);
              }

            }
          }
          break;
        case "R":

          if (_.lastClickedButtonIndex === index ||
            _.deActivateBtnAtIndex(index, direction)) {
            index -= 1;
            _.setSliderBounds(index, 1);
          } else {
            //if upper limit is not set then set both handle at same index
            if (!_.isUpperBoundSet()) {
              _.setSliderBounds(index);
              _.setSliderBounds(index, 1);
            } else {
              //if current index
              if (index < _.getSliderBounds()) {
                _.setSliderBounds(index);
              } else {
                _.setSliderBounds(index, 1);
              }

            }
          }

          break;
      }
      _.highlightsUI();
      //store last clicked btn index
      _.lastClickedButtonIndex = index;
      //check wheather we have to reset slider slider
      //if there is no any selected buttons then reset
      var l = _.$el.find(".yo-range-btn.active").length;
      if (!l) {
        _.reset();
      }
      _.$el.trigger("yo:change", [_.getSliderValue(), _.getSliderRangeValue(), _.$el]);
      return false;
    };

    JqButtonRangeSlider.prototype.getDirectionToMove = function(goal){
      var _ = this;
      var sliderLimits = [0, _.sliderMaxIndex];
      //now after selection the slider middle will be move
      if(_.isLowerBoundSet() && _.isUpperBoundSet() ){
        sliderLimits = [_.getSliderBounds(), _.getSliderBounds(1)];
      }
      var closest = sliderLimits.reduce(function (prev, curr) {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
      });
      return (closest === sliderLimits[1]) ? "R" : "L";
    };

    JqButtonRangeSlider.prototype.deActivateBtnAtIndex = function(index, direction) {

      var _ = this;
      //if button is active and its first in active buttons list - when direction is L
      //if button is active and its last in active buttons list - when direction is R
      var l = _.$el.find(".yo-range-btn.active").length,
        r, overallIndex;
      if (!l) {
        r = false;
      }
      switch (direction) {
        case "L":
          var $firstActiveBtn = _.$el.find(".yo-range-btn.active").eq(0);
          overallIndex = _.$sliderButtons.index($firstActiveBtn);
          r = overallIndex === index;
          break;
        case "R":
          var $lastActiveBtn = _.$el.find(".yo-range-btn.active").eq(l - 1);
          overallIndex = _.$sliderButtons.index($lastActiveBtn);
          r = overallIndex === index;
          break;
      }
      if (!r) {
        r = false;
      }
      return r;
    };

    JqButtonRangeSlider.prototype.highlightsUI = function(){
      var _ = this;
      _.$sliderButtons.removeClass( "active" );
      for (var i = _.sliderVars.lowerBound.index;
        i <= _.sliderVars.upperBound.index; i++) {
        _.$sliderButtons.eq(i).addClass( "active" );
      }
    };

    JqButtonRangeSlider.prototype.isLowerBoundSet = function(){
      var _ = this;
      return _.sliderVars.lowerBound.index > -1;
    };
    JqButtonRangeSlider.prototype.isUpperBoundSet = function(){
      var _ = this;
      return _.sliderVars.upperBound.index > -1;
    };

    JqButtonRangeSlider.prototype.getSliderRangeValue = function(){
      var _ = this;
      var lv = _.$sliderButtons.eq(_.sliderVars.lowerBound.index).attr("value");
      var uv = _.$sliderButtons.eq(_.sliderVars.upperBound.index).attr("value");
      var r = {
        "lb": {
          index: _.sliderVars.lowerBound.index,
          value: lv,
        },
        "ub": {
          index: _.sliderVars.upperBound.index,
          value: uv,
        }
      };
      return r;
    };

    JqButtonRangeSlider.prototype.getSliderValue = function() {

      var _ = this;
      var r = [];
      _.$el.find(".yo-range-btn.active").each(function(index, el) {
        r.push($(el).val());
      });
      return r;
    };

    JqButtonRangeSlider.prototype.getSliderBounds = function(isUpper) {
      var _ = this;
      if (isUpper) {
        return _.sliderVars.upperBound.index;
      } else {
        return _.sliderVars.lowerBound.index;
      }
    };

    JqButtonRangeSlider.prototype.setSliderBounds = function(newIndex, isUpper) {
      var _ = this;
      if (isUpper) {
        _.sliderVars.upperBound.index = newIndex;
      } else {
        _.sliderVars.lowerBound.index = newIndex;
      }
    };

    //Plugins internal methods
    //Exposed to users
    JqButtonRangeSlider.prototype.reset = function() {
      var _ = this;
      _.setSliderBounds(-9999);
      _.setSliderBounds(-9999, 1);
      _.highlightsUI();
      //store last clicked btn index
      _.lastClickedButtonIndex = -9999;
    };

    //destroy current slider instance
    JqButtonRangeSlider.prototype.destroy = function() {
      var _ = this;
      $.data(_.$el, 'jqButtonRangeSlider', null);
      _.$el.unbind();
      _.$el.html('');
    };

    //set new upper and lower bound
    JqButtonRangeSlider.prototype.setRange = function(uiHash) {

      var _ = this;
      //check if lb and ub is valid or not
      $.each(_.settings.sliderOptions, function(index, option) {
        if (option.value === uiHash.lb) {
          _.sliderVars.lowerBound.index = index;
          _.sliderVars.lowerBound.value = uiHash.lb;
        }
        if (option.value === uiHash.ub) {
          _.sliderVars.upperBound.index = index;
          _.sliderVars.upperBound.value = uiHash.ub;
        }
      });
      //set last clicked button as a upper one
      _.lastClickedButtonIndex = _.sliderVars.upperBound.index;
      //get indices of new lower and uper bound
      _.highlightsUI();
    };

    JqButtonRangeSlider.prototype.resizeHandler = function(e){

    };




    $.fn.jqButtonRangeSlider = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].jqButtonRangeSlider = new JqButtonRangeSlider(_[i], opt);
            else
                ret = _[i].jqButtonRangeSlider[opt].apply(_[i].jqButtonRangeSlider, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));