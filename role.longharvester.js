'use strict'

var roleLongHarvester = {
	run: function (creep) {
		if (_.sum(creep.carry) === 0) {
			creep.memory.isFull = false;
		} else if (_.sum(creep.carry) == creep.carryCapacity) {
        	creep.memory.isFull = true;
        }

		if (creep.memory.isFull) {
			// console.log(JSON.stringify(creep.room.name))
			if (creep.room.name !== 'W5N8') {
				var exitDir = creep.room.findExitTo('W5N8');
				var exit = creep.pos.findClosestByRange(exitDir);
				creep.moveTo(exit);
			} else {
				var storage = _.find(creep.room.find(FIND_STRUCTURES), (x) => x.structureType === 'storage');
				if(storage) {
					if (creep.transfer(storage, RESOURCE_ENERGY)) {
						creep.moveTo(storage);
						return;
					}
				}
			}
		} else {
			if (creep.room.name === 'W5N8') {
				var exitDir = creep.room.findExitTo('W5N9');
				var exit = creep.pos.findClosestByRange(exitDir);
				creep.moveTo(exit);
			} else {
				var sources = _.first(creep.room.find(FIND_SOURCES), function (source) { 
					return source.id == creep.memory.sourceID
				});
				if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
	                creep.moveTo(sources);
	            }
			}
		}
	}
}

module.exports = roleLongHarvester;