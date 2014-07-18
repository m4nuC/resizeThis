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

        // @TODO should leverage CSS Resize whenever possible
        this._supported && this.$el.addClass( 'rt-resizable' );

        // register events
        this.$el.on( 'mousedown.rtClick', $.proxy(this._mouseStart, this) );
    };

    ResizeThis.prototype._mouseStart = function ( evt ) {
        var width = this.$el.innerWidth();
        var height = this.$el.innerWidth();
        $( document ).on( 'mousemove.rtMove', $.proxy(this._mouseDrag, this) );
        $( document ).on( 'mouseup.rtClick', $.proxy(this._mouseStop, this) );
        this._startPos = {
            x: evt.pageX,
            y: evt.pageY,
        }

        this._startSize = {
            x: width,
            y: height
        }

        console.log('mouse down', this._startSize);
        console.log('mouse down', this._startPos);
    }

    ResizeThis.prototype._mouseStop = function ( evt ) {
        $( document ).off( 'mousemove.rtMove' );
    }

    ResizeThis.prototype._mouseDrag = function( evt ) {
        console.log(evt);
        
         var XY = {
            x: evt.pageX - this._startPos.x,
            y: evt.pageY - this._startPos.y
        }
         this._resize( XY );
        console.log('mouse drag', XY);

    }

    ResizeThis.prototype._resize = function( XY ) {
        var sX = this._startSize.x;
        var sY = this._startSize.y;

        this.$el.css({
            width: sX + XY.x,
            height: sY + XY.y
        })
    }

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn.resizeThis = function ( options ) {
        return this.each(function () {
            new ResizeThis( this, options );
        });
    }

})

