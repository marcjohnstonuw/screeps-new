var _ = require('lodash');

function getSourceID(creep) {
	var sources = Game.rooms.W5N8.find(FIND_SOURCES);
	var groups = _.groupBy(_.filter(Game.creeps, 'memory.type', 'Harvester'), 'memory.sourceID');
	var id, leastHarvesters = Infinity;
	_.each(sources, function (value, key) {
		var numCreeps = groups[value.id] ? groups[value.id].length : 0;
		if (numCreeps < leastHarvesters) {
			leastHarvesters = numCreeps;
			id = value.id;
		}
	})
	return id;
}

module.exports = function () {
	StructureSpawn.prototype.createCustomCreep = function (roleName, energy, maxEnergy) {
		var janitors = _.sum(Game.creeps, (x) => x.memory.type == 'Janitor');
		if (janitors >= 2 && energy < (maxEnergy * 0.75)) {
			return -999;
		}
		var numberOfParts, energyPerPart, partSet;
		var memory = {
			type: roleName
		};
		switch(roleName) {
			case 'Harvester':
				energyPerPart = 300;
				partSet = [MOVE, CARRY, WORK, WORK];
				numberOfParts = Math.min(3, Math.floor(energy / energyPerPart))
				memory.sourceID = getSourceID();
				break;
			case 'Builder':
				energyPerPart = 200;
				partSet = [MOVE, CARRY, WORK];
				numberOfParts = Math.min(5, Math.floor(energy / energyPerPart))
				break;
			case 'Janitor':
				energyPerPart = 300;
				partSet = [MOVE, MOVE, CARRY, CARRY, WORK];
				numberOfParts = Math.min(4, Math.floor(energy / energyPerPart))
				break;
			case 'Courier':
				energyPerPart = 100;
				partSet = [MOVE, CARRY];
				numberOfParts = Math.min(5, Math.floor(energy / energyPerPart))
				break;
			case 'Defender':
				energyPerPart = 130;
				partSet = [MOVE, ATTACK];
				numberOfParts = Math.min(15, Math.floor(energy / energyPerPart))
				break;
			case 'Longharvester':
			console.log('long')
				energyPerPart = 250;
				partSet = [MOVE, MOVE, WORK, CARRY];
				numberOfParts = Math.min(4, Math.floor(energy / energyPerPart))
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
