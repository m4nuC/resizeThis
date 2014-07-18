var fix;

QUnit.test( "Plugin namespace exists", function( assert ) {
    assert.ok( $('#idontexist').resizeThis );
});

QUnit.module( "CSS support", {
    setup: function() {
        fix = createFix('div', 'resizeMe');
    },
    teardown: function() {
        removeFix( fix );
    }
});

QUnit.test( "Should add class resizable if CSS supports resizing", function( assert ) {
    document.body.style.rotate = true;
    $('#resizeMe').resizeThis();
    assert.ok( fix.className.indexOf('resizable') > -1 );
});

QUnit.module( "Resize Element", {
    setup: function() {
        fix = createFix('div', 'resizeMe');
    },
    teardown: function() {
        removeFix( fix );
        $( document ).mouseup();
    }
});

QUnit.test( "Should change clicked element size on drag", function( assert ) {
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

    assert.ok( oW !== $el.innerWidth() );
});


