'use strict'

var _ = require('lodash');
var c = require('common');

var roleBuilder = require('role.builder');

var roleJanitor = {
	run: function (creep) {
		if (creep.memory.isFull) {
			var repairTarget = _.find(creep.room.find(FIND_STRUCTURES), (x) => x.structureType !== 'constructedWall' && x.hits < x.hitsMax && x.hits < 300000);
			var tower = _.find(creep.room.find(FIND_STRUCTURES), (x) => x.structureType === 'tower' && x.energy < x.energyCapacity);
			var spawn = _.find(creep.room.find(FIND_STRUCTURES), (x) => x.structureType === 'spawn' && x.energy < x.energyCapacity);
			var extension = _.find(creep.room.find(FIND_STRUCTURES), (x) => x.structureType === 'extension' && x.energy < x.energyCapacity);
			var wallTarget = _.find(creep.room.find(FIND_STRUCTURES), (x) => x.structureType === 'constructedWall' && x.hits < 1000000/*x.hitsMax*/);
			if (repairTarget) {
				if (creep.repair(repairTarget)) {
					creep.moveTo(repairTarget);
				}
			} else if (tower) {
				if (creep.transfer(tower, RESOURCE_ENERGY)) {
					creep.moveTo(tower);
				}
			} else if (spawn) {
				if (creep.transfer(spawn, RESOURCE_ENERGY)) {
					creep.moveTo(spawn);
				}
			} else if (extension) {
				if (creep.transfer(extension, RESOURCE_ENERGY)) {
					creep.moveTo(extension);
				}
			} else if (wallTarget) {
				if (creep.repair(wallTarget)) {
					creep.moveTo(wallTarget);
				}
			}



			if (_.sum(creep.carry) === 0) {
				creep.memory.isFull = false;
			}
		} else { //fill
			var container = _.find(creep.room.find(FIND_STRUCTURES), (x) => x.structureType === 'container');
			if (container && _.sum(container.store) > 0) {
				if (creep.withdraw(container, RESOURCE_ENERGY)) {
					creep.moveTo(container);
					return;
				} else {
					creep.memory.isFull = true;
				}
			}
		}

	}
}

module.exports = roleJanitor;