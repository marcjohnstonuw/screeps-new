var tower = {
	run: function (tower) {
	    var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	    var injuredCreep = _.first(_.filter(Game.creeps, function (c) { 
	    	return c.hits < c.hitsMax; 
	    }))
	    if(target) {
	    	tower.attack(target);
	    } if (injuredCreep) {
	    	tower.heal(injuredCreep);
	    }
	}
}

module.exports = tower;