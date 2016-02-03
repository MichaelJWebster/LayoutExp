if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require, exports, module) {
    'use strict';
    var _us = require("underscore");
    var MdArray = require("mdarray");
    var lComponent = require("lComponent");
    var Shape = require("Shape");

    /**
     * @class SvgShape
     * @classdesc An abstract shape class.
     */
    class SvgShape extends Shape {
	constructor(parent) {
	    super(parent);
	    return this;
	};

	
	updateShape() {
	    console.log("SvgShape: updateShape()");
	};

	moveTo() {
	    console.log("SvgShape: moveTo()");
	};

	removeShape() {
	    console.log("SvgShape: removeShape()");
	};

	addShape() {
	    console.log("SvgShape: addShape()");
	};

	hideShape () {
	    console.log("SvgShape: hideShape()");
	};
    };

    module.exports = SvgShape;
});
