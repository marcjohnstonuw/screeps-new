var _ = require('lodash');

module.exports = function () {
	StructureSpawn.prototype.createCustomCreep = function (roleName, energy) {
		var numberOfParts, energyPerPart, partSet;
		switch(roleName) {
			case 'Harvester':
				energyPerPart = 300;
				partSet = [MOVE, CARRY, WORK, WORK];
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
		return this.createCreep(parts, undefined, { type: roleName});
	}
}