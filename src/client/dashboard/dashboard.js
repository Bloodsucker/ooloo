DashboardController = RouteController.extend({
	layoutTemplate: 'normalLayout',
	template: 'dashboard',

	waitOn: function () {
		return Meteor.subscribe('Desktops');
	},

	data: {
		desktops: function () {
			return Desktops.find();
		}
	}
});