( function( $, QUnit ) {

	"use strict";

	var $testCanvas = $( "#testCanvas" );
	var $fixture = null;

	QUnit.test( "hello test", function( assert ) {
		assert.ok( 1 == "1", "Passed!" );
	});

	QUnit.module( "JqButtonRangeSlider", {
		beforeEach: function() {

			// fixture is the element where your jQuery plugin will act
			$fixture = $( "<div/>" );

			$testCanvas.append( $fixture );
		},
		afterEach: function() {

			// we remove the element to reset our plugin job :)
			$fixture.remove();
		}
	} );

	QUnit.test( "is inside jQuery library", function( assert ) {
		assert.equal( typeof $.fn.jqButtonRangeSlider, "function", "has function inside jquery.fn" );
	} );

}( jQuery, QUnit ) );
