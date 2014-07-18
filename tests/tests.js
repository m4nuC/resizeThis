QUnit.test( "Plugin namespace exists", function( assert ) {
    assert.ok( $('#idontexist').resizeThis );
});

var fix;
QUnit.module( "CSS support", {
    setup: function() {
        console.log('testoin');
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


