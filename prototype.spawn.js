var _ = require('lodash');

module.exports = function () {
	StructureSpawn.prototype.createCustomCreep = function (roleName, energy) {
		console.log(energy)
		var numberOfParts = Math.floor(energy / 300);
		var parts = [];
		for (let i = 0; i < numberOfParts; i++) {
			parts = parts.concat([MOVE, CARRY, WORK, WORK])
		}
		console.log(parts)
		return this.createCreep(parts, undefined, { type: roleName});
	}
}