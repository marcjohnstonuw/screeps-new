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
var creepFactory = require('creepFactory');

var roomsData = require('rooms');


module.exports.loop = function () {
	for (let room in roomsData) {
		roomsData[room].constructionSites.forEach(function (cons) {
			Game.rooms[room].createConstructionSite(cons.pos, cons.type);
		}) 
	}

	var towers = _.filter(Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES), (x) => {
		return (x.structureType === 'tower');
	});

 // console.log(allHarvesters, allJanitors, allBuilders, allDefenders, allCouriers, allLongharvesters)


	creepFactory.createCreeps(Game.spawns.Spawn1.room);


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