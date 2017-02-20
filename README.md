## Features
- Full Responsive.
- Scales with its container.
- String and Interger type value support
- Supports touch-devices (iPhone, iPad, Nexus, etc.).
- Fully customisable

## Demo

![alt text](https://raw.githubusercontent.com/mohandere/jq-button-range-slider/master/demo/Screenshot.png "Slider demo")

##### JsFiddle -

## Getting Started
Set up your HTML markup.
```html
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

```html
<script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="jq-button-range-slider/jq-button-range-slider.min.js"></script>
```

Initialize your slider in your script file or an inline script tag

```javascript
//Initialize when document is ready
$(document).ready(function(){

	var $slider = $("#slider");
	$slider.jqButtonRangeSlider({
		sliderOptions: [{
			name: "Calcium",
			value: 20
		},{
			name: "Carbon",
			value: 6
		},{
			name: "Gold",
			value: 79
		},{
			name: "Hydrogen",
			value: 1
		},{
			name: "Mercury",
			value: 80
		},{
			name: "	Oxygen",
			value: 8
		},{
			name: "Zinc",
			value: 30
		},{
			name: "Titanium",
			value: 22
		}]
	}).on( "yo:change", function(e, ui) {

		$("#lb").text(ui.lb.value);
		$("#ub").text(ui.ub.value);

		//Fetch products within given range from server
		//Do ajax
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
```javascript
[
	{
	  name: "WHITE",
	  value: "#FFFFFF"
	},{
	  name: "BLACK",
	  value: "#000000"
	},{
	  name: "RED",
	  value: "#FF0000"
	},{
	  name: "White",
	  value: "#fff"
	},{
	  name: "YELLOW",
	  value: "#FFFF00"
	},{
	  name: "GREEN",
	  value: "#008000"
	},{
	  name: "BLUE",
	  value: "#0000FF"
	}
]

```

---

**template**

**Type:** string

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

**Default:** <code>yo-button-range-slider</code>

html class for slider

## Events

Use them as shown below:

```javascript
var $slider = $(".your-element");
// On change event
$slider.on("yo:change", function(event, ui, slider){
  console.log(ui);
});

```

**yo:init**

**Arguments:** event, slider

Fires after first initialization.

---

**yo:change**

**Arguments:** event, range, ui, slider

Fires after slider change

<code>values</code> Array of selected values

```javascript
["#0000FF", "#FFFFFF"]
```

<code>ui</code> hash will look like -

```javascript

{
  "lb": {
    index: 2, //index of button at lower bound
    value: "#FF0000"
  },
  "ub": {
    index: 5, //index of button at upper bound
    value: "#000000"
  }
};

```



## Methods

Methods are called on slick instances through trigger:

```javascript
var $slider = $(".your-element");
// Reset slider
$slider.trigger( "yo:reset" );

```


**yo:destroy**

**Arguments:** none

Destroy current slider

---

**yo:reset**

**Arguments:** none

Reset current slider

---

### Go Get It

[Download Now](https://github.com/mohandere/jq-button-range-slider/)
