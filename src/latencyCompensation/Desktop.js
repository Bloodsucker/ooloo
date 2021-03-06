Meteor.methods({
	"API.Desktop.createNew": function(desktopName) {
		var desktopId = Desktops.insert({
			title: desktopName,
			owner: Meteor.userId(),
			kanban: {
				columns: []
			}
		});

		var column1Id = API.Desktop.addColumn(desktopId, "column1");
		var card1Id = API.Card.createNewInColumn(desktopId, column1Id, "Example card");
		API.Card.update(card1Id, {
			description: "This is an example of a description for this super card and it can be edited by anyone who is having access to it."
		});

		API.Desktop.addColumn(desktopId, "column2");

		return desktopId;
	},

	"API.Desktop.addColumn": function (desktopId, columnTitle) {
		var newColumn = {
			_id: new Mongo.ObjectID(),
			title: columnTitle,
			cards: []
		};
		Desktops.update({
			_id: desktopId
		}, {
			$push: {
				"kanban.columns": newColumn
			}
		});

		return newColumn._id;
	},

	"API.Desktop.removeColumn": function (desktopId, columnId) {
		Desktops.update({
			_id: desktopId
		}, {
			$pull: {
				"kanban.columns": {
					_id: columnId
				}
			}
		});
	},

	"API.Desktop.updateColumn": function (desktopId, columnId, diff) {
		var $set = {};
		(function (oBase, diff) {
			for (var attr in diff) {
				$set[oBase + attr] = diff[attr];
			}
		})("kanban.columns.$.", diff);

		Desktops.update({
			_id: desktopId,
			"kanban.columns": {
				$elemMatch: {
					_id: columnId
				}
			}
		}, {
			$set: $set
		});
	}
});
