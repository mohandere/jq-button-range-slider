### @npm

You can also download npm module from [npm.js](https://www.npmjs.com/package/jq-button-range-slider).

## Features
- Full Responsive.
- String and Interger type value support
- Supports touch-devices (iPhone, iPad, Nexus, etc.).
- Fully customisable/ style as you want

## Demo/Examples

![alt text](https://raw.githubusercontent.com/mohandere/jq-button-range-slider/master/demo/Screenshot.png "Slider demo")

##### [JsFiddle Examples](https://jsfiddle.net/mohandere/2qnk0q04/44/)

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

Add jq-button-range-slider.js before your closing <body> tag, after jQuery (requires jQuery 1.7 +)

```html
<script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="dist/jq-button-range-slider.min.js"></script>
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
	}).on("afterChange", function(e, ui) {

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
<% for (var i = 0; i < sliderOptions.length; i++) { %>
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
$slider.on("afterChange", function(event, ui, slider){
  console.log(ui);
});

```

**init**

**Arguments:** slider

Fires after first initialization.

---

**afterChange**

**Arguments:** event, range, ui, slider

Fires after slider change

<code>values</code> Array of selected values

```javascript
["#0000FF", "#FFFFFF"]
```

<code>ui</code> hash will look like -

```javascript

{
  lb: {
    index: 2, //index of button at lower bound
    value: "#FF0000"
  },
  ub: {
    index: 5, //index of button at upper bound
    value: "#000000"
  }
};

```

---

**reset**

**Arguments:** event, slider

Fires after slider reset to intial values.

---

**destroy**

**Arguments:** event, slider

When slider is destroyed.


## Methods

Methods are called on JqButtonRangeSlider instances through the jqButtonRangeSlider method itself.

```javascript
var $slider = $(".your-element");

// Reset slider
$slider.jqButtonRangeSlider("reset");

//Set new range
$slider.jqButtonRangeSlider("setRange", {
  lb: 20,
  ub: 50
});

```


**destroy**

**Arguments:** none

Destroy current slider

---

**setRange**

**Arguments:** <code>ui</code>

Set new range. <code>ui</code> will be like below with new range

```javascript
{
  "lb": "#FF0000",
  "ub": "#FFFF00"
}

```

---

**reset**

**Arguments:** none

Reset current slider

---

### Go Get It

[Download Now](https://github.com/mohandere/jq-button-range-slider/)

[View on Github](https://github.com/mohandere/jq-button-range-slider/)
