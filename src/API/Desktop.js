"use strict";

API.Desktop = {
	createNew: function(desktopName, cb) {
		return Meteor.call("API.Desktop.createNew", desktopName, cb);
	},
	addColumn: function(desktopId, columnTitle) {
		return Meteor.call("API.Desktop.addColumn", desktopId, columnTitle);
	}
};