if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require, exports, module) {
    'use strict';
    var _us = require("underscore");
    var MdArray = require("mdarray");
    var lComponent = require("lComponent");
    var Shape = require("Shape/Shape");

    class lContainer {
	constructor(kwargs) {
	    super(kwargs);
	};

	/**
	 * Override the tick method, so that when we get a tick, we:
	 *
	 * - calculate the new acceleration on the atom
	 * - calculate the new velocity of the atom
	 * - calcualte the new position of the atom
	 * - draw the graphical object.
	 *
	 * @param deltaT   The time period ticked.
	 * @override
	 */
	tick(deltaT) {
	    // Perform calculations
	};

	/**
	 * Set Get the Shape field.
	 *
	 * @type {Shape} shape  The graphical object this atom is controlling.
	 */
	set Shape(s) {
	    this._shape = s;
	};
	
	get Shape() {
	    return this._shape;
	};

	
    };

    module.exports = lAtom;
});
