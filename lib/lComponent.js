if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require, exports, module) {
    'use strict';
    var _us = require("underscore");
    var MdArray = require("mdarray");
    

    class lComponent {
	constructor(args) {
	    if (this.constructor == lComponent) {
		throw new TypeError("Cannot instantiate abstract class lComponent.");
	    }
	    this.setup(args);
	    return this;
	};

	setup(args) {
	    var defaults = _us.extend({}, this.defaultSetup());
	    var a = args || {};
	    _us.defaults(a, defaults);
	    var keys = defaults.keys();
	    for (var i = 0; keys.length; i++) {
		var k = "_" + keys[i];
		this.k = a[k];
	    }
	};

	addChild(child) {
	    throw new TypeError("Cannot add child to abstract lComponent class.");
	};

	set children(kids) {
	    throw new TypeError("Cannot set children of abstract lComponent class.");
	};

	get children() {
	    throw new TypeError("Cannot get children of abstract lComponent class.");
	};

	addForceIn(fIn) {
	    this.forceIn = this.forceIn.add(fIn);
	};

	/**
	 * Update velocity, acceleration and position according to the current
	 * value of forceIn and the value dt.
	 *
	 * @param dt   The time period over which we're calculating changes.
	 */
	update(dt) {
	    // update velocity first <- It's important to update first, as
	    // we're using the current value of acceleration.
	    // Remember v = v0 + a * dt
	    this.velocity = this.velocity.add(this.accel.mul(dt));

	    // update acceleration
	    this.accel = this.accel.add(this.forceIn.mul(float(1)/this.mass));

	    // update position
	    this.position = this.position.add(this.velocity.mul(dt));
	}

	/*
	 * Simple Setters and Getters
	 */
	/**
	 * Set the position of this lComponent.
	 * @type {MdArray} A 1 by 2 MdArray with the x component of the position
	 *                 at (0,0), and the y component at (0, 1).
	 */
	set position(pos) {
	    this._position = pos;
	};

	get position() {
	    return this._position;
	};

	/**
	 * Set the mass of this lComponent.
	 * @type {Number} the mass of this object in kg.
	 */
	set mass(m) {
	    this._mass = m;
	};

	get mass() {
	    return this._mass;
	};

	/**
	 * Set the velocity of this lComponent.
	 * @type {MdArray} A 1 by 2 MdArray with the x component of the velocity
	 *                 at (0,0), and the y component at (0, 1).
	 */
	set velocity(v) {
	    this._velocity = v;
	};

	get velocity() {
	    return this._velocity;
	};

	/**
	 * Set the acceleration of this lComponent.
	 * @type {MdArray} A 1 by 2 MdArray with the x component of the
	 *                 acceleration at (0,0), and the y component at (0, 1).
	 */
	set accel(a) {
	    this._accel = a;
	};

	get accel() {
	    return this._accel;
	};

	/**
	 * Set the total force being exerted on this object from its
	 * surroundings.
	 * @type {MdArray} A 1 by 2 MdArray with the x component of the force
	 *                 at (0,0), and the y component at (0, 1).
	 */
	set forceIn(f) {
	    this._forceIn = f;
	};

	get forceIn() {
	    return this._forceIn;
	};

	/**
	 * Set the coefficient - or coefficients - of friction for this object.
	 * @type {Number} A single value representing the coefficient of
	 *                friction of this object. Note: Could split up into
	 *                static and dynamic values - ie. higher when the
	 *                object is not moving.
	 */
	set friction(f) {
	    this._friction = f;
	};
	
	get friction() {
	    return this._friction;
	};

	/**
	 * Set the parent of this lComponent.
	 * @type {lComponent} parent  The parent of this object.
	 */
	set parent(p) {
	    this._parent = p;
	};

	get parent() {
	    return this._parent;
	};

	/**
	 * The gravitational constant as a class property.
	 */
	get G() {
	    return 6.67408;
	};

	
	/**
	 * Return the default properties for this class.
	 */
	static defaultSetup() {
	    if (this.hasOwnProperty(defaults)) {
		return this.defaults;
	    }
	    else {
		this.defaults             = {};
		this.defaults.position    = MdArray.zeros({shape : [1, 2]});
		this.defaults.mass        = 0;
		this.defaults.velocity    = MdArray.zeros({shape : [1, 2]});
		this.defaults.accel       = MdArray.zeros({shape : [1, 2]});
		this.defaults.forceIn     = MdArray.zeros({shape : [1, 2]});
		this.defaults.friction    = 0.0;
		this.defaults.parent      = null;
		this.defaults.timer       = null;
		return this.defaults;
	    }
	};
    };
    module.exports = lComponent;
});
