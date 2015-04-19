"use strict";

API.Card = {
	createNewInColumn: function(desktopId, columnId, cardName) {
		return Meteor.call("API.Card.createNewInColumn", desktopId, columnId, cardName);
	},

	update: function(cardId, $set) {
		Meteor.call("API.Card.update", cardId, $set);
	},

	updateTitle: function(cardId, title) {
		var $set = {
			title: title
		};
		this.update(cardId, $set);
	}
};