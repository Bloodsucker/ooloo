Meteor.publish('Desktops', function () {
	return Desktops.find({
		owner: this.userId
	});
});
Meteor.publish('Desktop', function(desktopId) {
	return Desktops.find({
		_id: desktopId,
		owner: this.userId
	});
});
Meteor.publish('DesktopCards', function(desktopId) {
	return Cards.find({
		desktopId: desktopId
	});
});

// Meteor.publish('Card', function(cardId) {
// 	Meteor._sleepForMs(3000);

// 	return Cards.find({
// 		_id: cardId
// 	});
// });