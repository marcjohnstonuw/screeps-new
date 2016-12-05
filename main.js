'use strict'

var _ = require('lodash');
var c = require('common');

require('prototype.spawn')();

var roleHarvester = require('role.harvester');
var roleJanitor = require('role.janitor');
var roleBuilder = require('role.builder');
var roleDefender = require('role.defender');
var roleCourier = require('role.courier');
var roleLongharvester = require('role.longharvester');
var tower = require('tower');

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
	var allCouriers = _.sum(Game.creeps, (x) => x.memory.type == 'Courier');
	var allLongharvesters = _.sum(Game.creeps, (x) => x.memory.type == 'Longharvester');

	var towers = _.filter(Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES), (x) => {
		return (x.structureType === 'tower');
	});

 // console.log(allHarvesters, allJanitors, allBuilders, allDefenders, allCouriers, allLongharvesters)

 	var energyAvailable = Game.spawns.Spawn1.room.energyAvailable;
 	var energyCapacityAvailable = Game.spawns.Spawn1.room.energyCapacityAvailable;

	if (allHarvesters < 1) {
		Game.spawns.Spawn1.createCustomCreep('Harvester', energyAvailable, energyCapacityAvailable);
	} else if (allJanitors < 1) {
		Game.spawns.Spawn1.createCustomCreep('Janitor', energyAvailable, energyCapacityAvailable);
	} else if (allBuilders < 1) {
		Game.spawns.Spawn1.createCustomCreep('Builder', energyAvailable, energyCapacityAvailable);
	} else if (allHarvesters < 3) {
		Game.spawns.Spawn1.createCustomCreep('Harvester', energyAvailable, energyCapacityAvailable);
	} else if (allJanitors < 2) {
		Game.spawns.Spawn1.createCustomCreep('Janitor', energyAvailable, energyCapacityAvailable);
	} else if (allBuilders < 3) {
		Game.spawns.Spawn1.createCustomCreep('Builder', energyAvailable, energyCapacityAvailable);
	} else if (allCouriers < 1) {
		Game.spawns.Spawn1.createCustomCreep('Courier', energyAvailable, energyCapacityAvailable);
	} else if (allJanitors < 2) {
		Game.spawns.Spawn1.createCustomCreep('Janitor', energyAvailable, energyCapacityAvailable);
	} else if (allDefenders < 2) {
		Game.spawns.Spawn1.createCustomCreep('Defender', energyAvailable, energyCapacityAvailable);
	} else if (allHarvesters < 6) {
		Game.spawns.Spawn1.createCustomCreep('Harvester', energyAvailable, energyCapacityAvailable);
	} else if (allDefenders < 3) {
		Game.spawns.Spawn1.createCustomCreep('Defender', energyAvailable, energyCapacityAvailable);
	} else if (allLongharvesters < 4) {
		Game.spawns.Spawn1.createCustomCreep('Longharvester', energyAvailable, energyCapacityAvailable);
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
		if (Game.creeps[name].memory.type === 'Courier') {
			roleCourier.run(Game.creeps[name]);
		}
		if (Game.creeps[name].memory.type === 'Longharvester') {
			roleLongharvester.run(Game.creeps[name]);
		}
	}

	_.each(towers, tower.run)
};