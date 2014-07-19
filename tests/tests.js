var fix;

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

    QUnit.test( "should add class resizable if CSS supports resizing", function( assert ) {
        document.body.style.rotate = true;
        $('#resizeMe').resizeThis();
        assert.ok( fix.className.indexOf('resizable') > -1 );
    });

    QUnit.test( "should inject handle as a child of the element", function( assert ) {
        document.body.style.rotate = true;
        $('#resizeMe').resizeThis();
        assert.ok( $('#resizeMe > .rt-handle').length > 0 );
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
        $el.on( 'rt:stop', function() {
            called = true;
        })

        var e2 = $.Event( 'mousemove' );
        e2.pageX = 100;
        e2.pageY = 100;
        $( document ).trigger( e2 );

        assert.ok( called );
    });

