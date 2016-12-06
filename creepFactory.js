var roomsData = require('rooms');

var creepFactory = {
	createCreeps: function (room) {

		var allHarvesters = _.sum(Game.creeps, (x) => x.memory.type == 'Harvester');
		var powerOfHarvesters = getCreepPower(Game.spawns.Spawn1.room, 'Harvester', WORK);
		var powerOfHarvestersSpawn1 = getCreepPower(Game.spawns.Spawn1.room, 'Harvester', WORK, { sourceID: '68050773313e4cb'});
		var powerOfHarvestersSpawn2 = getCreepPower(Game.spawns.Spawn1.room, 'Harvester', WORK, { sourceID: '9fa9077331385d3'});

		var allJanitors = _.sum(Game.creeps, (x) => x.memory.type == 'Janitor');
		var powerOfJanitors = getCreepPower(Game.spawns.Spawn1.room, 'Janitor', CARRY);

		var allBuilders = _.sum(Game.creeps, (x) => x.memory.type == 'Builder');
		var powerOfBuilders = getCreepPower(Game.spawns.Spawn1.room, 'Builder', WORK);

		var allDefenders = _.sum(Game.creeps, (x) => x.memory.type == 'Defender');
		var powerOfDefenders = getCreepPower(Game.spawns.Spawn1.room, 'Defender', ATTACK);

		var allCouriers = _.sum(Game.creeps, (x) => x.memory.type == 'Courier');
		var powerOfCouriers = getCreepPower(Game.spawns.Spawn1.room, 'Courier', CARRY);

		var allLongharvesters = _.sum(Game.creeps, (x) => x.memory.type == 'Longharvester');
		var powerOfLongharvesters = getCreepPower(Game.spawns.Spawn1.room, 'Longharvester', WORK);


		if (allHarvesters < 2) {
			Game.spawns.Spawn1.createCustomCreep('Harvester', room);
		} else if (allJanitors < 1) {
			Game.spawns.Spawn1.createCustomCreep('Janitor', room);
		} else if (allBuilders < 1) {
			Game.spawns.Spawn1.createCustomCreep('Builder', room);
		} else if (powerOfHarvestersSpawn1 < 8) {
			Game.spawns.Spawn1.createCustomCreep('Harvester', room, 8 - powerOfHarvestersSpawn1, {sourceID: '68050773313e4cb'});
		} else if (powerOfHarvestersSpawn2 < 8) {
			Game.spawns.Spawn1.createCustomCreep('Harvester', room, 8 - powerOfHarvestersSpawn2, {sourceID: '9fa9077331385d3'});
		} else if (powerOfJanitors < 6) {
			Game.spawns.Spawn1.createCustomCreep('Janitor', room);
		} else if (powerOfBuilders < 10) {
			Game.spawns.Spawn1.createCustomCreep('Builder', room);
		} else if (allDefenders < 1) {
			Game.spawns.Spawn1.createCustomCreep('Defender', room);
		} else if (allCouriers < 1) {
			Game.spawns.Spawn1.createCustomCreep('Courier', room);
		} else if (powerOfJanitors < 10) {
			Game.spawns.Spawn1.createCustomCreep('Janitor', room);
		} else if (powerOfHarvesters < 14) {
			Game.spawns.Spawn1.createCustomCreep('Harvester', room);
		} else if (powerOfBuilders < 40) {
			Game.spawns.Spawn1.createCustomCreep('Builder', room);
		} else if (powerOfDefenders < 25) {
			Game.spawns.Spawn1.createCustomCreep('Defender', room);
		} else if (allLongharvesters < 4) {
			Game.spawns.Spawn1.createCustomCreep('Longharvester', room);
		}
	}
}

function getCreepPower (room, type, part, memory) {
	var roomCreeps = _.filter(Game.creeps, 'room.name', room.name);
	var typeCreeps = _.filter(roomCreeps, 'memory.type', type);
	var filteredCreeps = _.filter(typeCreeps, (creep) => _.every(memory, function (value, key) { return creep.memory[key] == value; }))
	var creepParts = _.map(filteredCreeps, (creep) => _.sum(creep.body, (bodyPart) => { return bodyPart.type === part; }));

	return _.sum(creepParts);
}

function getSourceID(room) {
	var sources = room.find(FIND_SOURCES);
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

module.exports = creepFactory;