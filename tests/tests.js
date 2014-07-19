var fix;

// Changes static defaults
$.fn.resizeThis._setDefaults({ noNative: true })


// Smoke Test
QUnit.test( "Plugin namespace exists", function( assert ) {
    assert.ok( $('#idontexist').resizeThis );
});

// Init Test
QUnit.module( "Initialize", {
    setup: function() {
        fix = createFix('div', 'resizeMe');
    },
    teardown: function() {
        removeFix( fix );
    }
});

    QUnit.test( "should add CSS resize property to element if CSS supports it", function( assert ) {
        $('#resizeMe').resizeThis({ noNative: false });
        assert.notEqual( fix.style.resize, '' );
    });

    QUnit.test( "should inject handle as a child of the element if Native is not supported or no allowed", function( assert ) {
        $('#resizeMe').resizeThis();
        assert.ok( $('#resizeMe > .rt-handle').length > 0 );
    });

    QUnit.test( "should add a relative position attribute on the element if not already defined", function( assert ) {
        var $el = $('#resizeMe').resizeThis();
        assert.equal( $el.css('position'), 'relative' );
    });


// Core Tests
QUnit.module( "Resize Element", {
    setup: function() {
        fix = createFix('div', 'resizeMe');
    },
    teardown: function() {
        removeFix( fix );
        $( document ).trigger( "mouseup" )
    }
});

    QUnit.test( "should NOT change clicked element size on drag from element itself", function( assert ) {
        var $el = $('#resizeMe').resizeThis();
        var oW = $el.innerWidth();
        var oH = $el.innerHeight();
        var e = $.Event('mousedown');
        e.pageX = 10;
        e.pageY = 10;
        $el.trigger( e );

        var e2 = $.Event('mousemove');
        e2.pageX = 100;
        e2.pageY = 100;
        $( document ).trigger( e2 );

        assert.ok( oW === $el.innerWidth() );
    });

    QUnit.test( "should change start resize when handle is clicked and mouse moves", function( assert ) {
        var $el = $( '#resizeMe' ).resizeThis();
        var oW = $el.innerWidth();
        var oH = $el.innerHeight();
        var e = $.Event( 'mousedown' );
        e.pageX = 10;
        e.pageY = 10;
        $el.find( '.rt-handle' ).trigger( e );

        var e2 = $.Event( 'mousemove' );
        e2.pageX = 100;
        e2.pageY = 100;
        $( document ).trigger( e2 );

        assert.ok( oW !== $el.innerWidth() );
    });

    QUnit.test( "should not let size be smaller than the options minSize value", function( assert ) {
        var $el = $( '#resizeMe' ).css({ width: 100, height: 100 }).resizeThis({ minSize: 12 });
        var e = $.Event( 'mousedown' );
        e.pageX = 10;
        e.pageY = 10;
        $el.find( '.rt-handle' ).trigger( e );

        var e2 = $.Event( 'mousemove' );
        e2.pageX = -100;
        e2.pageY = -100;
        $( document ).trigger( e2 );
        console.log($el.innerWidth());
        
        assert.ok( $el.innerWidth() == 12 );
    });


// Events Tests
var called = false;
QUnit.module( "Events", {
    setup: function() {
        fix = createFix( 'div', 'resizeMe' );
    },
    teardown: function() {
        removeFix( fix );
        called = false;
        $( document ).trigger( "mouseup" )
    }
});

    QUnit.test( "should trigger a rt:start event when resizing stops", function( assert ) {
        var $el = $( '#resizeMe' ).resizeThis();
        var e = $.Event( 'mousedown' );
        e.pageX = 10;
        e.pageY = 10;
        // Register a spy callback
        $el.on( 'rt:start', function() {
            called = true;
        })

        $el.find( '.rt-handle' ).trigger( e );

        assert.ok( called );
    });

    QUnit.test( "should trigger a rt:stop event when resizing ends", function( assert ) {
        var $el = $( '#resizeMe' ).resizeThis();
        var e = $.Event( 'mousedown' );
        e.pageX = 10;
        e.pageY = 10;
        // Register a spy callback
        $el.on( 'rt:stop', function() {
            called = true;
        })

        $el.find( '.rt-handle' ).trigger( e );
        $( document ).mouseup();
        assert.ok( called );
    })

    QUnit.test( "should trigger a rt:resizing event while resizing", function( assert ) {
        var $el = $( '#resizeMe' ).resizeThis();
        var oW = $el.innerWidth();
        var oH = $el.innerHeight();
        var e = $.Event( 'mousedown' );
        e.pageX = 10;
        e.pageY = 10;
        $el.find( '.rt-handle' ).trigger( e );
        // Register a spy callback
        $el.on( 'rt:resizing', function() {
            called = true;
        })

        var e2 = $.Event( 'mousemove' );
        e2.pageX = 100;
        e2.pageY = 100;
        $( document ).trigger( e2 );

        assert.ok( called );
    });

