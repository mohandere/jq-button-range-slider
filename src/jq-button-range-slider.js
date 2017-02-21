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

          _.render(true);

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


    JqButtonRangeSlider.prototype.render = function(creation){
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

    JqButtonRangeSlider.prototype.slideHandler = function(e){

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