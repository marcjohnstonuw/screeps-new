'use strict'

var _ = require('lodash');
var roleBuilder = require('role.builder');
var c = require('common');

var roleHarvester = {
	run: function (creep) {
		if (_.sum(creep.carry) === 0) {
			creep.memory.isFull = false;
		} else if (_.sum(creep.carry) == creep.carryCapacity) {
        	creep.memory.isFull = true;
        }
		if (creep.memory.isFull) {
			var container = creep.pos.findClosestByPath(_.filter(creep.room.find(FIND_STRUCTURES), (x) => x.structureType === 'container'));
			//_.find(creep.room.find(FIND_STRUCTURES), (x) => x.structureType === 'container');
			var spawn = _.find(creep.room.find(FIND_STRUCTURES), (x) => x.structureType === 'spawn');
			var storage = _.find(creep.room.find(FIND_STRUCTURES), (x) => x.structureType === 'storage');
			if (container && _.sum(container.store) < container.storeCapacity) {
				if (creep.transfer(container, RESOURCE_ENERGY)) {
					creep.moveTo(container);
					return;
				}
			}
			else if (creep.transfer(spawn, RESOURCE_ENERGY)) {
				creep.moveTo(spawn);
			}
			else if (storage) {
				if (creep.transfer(storage, RESOURCE_ENERGY)) {
					creep.moveTo(storage);
					return;
				}
			}
		} else { //fill
			var sources = _.find(creep.room.find(FIND_SOURCES), function (source) { 
				// console.log(source.id, creep.memory.sourceID);
				return source.id == creep.memory.sourceID
			});
			if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
            }
		}
	}

}

module.exports = roleHarvester;