var c = require('common');

var roleBuilder = {
 	run: function (creep) {

 		var constructionSite = _.first(_.sortBy(creep.room.find(FIND_CONSTRUCTION_SITES), function (site) {
 			if (site.structureType === 'container') return 0;
 			if (site.structureType === 'extension') return 1;
 			return 9999;
 		}))
 		var controller = _.find(creep.room.find(FIND_STRUCTURES), (x) => x.structureType === 'controller');
// c.dump(constructionSite);

		if (creep.memory.isFull) {
	 		if (constructionSite) {
	 			if(creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
	                creep.moveTo(constructionSite.pos);
	            }
	 		}
	 		else if (controller) {
	 			if(creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
	                creep.moveTo(controller.pos);
	            }
	 		}
			if (_.sum(creep.carry) === 0) {
				creep.memory.isFull = false;
			}
		} else {
			var container = _.find(creep.room.find(FIND_STRUCTURES), (x) => x.structureType === 'container');
			if (_.sum(container.store) > 0) {
				if (creep.withdraw(container, RESOURCE_ENERGY)) {
					creep.moveTo(container);
					return;
				} else {
					creep.memory.isFull = true;
				}
			}
		}
 	}
 };

 module.exports = roleBuilder;