# Resize This!

Been looking for a basic, light-weight jQuery plugin to allow resizing of DOM elements and couldn't find anything that I found suitable.
Quick and dirty demo [HERE](http://m4nuc.github.io/resizeThis/demo/)


## Instructions
* Add the CSS and JS files to your script (Browserfiy and Require should work)
* Just grab an element with jQuery and Initialize the plugin:

```
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

Fork and PR welcomed!
