/*!
 * jQuery lightweight resizable plug-in
 * Author: @0mbre
 * Licensed under the MIT license
 */

;(function( factory ) {
    if ( typeof exports === 'object' ) {
        module.exports = factory( this.jQuery || require('jquery') );
    } else if ( typeof define === 'function' && define.amd ) {
        define([ 'jquery' ], function ($ ) {
            return factory( $ );
        });
    } else {
        this.ResizeThis = factory( this.jQuery );
    }

})(function( $ ) {
    // test for CSS property suport
    var _supports = function( property ) {
        var prefixes = [ 'Webkit', 'Moz', 'O' ];
        var supported = false;

        // Capitalize Property
        var Property = property.replace( /^./, function (match) {
            return match.toUpperCase();
        });

        // Try Vendors prefixes
        for ( var i in prefixes ) {
            supported = supported | prefixes[i] + Property in document.body.style;
        }

        // Try standard
        supported = supported | property in document.body.style;

        return supported;
    }

    var defaults = {
        propertyName: "value",
    };

    function ResizeThis( element, options ) {
        this.el = element;
        this.$el = $( element );

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;

        this.init();
    }

    ResizeThis.prototype.init = function () {
        this._supported = _supports( 'resize' );

        this._supported && this.$el.addClass( 'rt-resizable' );
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn.resizeThis = function ( options ) {
        return this.each(function () {
            new ResizeThis( this, options );
        });
    }

})

