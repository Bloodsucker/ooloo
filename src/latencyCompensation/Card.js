Meteor.methods({
	"API.Card.createNewInColumn": function(desktopId, columnId, cardName) {
		var cardId = Cards.insert({
			desktopId: desktopId,
			title: cardName,
			createdBy: Meteor.userId()
		});

		Desktops.update({
			_id: desktopId,
			"kanban.columns": {
				$elemMatch: {
					_id: columnId
				}
			}
		}, {
			$addToSet: {
				"kanban.columns.$.cards": cardId
			}
		});

		return cardId;
	},
	'API.Card.update': function (cardId, $set) {
		Cards.update({
			_id: cardId
		}, {
			$set: $set
		});
	}
});

Meteor.methods({
	test: function (query, op) {
    	return Desktops.update(query, op);
	}
});