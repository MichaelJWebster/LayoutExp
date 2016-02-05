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
	 * Return a callback function suitable for calling from a timer, with
	 * the value of this recorded in the closure.
	 *
	 * @param lcInstance   The lComponent instance that is being called.
	 * @returns A callback function with a reference to the object instance.
	 */
	getCallback(lcInstance) {
	    return function(timeDelta) {
		return lcInstance.tick(timeDelta);
	    };
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
	    // We've added all the required forces to all our children, so
	    // call update on them.
	    update(deltaT);
	};

	update(dt) {
	    // First update this container according to any forces that have
	    // been added from external lComponents.
	    // NOTE: There can only be external lComponents of non-root level
	    // containers.
	    if (this.parent != null) {
		// Update this.
		super.update(dt);
	    }
	    for (var i = 0; i < this.children.length; i++) {
		this.children[i].update(dt);
	    }
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

	/**
	 * Add a child to this.
	 *
	 * @param child  An lComponent.
	 */
	addChild(child) {
	    this._children.append(child);
	};

	/**
	 * Set the children of this container to kids.
	 *
	 * @param kids  An array of lComponents.
	 */
	set children(kids) {
	    this._children = kids.slice(0);
	};

	/**
	 * Return the children of this lContainer.
	 * 
	 * @returns The array containing the children of this lContainer.
	 */
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

	/**
	 * Set the timer to be used by this object.
	 *
	 * Note: usually only the root container - ie. the container for all
	 * other lComponent's with parent == null, will have a timer.
	 *
	 * @type {lTimer} t   The timer to be used by this object.
	 */
	set timer(t) {
	    this._timer = t;
	    t.addCallback(this.getCallback(this));
	};

	get timer() {
	    return this._timer;
	};

	
    };

    module.exports = lAtom;
});
