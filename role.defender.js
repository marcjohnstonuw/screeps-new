'use strict'

var _ = require('lodash');

var roleDefender = {
	run: function (creep) {
		if (creep.room.name !== 'W5N8') {
			var exitDir = creep.room.findExitTo('W5N8');
			var exit = creep.pos.findClosestByRange(exitDir);
			creep.moveTo(exit);
			return;
		} 
	    var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	    if(target) {
	        if(creep.attack(target) == ERR_NOT_IN_RANGE) {
	            creep.moveTo(target);
	        }
	    } else {
	    	creep.moveTo(28, 19);
	    }
	}
}

module.exports = roleDefender;