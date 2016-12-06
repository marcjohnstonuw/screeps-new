var _ = require('lodash');

module.exports = function () {
	StructureSpawn.prototype.createCustomCreep = function (roleName, room, maxSize, _memory) {
	 	var energy = room.energyAvailable;
	 	var maxEnergy = room.energyCapacityAvailable;
		var janitors = _.sum(Game.creeps, (x) => x.memory.type == 'Janitor');
		if (janitors >= 2 && energy < (maxEnergy * 0.75)) {
			return -999;
		}
		var numberOfParts, energyPerPart, partSet;
		var memory = _.extend({}, _memory, {
			type: roleName
		});
		switch(roleName) {
			case 'Harvester':
				energyPerPart = 300;
				partSet = [MOVE, CARRY, WORK, WORK];
				numberOfParts = Math.min(Math.floor(maxSize/2), 3, Math.floor(energy / energyPerPart))
				// memory.sourceID = getSourceID();
				break;
			case 'Builder':
				energyPerPart = 200;
				partSet = [MOVE, CARRY, WORK];
				numberOfParts = Math.min(maxSize, 5, Math.floor(energy / energyPerPart))
				break;
			case 'Janitor':
				energyPerPart = 300;
				partSet = [MOVE, MOVE, CARRY, CARRY, WORK];
				numberOfParts = Math.min(Math.floor(maxSize/2), 4, Math.floor(energy / energyPerPart))
				break;
			case 'Courier':
				energyPerPart = 100;
				partSet = [MOVE, CARRY];
				numberOfParts = Math.min(maxSize, 5, Math.floor(energy / energyPerPart))
				break;
			case 'Defender':
				energyPerPart = 130;
				partSet = [MOVE, ATTACK];
				numberOfParts = Math.min(maxSize, 15, Math.floor(energy / energyPerPart))
				break;
			case 'Longharvester':
				energyPerPart = 250;
				partSet = [MOVE, MOVE, WORK, CARRY];
				numberOfParts = Math.min(Math.floor(maxSize/2), 4, Math.floor(energy / energyPerPart))
				break;
		}
		var parts = [];
		for (let i = 0; i < numberOfParts; i++) {
			parts = parts.concat(partSet);
		}
		var result = this.createCreep(parts, undefined, memory);
		return result;
	}
}
