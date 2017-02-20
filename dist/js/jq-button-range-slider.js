/*
 *  jq-button-range-slider - v1.0.0
 *  jQuery range slider plugin with buttons as a values.
 *  https://mohandere.github.io/jq-button-range-slider/
 *
 *  Made by Mohan Dere
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

	"use strict";

		// Create the defaults once
		var pluginName = "jqButtonRangeSlider",
				defaults = {
					className: "yo-button-range-slider",
	      	sliderOptions: [],
		      template: '<% for ( var i = 0; i < sliderOptions.length; i++ ) { %> <button type="button" class="yo-btn yo-range-btn" value="<%=sliderOptions[i].value%>"><%=sliderOptions[i].name%></button><% } %>'
				};

		// The actual plugin constructor
		function JqButtonRangeSlider ( element, options ) {

			this.element = element;
			// future instances of the plugin
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid JqButtonRangeSlider.prototype conflicts
		$.extend( JqButtonRangeSlider.prototype, {

			//Micro-Templating function
			tmpl: function(str, data){
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
		  },

			init: function() {

				if(!this.settings.sliderOptions.length){
		      throw new Error( "JqButtonRangeSlider plugin parameter `sliderOptions` is required!" );
		    }

				//Slider variables
				this.sliderLength = 0;
			  this.sliderMaxIndex = 0; //total element -1
			  this.lastClickedButtonIndex = -9999; //set to unexpected value
			  this.sliderVars = {
			    lowerBound: {
			      index: -1, //value across - lower bound
			    },
			    upperBound: {
			      index: -1, //value across - lower bound
			    }
			  };

				//set length
		    this.sliderLength = this.settings.sliderOptions.length;
		    //calculate max index
    		this.sliderMaxIndex = this.sliderLength - 1;

		    //render slider
		    this.render();

		    return this;
			},

			render: function(){

				//Cache selectors
				this.$el = $( this.element );

				//add default class
				this.$el.addClass( this.settings.className );

				//load html inside element
				this.$el.html( this.tmpl( this.settings.template, {
					sliderOptions: this.settings.sliderOptions
				} ) );

				this.$sliderButtons = this.$el.find( ".yo-range-btn" );
				//bind events on slider
				this.bindEvents();

				this.$el.trigger('yo:init');

    		return this;
			},

			bindEvents: function() {
				this.$sliderButtons.click( (this.rangeBtnClicked).bind(this) );

				this.$el.on( "yo:reset", (function() {
		      this.yoReset();
		    }).bind( this ) );

		    this.$el.on( "yo:destroy", (function() {
		      this.yoDestroy();
		    }).bind( this ) );

			},
			rangeBtnClicked: function (event) {

		    var self = this;
		    var $node = $(event.currentTarget);
		    var index = this.$sliderButtons.index($node);
		    var direction = this.getDirectionToMove(index);
		    switch(direction){
		      case "L":

		        if(this.lastClickedButtonIndex === index ||
		        	this.deActivateBtnAtIndex(index, direction)){
		          index += 1;
		          this.setSliderBounds(index);

		        }else{
		          //if lower limit is not set then set both handle at same index
		          if(!this.isLowerBoundSet()){
		            this.setSliderBounds(index);
		            this.setSliderBounds(index, 1);
		          }else{
		            //if current index is greater than upper limit and direction is L
		            //then set upper limit to index
		            if(index > this.getSliderBounds(1)){
		              this.setSliderBounds(index, 1);
		            }else{
		              this.setSliderBounds(index);
		            }

		          }
		        }


		      break;
		      case "R":

		        if(this.lastClickedButtonIndex === index  ||
		        	this.deActivateBtnAtIndex(index, direction)){
		          index -= 1;
		          this.setSliderBounds(index, 1);
		        }else{
		          //if upper limit is not set then set both handle at same index
		          if(!this.isUpperBoundSet()){
		            this.setSliderBounds(index);
		            this.setSliderBounds(index, 1);
		          }else{
		            //if current index
		            if(index < this.getSliderBounds()){
		              this.setSliderBounds(index);
		            }else{
		              this.setSliderBounds(index, 1);
		            }

		          }
		        }

		      break;
		    }


		    this.highlightsUI();
		    //store last clicked btn index
		    this.lastClickedButtonIndex = index;

		    //check wheather we have to reset slider slider
		    //if there is no any selected buttons then reset
		    var l = this.$el.find( ".yo-range-btn.active" ).length;
		    if(!l){
		      this.reset();
		    }

		    this.$el.trigger( "yo:change", [self.getSliderValue(), self.getSliderRangeValue(), this.$el] );

		    return false;

		  },
		  deActivateBtnAtIndex: function(index, direction){

		    //if button is active and its first in active buttons list - when direction is L
		    //if button is active and its last in active buttons list - when direction is R
		    var l = this.$el.find( ".yo-range-btn.active" ).length, r, overallIndex;
		    if(!l){
		      r = false;
		    }
		    switch(direction){
		      case "L":
	            var $firstActiveBtn = this.$el.find( ".yo-range-btn.active" ).eq(0);
	            overallIndex = this.$sliderButtons.index($firstActiveBtn);
	            r = overallIndex === index;
		        break;
		      case "R":
	            var $lastActiveBtn = this.$el.find( ".yo-range-btn.active" ).eq(l-1);
	            overallIndex = this.$sliderButtons.index($lastActiveBtn);
	            r = overallIndex === index;
		        break;
		    }

		    if(!r){
		      r = false;
		    }
		    return r;

		  },
		  highlightsUI: function(){

		    this.$sliderButtons.removeClass( "active" );
		    for (var i = this.sliderVars.lowerBound.index;
		    	i <= this.sliderVars.upperBound.index; i++) {
		      this.$sliderButtons.eq(i).addClass( "active" );
		    }
		  },
		  isLowerBoundSet: function () {
		    return this.sliderVars.lowerBound.index > -1;
		  },
		  isUpperBoundSet: function () {
		    return this.sliderVars.upperBound.index > -1;
		  },
		  getSliderRangeValue: function(){

		    var lv = this.$sliderButtons.eq(this.sliderVars.lowerBound.index).attr( "value" );
		    var uv = this.$sliderButtons.eq(this.sliderVars.upperBound.index).attr( "value" );
				var r = {
				  "lb": {
				    index: this.sliderVars.lowerBound.index,
				    value: lv,
				  },
				  "ub": {
				    index: this.sliderVars.upperBound.index,
				    value: uv,
				  }
				};
		    return r;
		  },
		  getSliderValue: function(){
		    var r = [];
		    this.$el.find( ".yo-range-btn.active" ).each(function(index, el) {
		       r.push($(el).val());
		    });
		    return r;
		  },

			getDirectionToMove: function (goal) {

		    var sliderLimits = [0, this.sliderMaxIndex];
		    //now after selection the slider middle will be move
		    if(this.isLowerBoundSet() && this.isUpperBoundSet() ){
		      sliderLimits = [this.getSliderBounds(), this.getSliderBounds(1)];
		    }
		    var closest = sliderLimits.reduce(function (prev, curr) {
		      return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
		    });
		    return (closest === sliderLimits[1]) ? "R" : "L";
		  },
		  getSliderBounds: function (isUpper) {
		    if(isUpper){
		      return this.sliderVars.upperBound.index;
		    }else{
		      return this.sliderVars.lowerBound.index;
		    }
		  },

		  //Set slider values on selection
		  setSliderBounds: function (newIndex, isUpper) {
		    if(isUpper){
		      this.sliderVars.upperBound.index = newIndex;
		    }else{
		      this.sliderVars.lowerBound.index = newIndex;
		    }
		  },

		  //Plugins internal methods
		  //Exposed to users
		  yoReset: function(){
		    this.setSliderBounds(-9999);
		    this.setSliderBounds(-9999, 1);
		    this.highlightsUI();
		    //store last clicked btn index
		    this.lastClickedButtonIndex = -9999;
		  },
			//destroy current slider instance
			yoDestroy: function(){
				$.data(this.element, 'jqButtonRangeSlider', null);
				this.$el.unbind();
				this.$el.html('');
			},

			//set new upper and lower bound
			yoSetRange: function(uiHash){

				var self = this;

				if( !uiHash.lb ){
					throw new Error( "JqButtonRangeSlider plugin yoSetRange method `lb` is required!" );
				}
				if( !uiHash.ub ){
					throw new Error( "JqButtonRangeSlider plugin yoSetRange method `ub` is required!" );
				}

				//check if lb and ub is valid or not
				$.each( this.settings.sliderOptions, function ( index, option ){
					if( option.value === uiHash.lb ){
						self.sliderVars.lowerBound.index = index;
						self.sliderVars.lowerBound.value = uiHash.lb;
					}
					if( option.value === uiHash.ub ){
						self.sliderVars.upperBound.index = index;
						self.sliderVars.upperBound.value = uiHash.ub;
					}

				});

				//set last clicked button as a upper one
				this.lastClickedButtonIndex = this.sliderVars.upperBound.index;
				//get indices of new lower and uper bound
				this.highlightsUI();
			},

		} );

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
        var args = arguments;

        // Is the first parameter an object (options), or was omitted,
        // instantiate a new instance of the plugin.
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {

                // Only allow the plugin to be instantiated once,
                // so we check that the element has no plugin instantiation yet
                if (!$.data(this, 'plugin_' + pluginName)) {

                    // if it has no instance, create a new one,
                    // pass options to our plugin constructor,
                    // and store the plugin instance
                    // in the elements jQuery data object.
                    $.data(this, 'plugin_' + pluginName, new JqButtonRangeSlider( this, options ));
                }
            });

        // If the first parameter is a string and it doesn't start
        // with an underscore or "contains" the `init`-function,
        // treat this as a call to a public method.
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

            // Cache the method call
            // to make it possible
            // to return a value
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);

                // Tests that there's already a plugin-instance
                // and checks that the requested public method exists
                if (instance instanceof JqButtonRangeSlider && typeof instance[options] === 'function') {

                    // Call the method of our plugin instance,
                    // and pass it the supplied arguments.
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }

                // Allow instances to be destroyed via the 'destroy' method
                if (options === 'destroy') {
                  $.data(this, 'plugin_' + pluginName, null);
                }
            });

            // If the earlier cached method
            // gives a value back return the value,
            // otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
    };


} )( jQuery, window, document );
