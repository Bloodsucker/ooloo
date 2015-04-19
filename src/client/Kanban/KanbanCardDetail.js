Template.KanbanCardDetail.helpers({
	editingCardTitle: function() {
		return Session.equals("KanbanCardDetail_title", this._id);
	}
});

Template.KanbanCardDetail.events({
	'dblclick .cardTitle': function(e) {
		e.preventDefault();
		Session.set('KanbanCardDetail_title', this._id);
	},
	'blur input.cardTitle': function (e, t) {
		var oCard = t.data;
		var newCardTitle = t.$('.cardTitle').val();

		if (oCard.title === newCardTitle) {
			Session.set('KanbanCardDetail_title', null);
		}
	},
	'keydown input.cardTitle': function (e, t) {
		if (e.keyCode !== 13) return; //Enter

		e.preventDefault();

		var oCard = t.data;

		var newCardTitle = t.$('.cardTitle').val();

		if (oCard.title !== newCardTitle) {
			API.Card.updateTitle(oCard._id, newCardTitle);
		}

		Session.set('KanbanCardDetail_title', null);
	},
	'submit .cardDetail': function(e, t) {
		e.preventDefault();

		var oCard = t.data;

		var formData = t.$('.cardDetail').serializeArray();
		var $set = {};
		var cardToUpdate = false;
		formData.forEach(function (item) {
			if ( oCard[item.name] !== item.value ) {
				$set[item.name] = item.value;
				cardToUpdate = true;
			}
		});

		console.log('SaveCard', $set);

		if (cardToUpdate) {
			API.Card.update(oCard._id, $set);
		}

		Session.set('KanbanCardDetail_title', null);
	}
});

//remove this from here. This should be controlled, somehow, in the Kanban.js
Template.KanbanCardDetail.onDestroyed(function () {
	var self = this;

	Session.set('KanbanCardDetail_title', null);

	var controller = Router.current();
	if (controller.params.cardId && controller.params.cardId !== self.data._id) {
		return;
	}

	Router.go('kanban', {
		desktopId: controller.params.desktopId
	});
});