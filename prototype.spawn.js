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
	console.log('new spawn ID' + id)
	return id;
}

module.exports = function () {
	StructureSpawn.prototype.createCustomCreep = function (roleName, energy) {
		var numberOfParts, energyPerPart, partSet;
		var memory = {
			type: roleName
		};
		switch(roleName) {
			case 'Harvester':
				energyPerPart = 300;
				partSet = [MOVE, CARRY, WORK, WORK];
				memory.sourceID = getSourceID();
				break;
			case 'Builder':
				energyPerPart = 200;
				partSet = [MOVE, CARRY, WORK];
				break;
			case 'Janitor':
				energyPerPart = 200;
				partSet = [MOVE, CARRY, WORK];
				break;
			case 'Defender':
				energyPerPart = 130;
				partSet = [MOVE, ATTACK];
				break;
		}
		var numberOfParts = Math.floor(energy / energyPerPart);
		var parts = [];
		for (let i = 0; i < numberOfParts; i++) {
			parts = parts.concat(partSet);
		}
		var result = this.createCreep(parts, undefined, memory);
		console.log('creep creation result' + result);
		return result;
	}
}
