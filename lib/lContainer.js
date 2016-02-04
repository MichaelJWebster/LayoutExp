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
	    this._children = [];
	};

	/**
	 * FIXME: We probably need that the timer signal only goes to the root
	 * of the lComponent tree. In that case, the update to the children
	 * occurs during the processing of the recursive update algorithm.
	 * 
	 * Override the tick method, so that when we get a tick, we:
	 *
	 * - update the forces on every child, and then call the child's 
	 *
	 * @param deltaT   The time period ticked.
	 * @override
	 */
	tick(deltaT) {
	    var particles = this.children.slice(0);
	    var current = particles.shift();
	    var pLen = particles.length;
	    while (pLen > 0) {
		for (var i = 0; i < pLen; i++) {
		    addForces(current, particles[i]);
		}
		current = particles.shift();
		pLen = particles.length;
	    }
	    updateChildren();
	};

	/**
	 * Calculate gravitational forces between p1 and p2 as a function of
	 * their positions and masses.
	 *
	 * @param p1   An lComponent.
	 * @param p2   Another lComponent.
	 */
	addForces(p1, p2) {
	    var pos1 = p1.position();
	    var pos2 = p2.position();
	    var diff = pos1.sub(pos2);
	    var rSquared = diff.pow(2).sum();
	    var gForce = (this.G * p1.mass * p2.mass) / rSquared;

	    // Calculate the force as a vector along a line between p1 and p2.
	    // Note: This means we calculate a vector with length == gForce,
	    // and direction along p1 to p2;
	    // Slope is the difference of the y's divided by the difference of
	    // the x's.
	    var m = diff.get(0,1) / diff.get(0,0);

	    // We want y ^ 2 + x ^ 2 = gForce ^ 2 and y == m * x
	    // m^2 * x^2 + x^2 = gForce^2
	    // (m^2 + 1) x ^2 = gForce^2
	    // x = gForce / squarRoot(m^2 + 1)
	    var xComponent = float(gForce) / Math.sqrt(Math.pow(m,2) + 1);
	    var yComponent = m * xComponent;
	    var data = [xComponent, yComponent];
	    var fInfoP2 = new MdArray(data, {shape : [1, 2]});
	    var fIntoP1 = fIntoP2.mul(-1);
	    p1.addForceIn(fIntoP1);
	    p2.addForceIn(fIntoP2);
	};

	addChild(child) {
	    this._children.append(child);
	};

	set children(kids) {
	    this._children = kids.slice(0);
	};

	get children() {
	    return this._children;
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
