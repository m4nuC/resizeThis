# Resize This!

Been looking for a basic, light-weight jQuery plugin to allow resizing of DOM elements. Leverage native CSS resize property if available.
Demo [HERE](http://m4nuc.github.io/resizeThis/demo/) (essentially riped off: [draggable.js](http://m4nuc.github.io/resizeThis/demo/), and Colorlovers [awesome patterns](http://www.colourlovers.com/patterns/search))

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
});
```

If you need to override default settings (for instance in a testing environment) you can use the static method:
```javascript
$.fn.resizeThis._setDefaults( newDefaultsObject )
```


### To-od
- Test multiple enviroments
- Test multiple browsers
- Add support for multiple types of handles
- Handle case where element has not `postion` property

# Tests
[HERE](http://m4nuc.github.io/resizeThis/tests/)

PR very much welcomed (but please stick to jQuery styling guide)
