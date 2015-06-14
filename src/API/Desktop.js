"use strict";

API.Desktop = {
	createNew: function(desktopName, cb) {
		return Meteor.call("API.Desktop.createNew", desktopName, cb);
	},
	addColumn: function(desktopId, columnTitle) {
		return Meteor.call("API.Desktop.addColumn", desktopId, columnTitle);
	},
	removeColumn: function (desktopId, columnId) {
		return Meteor.call("API.Desktop.removeColumn", desktopId, columnId);
	},
	changeColumnTitle: function (desktopId, columnId, newColumnName) {
		return API.Desktop.updateColumn(desktopId, columnId, {
			title: newColumnName
		});
	},
	updateColumn: function (desktopId, columnId, diff) {
		return Meteor.call("API.Desktop.updateColumn", desktopId, columnId, diff);
	}
};