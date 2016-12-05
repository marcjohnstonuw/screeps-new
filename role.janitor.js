'use strict'

var _ = require('lodash');
var c = require('common');

var roleBuilder = require('role.builder');

function getTarget (creep) {
	var closeThings = _.filter(creep.pos.findInRange(FIND_STRUCTURES, 2), (x) => x.energy < x.energyCapacity )
	var allExtensions = _.filter(creep.room.find(FIND_STRUCTURES), (x) => x.structureType === 'extension' && x.energy < x.energyCapacity);
	var repairTarget = _.find(creep.room.find(FIND_STRUCTURES), (x) => x.structureType !== 'constructedWall' && x.hits < x.hitsMax && x.hits < 250000);
	var tower = _.find(creep.room.find(FIND_STRUCTURES), (x) => x.structureType === 'tower' && x.energy < x.energyCapacity);
	var spawn = _.filter(creep.room.find(FIND_STRUCTURES), (x) => x.structureType === 'spawn' && x.energy < x.energyCapacity);
	var wallTarget = _.first(_.sortBy(_.filter(creep.room.find(FIND_STRUCTURES), (x) => {
		return (x.structureType === 'constructedWall' || x.structureType === 'rampart') 
			&& x.hits < 1500000;
	}), function (x) {
		return x.hits;
	}));

	var energyThings = spawn.concat(allExtensions);

	var target;
	if (repairTarget) {
		target = repairTarget;
	} else if (tower) {
		target = tower;
	} else if (closeThings.length) {
		target = _.get(closeThings, _.random(0, closeThings.length));
	} else if (energyThings.length) {
		target = _.get(energyThings, _.random(0, allExtensions.length));
	} else if (wallTarget) {
		target = wallTarget;
	}

	if (target) {
		return target.id;
	}
}

function isTargetFixed (targetID) {
	var target = Game.getObjectById(targetID);
	return (!target.hitsMax || target.hits == target.hitsMax)
		&& (!target.energyCapacity || target.energy == target.energyCapacity);
}

function fixTarget (creep) {
	var target = Game.getObjectById(creep.memory.target);
	if (!target) return;
	var err = 0;
	if (target.hits < target.hitsMax) {
		err = creep.repair(target);
	} else if (target.energy < target.energyCapacity) {
		err = creep.transfer(target, RESOURCE_ENERGY);
	}
	if (err) {
		creep.moveTo(target);
	}
}

var roleJanitor = {
	run: function (creep) {
		if (_.sum(creep.carry) === 0) {
			creep.memory.isFull = false;
			creep.memory.target = null;
		} else if (_.sum(creep.carry) == creep.carryCapacity) {
			creep.memory.isFull = true;
		}

		if (creep.memory.isFull) {
			if (!creep.memory.target || isTargetFixed(creep.memory.target)) {
				creep.memory.target = getTarget(creep)
			} 
			fixTarget(creep);
		} else { //fill
			var container = _.filter(creep.room.find(FIND_STRUCTURES), (x) => {
				return (x.structureType === 'container' || x.structureType === 'storage') && _.sum(x.store) > 100;
			})
			container = creep.pos.findClosestByRange(container);

			if (container && _.sum(container.store) > 0) {
				if (creep.withdraw(container, RESOURCE_ENERGY)) {
					creep.moveTo(container);
					return;
				}
			}
		}

	}
}

module.exports = roleJanitor;