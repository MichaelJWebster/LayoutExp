if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require, exports, module) {
    'use strict';
    var lComponent = require("lComponent");

    /**
     * @class Shape
     * @classdesc An abstract shape class.
     */
    class Shape {
	constructor(parent) {
	    if (this.constructor == Shape) {
		throw new TypeError("Cannot instantiate abstract class Shape.");
	    }
	    this._pComponent = parent;
	};

	
	set pComponent(lComponent parent) {
	    this._pComponent = parent;
	};

	get pComponent() {
	    return this._pComponent;
	};

	updateShape() {
	    throw new TypeError("Cannot call updateShape on abstract Shape class.");
	};

	moveTo() {
	    throw new TypeError("Cannot call moveTo on abstract Shape class.");	    
	};

	removeShape() {
	    throw new TypeError("Cannot call removeShape on abstract Shape class.");	    
	};

	addShape() {
	    throw new TypeError("Cannot call addShape on abstract Shape class.");
	};

	hideShape () {
	    throw new TypeError("Cannot call hideShape on abstract Shape class.");
	};
    };
};
