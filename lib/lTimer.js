if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require, exports, module) {
    'use strict';

    /**
     * @class lTimer
     * @classdesc A timer that can deliver tick messages to registered clients.
     */
    class lTimer {
	/**
	 * Create the timer with the given millisecond deltaT value.
	 *
	 * @param {number} deltaT   A ms value for the time between ticks.
	 */
	constructor(deltaT, name) {
	    this.iObj = null;
	    this.deltaT = deltaT || 1000; // default value of 1000ms.
	    this.name = name || "unnamed";
	    this._callbacks = [];
	    return this;
	};

	/**
	 * Set the callbacks array.
	 * @type {Array} An array of callbacks to be called when the timer
	 *               ticks.
	 */
	set callbacks(cbs) {
	    this._callbacks = cbs;
	};

	/**
	 * Get the callbacks array.
	 *
	 * @type {Array} An array of callbacks to be called when the timer
	 *               ticks.
	 */
	get callbacks() {
	    return this._callbacks;
	};

	/**
	 * Add a callback, or a list of callbacks, to the callbacks array.
	 *
	 * @param {tickCallback} cb   A callback or an array of callbacks to be
	 *        called when the timer ticks.
	 */
	addCallback(cb) {
	    if (cb instanceof Array) {
		this._callbacks = this._callbacks.concat(cb);
	    }
	    else {
		this._callbacks.push(cb);
	    }
	};

	/**
	 * Return a function suitable for use as a callback by the setInterval
	 * function. The function includes the value of the lTimer instance this
	 * reference in a variable timerObj.
	 *
	 * @param {lTimer} timerObj The this reference of the lTimer object
	 *                 setting up the periodic callback.
	 * @returns {@callback tickCallback} A callback for handling ticks
	 *                 on this lTimer.
	 */
	timerLoopClosure(timerObj) {
	    return function() {
		timerObj._callbacks.forEach(function(cb) {
		cb(timerObj.deltaT);
		});
	    };
	};

	/**
	 * Start this timer - if not already started.
	 */
	start() {
	    if (this.iObj == null) {
		this.iObj = setInterval(this.timerLoopClosure(this), this.deltaT);
	    }
	    else {
		console.log("lTimer: " + this.name + " already started.");
	    }
	};

	/**
	 * Stop this timer if it is running.
	 */
	stop() {
	    if (this.iObj != null) {
		clearTimeout(this.iObj);
		this.iObj = null;
	    }
	    else {
		console.log("lTimer: " + this.name + " not running.");
	    }
	};
    };
    
module.exports = lTimer;
});    
