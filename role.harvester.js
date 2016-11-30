'use strict'

var _ = require('lodash');
var roleBuilder = require('role.builder');
var c = require('common');

var roleHarvester = {
	run: function (creep) {
		if (creep.memory.isFull) {
			var container = _.find(creep.room.find(FIND_STRUCTURES), (x) => x.structureType === 'container');
			var spawn = _.find(creep.room.find(FIND_STRUCTURES), (x) => x.structureType === 'spawn');
			if (_.sum(container.store) < container.storeCapacity) {
				if (creep.transfer(container, RESOURCE_ENERGY)) {
					creep.moveTo(container);
					return;
				} else {
					creep.memory.isFull = false;
				}
			}
			if (spawn.energy === spawn.energyCapacity) {
				roleBuilder.run(creep);
			}
			else if (creep.transfer(spawn, RESOURCE_ENERGY)) {
				creep.moveTo(spawn);
			}
			if (_.sum(creep.carry) === 0) {
				creep.memory.isFull = false;
			}
		} else { //fill
			var sources = creep.room.find(FIND_SOURCES);
			if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
            if (_.sum(creep.carry) == creep.carryCapacity) {
            	creep.memory.isFull = true;
            }
		}
	}

}

module.exports = roleHarvester;