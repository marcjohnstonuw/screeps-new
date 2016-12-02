'use strict'

var roleCourier = {
	run: function (creep) {	
		if (creep.memory.isFull) {
			var storage = _.find(creep.room.find(FIND_STRUCTURES), (x) => x.structureType === 'storage');
			if (storage && _.sum(storage.store) < storage.storeCapacity) {
				if (creep.transfer(storage, RESOURCE_ENERGY)) {
					creep.moveTo(storage);
					return;
				} else {
					creep.memory.isFull = false;
				}
			}
		} else {
			var container = _.find(creep.room.find(FIND_STRUCTURES), (x) => {
				return x.structureType === 'container' && _.sum(x.store) > 1000;
			}); 
			console.log('container' + JSON.stringify(container))
			if (container) {
				if (creep.withdraw(container, RESOURCE_ENERGY)) {
					creep.moveTo(container);
					return;
				} else {
					creep.memory.isFull = true;
				}
			}
		}
	}
}

module.exports = roleCourier;