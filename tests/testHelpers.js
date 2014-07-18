function createFix( tag, id, className, parent ) {
    tag = tag || 'div';
    className = className || 'className';
    parent = parent || document.body;
    var el = document.createElement( tag );
    if ( id ) el.id = id;
    el.className = className;
    parent.appendChild( el );
    return el;
}

function removeFix( ) {
    for (var i=0; i < arguments.length; i++) {
        var parent = arguments[i].parentElement;
        parent.removeChild( arguments[i] );
    }
}
