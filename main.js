'use strict'

var _ = require('lodash');
var c = require('common');

require('prototype.spawn')();

var roleHarvester = require('role.harvester');
var roleJanitor = require('role.janitor');
var roleBuilder = require('role.builder');
var roleDefender = require('role.defender');

var roomsData = require('rooms');


module.exports.loop = function () {
	for (let room in roomsData) {
		roomsData[room].constructionSites.forEach(function (cons) {
			Game.rooms[room].createConstructionSite(cons.pos, cons.type);
		}) 
	}

	var allHarvesters = _.sum(Game.creeps, (x) => x.memory.type == 'Harvester');
	var allJanitors = _.sum(Game.creeps, (x) => x.memory.type == 'Janitor');
	var allBuilders = _.sum(Game.creeps, (x) => x.memory.type == 'Builder');
	var allDefenders = _.sum(Game.creeps, (x) => x.memory.type == 'Defender');



 console.log(allHarvesters, allJanitors, allBuilders, allDefenders)

	if (allHarvesters < 4) {
		console.log(Game.spawns.Spawn1.createCustomCreep('Harvester', Game.spawns.Spawn1.room.energyCapacityAvailable));
	} else if (allJanitors < 2) {
		if (!isNaN(parseInt(Game.spawns.Spawn1.createCreep([MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, WORK, WORK, WORK], undefined, { type: 'Janitor'})))) {
			Game.spawns.Spawn1.createCreep([MOVE, MOVE, CARRY, CARRY, WORK], undefined, { type: 'Janitor'});
		}
	} else if (allBuilders < 6) {
		if (!isNaN(parseInt(Game.spawns.Spawn1.createCreep([MOVE, CARRY, WORK, MOVE, CARRY, WORK], undefined, { type: 'Builder'})))) {
			Game.spawns.Spawn1.createCreep([MOVE, CARRY, WORK], undefined, { type: 'Builder'});
		}
	} else if (allDefenders < 2) {
		Game.spawns.Spawn1.createCreep([MOVE, ATTACK, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE], undefined, { type: 'Defender'});
	}

	for (let name in Game.creeps) {
		if (Game.creeps[name].memory.type === 'Harvester') {
			roleHarvester.run(Game.creeps[name]);
		}
		if (Game.creeps[name].memory.type === 'Janitor') {
			roleJanitor.run(Game.creeps[name]);
		}
		if (Game.creeps[name].memory.type === 'Builder') {
			roleBuilder.run(Game.creeps[name]);
		}
		if (Game.creeps[name].memory.type === 'Defender') {
			roleDefender.run(Game.creeps[name]);
		}
	}
};