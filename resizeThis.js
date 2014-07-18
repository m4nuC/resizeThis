/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

;(function( factory ) {
    console.log('i am getting called');
    
    if ( typeof exports === 'object' ) {
        module.exports = factory( this.jQuery || require('jquery') );
    } else if ( typeof define === 'function' && define.amd ) {
        define([ 'jquery' ], function ($ ) {
            return factory( $ );
        });
    } else {
        this.NProgress = factory(this.jQuery);
    }

})(function( $ ) {
    console.log('me too');

    var defaults = {
        propertyName: "value"
    };

    function ResizeThis( element, options ) {
        this.el = element;

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;

        this.init();
    }

    ResizeThis.prototype.init = function () {
        //
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn.resizeThis = function ( options ) {
        return this.each(function () {
            new ResizeThis( this, options );
        });
    }

})

