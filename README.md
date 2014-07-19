# Resize This!

Light-weight jQuery plugin to enable resizing of DOM elements. Leverage native CSS resize property when available. Compatible with Browserify (CommonJS) and RequireJS (AMD). [Demo here](http://m4nuc.github.io/resizeThis/demo/).

*Demo page essentially ripped off from: [draggable.js](http://gtramontina.github.io/draggable.js/). Background pattern from [Colorlovers](http://www.colourlovers.com/patterns/search)*

## Instructions
* Add the CSS and JS files to your script (Browserfiy and Require should work)
* Just grab an element with jQuery and Initialize the plugin:

```javascript
var $resizable = $( '#myElement' ).resizeThis();

// Register Event listners like so
$resizable.on( 'rt:start', function() {
    console.log( 'resizing' );
});

$resizable.on( 'rt:stop', function( evt ) {
    console.log( 'stoping' );
});

$resizable.on( 'rt:resizing', function( evt ) {
    console.log( 'resizing' );
});
```

## Options
```javascript
var $resizable = $( '#myElement' ).resizeThis({
    noNative: true, // Forces the plugin to use Javascript Implementation of resize
    minSize: 40, // Positive Integer to represent the minimal height and width that the element can be reiszed to
    maxSize: 40, // Positive Integer to represent the maximal height and width that the element can be reiszed to
});
```

### Options Defaults
```javascript
var defaults = {
    noNative: false,
    minSize: 10,
    maxSize: Number.POSITIVE_INFINITY,
}
```

If you need to override default settings (for instance in a testing environment) you can use the static method:
```javascript
$.fn.resizeThis._setDefaults( newDefaultsObject )
```

### To-do
- Test multiple enviroments
- Test multiple browsers
- Add support for multiple types of handles

## Tests
[HERE](http://m4nuc.github.io/resizeThis/tests/)


# &#9760;&#9760;&#9760;
This code is not throuroughly tested. If you find any issues, please report. I'll address them in a jiffy. Thanks!

