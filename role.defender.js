'use strict'

var _ = require('lodash');

var roleDefender = {
	run: function (creep) {
	    var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	    if(target) {
	        if(creep.attack(target) == ERR_NOT_IN_RANGE) {
	            creep.moveTo(target);
	        }
	    } else {
	    	creep.moveTo(21, 23);
	    }
	}
}

module.exports = roleDefender;