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



 // console.log(allHarvesters, allJanitors, allBuilders, allDefenders)

 	var energyAvailable = Game.spawns.Spawn1.room.energyAvailable;

	if (allHarvesters < 1) {
		Game.spawns.Spawn1.createCustomCreep('Harvester', energyAvailable);
	} else if (allBuilders < 1) {
		Game.spawns.Spawn1.createCustomCreep('Builder', energyAvailable);
	}
	else if (allHarvesters < 4) {
		Game.spawns.Spawn1.createCustomCreep('Harvester', energyAvailable);
	} else if (allBuilders < 6) {
		Game.spawns.Spawn1.createCustomCreep('Builder', energyAvailable);
	} else if (allJanitors < 2) {
		Game.spawns.Spawn1.createCustomCreep('Janitor', energyAvailable);
	} else if (allDefenders < 2) {
		Game.spawns.Spawn1.createCustomCreep('Defender', energyAvailable);
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