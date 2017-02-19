## Jquery Button Range Slider plugin

### Features
- Full Responsive. 
- Scales with its container.
- String | Interger value support
- Fully customisable


### Demo


### Usage
## Getting Started
Set up your HTML markup.
```
<div id="slider"></div>
```
---
Move the dist/jq-button-range-slider folder into your project
---
Add dist/jq-button-range-slider.css in your <head>
```
<link rel="stylesheet" type="text/css" href="dist/jq-button-range-slider.css"/>
```
OR copy and paste follwing css in your <head>
```css
.yo-button-range-slider{
	display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
	display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
	display: -ms-flexbox;      /* TWEENER - IE 10 */
	display: -webkit-flex;     /* NEW - Chrome */
	display: flex;
}
.yo-btn {
  padding: 4px 16px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-radius: 0;
  background: #fff;
  white-space: nowrap;
}


.yo-btn:last-child {
	border-right: 1px solid #e0e0e0;
}

.touch .yo-btn{
	white-space: normal;
}


@media screen and (max-width: 767px) {
  .yo-btn {
    font-size: 12px;
  }
}

.yo-range-btn.active{
  background: lightgray;
}
.yo-range-btn:focus,
.yo-range-btn.active{
  box-shadow: none;
  outline: 0 none !important;
}

```

### Settings
