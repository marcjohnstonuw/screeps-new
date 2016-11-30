'use strict'

var roomW5N8 = Game.rooms.W5N8;

module.exports = {
	W5N8: {
		constructionSites: [
			{type: STRUCTURE_CONTAINER, pos: roomW5N8.getPositionAt(14, 16)},
			{type: STRUCTURE_EXTENSION, pos: roomW5N8.getPositionAt(16, 20)},
			{type: STRUCTURE_EXTENSION, pos: roomW5N8.getPositionAt(18, 20)},
			{type: STRUCTURE_EXTENSION, pos: roomW5N8.getPositionAt(17, 21)},
			{type: STRUCTURE_EXTENSION, pos: roomW5N8.getPositionAt(16, 22)},
			{type: STRUCTURE_EXTENSION, pos: roomW5N8.getPositionAt(18, 22)},
			{type: STRUCTURE_EXTENSION, pos: roomW5N8.getPositionAt(17, 23)},
			{type: STRUCTURE_EXTENSION, pos: roomW5N8.getPositionAt(16, 24)},
			{type: STRUCTURE_EXTENSION, pos: roomW5N8.getPositionAt(18, 24)},
			{type: STRUCTURE_EXTENSION, pos: roomW5N8.getPositionAt(17, 25)},
			{type: STRUCTURE_EXTENSION, pos: roomW5N8.getPositionAt(16, 26)},
			// {type: STRUCTURE_EXTENSION, pos: roomW5N8.getPositionAt(18, 24)},
			{type: STRUCTURE_TOWER, pos: roomW5N8.getPositionAt(14, 20)},
			{type: STRUCTURE_CONTAINER, pos: roomW5N8.getPositionAt(11, 22)},
			{type: STRUCTURE_CONTAINER, pos: roomW5N8.getPositionAt(40, 32)},
			// {type: STRUCTURE_WALL, pos: roomW5N8.getPositionAt(7, 24)},
		]
	}
}