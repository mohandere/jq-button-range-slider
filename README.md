## Features
- Full Responsive. 
- Scales with its container.
- String and Interger type value support
- Fully customisable

## Demo

## Getting Started
Set up your HTML markup.
```ahtml
<div id="slider"></div>
```

---

Move the dist/jq-button-range-slider folder into your project

---

Add dist/jq-button-range-slider.css in your ```<head>```

```css
<link rel="stylesheet" type="text/css" href="dist/jq-button-range-slider.css"/>
```
or copy and paste the css from `dist/jq-button-range-slider.css` in your main file

---

Add slick.js before your closing <body> tag, after jQuery (requires jQuery 1.7 +)
```
<script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="jq-button-range-slider/jq-button-range-slider.min.js"></script>
```

Initialize your slider in your script file or an inline script tag
```
$(document).ready(function(){
	$("#slider").jqButtonRangeSlider({
		sliderOptions: [{
			name: 'Calcium',
			value: 20
		},{
			name: 'Carbon',
			value: 6
		},{
			name: 'Gold',
			value: 79
		},{
			name: 'Hydrogen',
			value: 1
		},{
			name: 'Mercury',
			value: 80
		},{
			name: '	Oxygen',
			value: 8
		},{
			name: 'Zinc',
			value: 30
		},{
			name: 'Titanium',
			value: 22
		}]
	}).on( 'yo:change', function(e, ui) {
		$('#lb').text(ui.lb.value);
		$('#ub').text(ui.ub.value);
	});
	
});

```

> NOTE: I highly recommend putting your initialization script in an external JS file.


## Settings

**sliderOptions**

**Type:** array

**Default:** []

Array of objects with `name` and `value` per slider option/button

**Example:**
```
[
	{
	  name: 'WHITE',
	  value: '#FFFFFF'
	},{
	  name: 'BLACK',
	  value: '#000000'
	},{
	  name: 'RED',
	  value: '#FF0000'
	},{
	  name: 'White',
	  value: '#fff'
	},{
	  name: 'YELLOW',
	  value: '#FFFF00'
	},{
	  name: 'GREEN',
	  value: '#008000'
	},{
	  name: 'BLUE',
	  value: '#0000FF'
	}
]

```

---

**template**

**Type:** string (html)

**Default:** 

```
<% for ( var i = 0; i < sliderOptions.length; i++ ) { %> 
<button type="button" class="yo-btn yo-range-btn" value="<%=sliderOptions[i].value%>">
<%=sliderOptions[i].name%>
</button>
<% } %>
```

JavaScript micro template for rendering button html

More on [JavaScript Micro-Templating](http://ejohn.org/blog/javascript-micro-templating/)

---

**className**

**Type:** string

**Default:** yo-button-range-slider

html class for slider 
