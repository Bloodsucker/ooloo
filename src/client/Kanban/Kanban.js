KanbanController = RouteController.extend({
	layoutTemplate: 'normalLayout',
	template: 'kanban',
	waitOn: function () {
		return [
			Meteor.subscribe('Desktop', this.params.desktopId),
			Meteor.subscribe('DesktopCards', this.params.desktopId)
		];
	},
	action: function () {
		var self = this;

		Session.set('KanbanCardDetail', self.params.cardId || null);

		self.render();
	},
	data: function() {
		return Desktops.findOne({
			_id: this.params.desktopId
		});
	}
});

Template.kanban.onRendered(function () {
	var template = this;

	var bModal;
	this.view.autorun(function () {
		var cardId = Session.get('KanbanCardDetail');
		if (cardId) {
			bModal = BModals.showNew('KanbanCardDetail', function () {
				return Cards.findOne(cardId);
			}, {
				attached: template
			});

			bModal.on('hide', function () {
				if (!bModal.attached) return;

				var controller = Router.current();
				// if (controller.params.cardId && controller.params.cardId !== cardId) {
				// 	return;
				// }

				Router.go('kanban', {
					desktopId: controller.params.desktopId
				});

				bModal = null;
			});
		} else {
			bModal && bModal.destroy();
		}
	});
});

Template.kanban.helpers({
	cardsInColumn: function() {
		return Cards.find({
			_id: {
				$in: this.cards || []
			}
		});
	},
	createCardInColumn: function() {
		return Session.equals("kanbanCreateCardInColumn", this._id);
	},
	isEditColumnTitle: function () {
		return Session.equals('kanban_isEditColumnTitle', this._id);
	}
});

Template.kanban.events({
	'click button.createCard': function(e) {
		e.preventDefault();
		Session.set('kanbanCreateCardInColumn', this._id);
	},
	'submit form.createCard': function(e, t) {
		e.preventDefault();
		e.stopPropagation();

		var cardName = $(e.target).find('input.cardName').val();

		var desktop = t.data;
		var column = this;

		API.Card.createNewInColumn(desktop._id, column._id, cardName);

		Session.set('kanbanCreateCardInColumn', null);
	},

	'dblclick .columnName': function (e) {
		Session.set('kanban_isEditColumnTitle', this._id);
	},
	'blur .columnName': function (e, t) {
		var column = this;

		var newColumnName = t.$('.columnTitle').val();

		if (newColumnName === column.title) {
			Session.set('kanban_isEditColumnTitle', null);
		}
	},
	'submit .editColumnTitle': function (e, t) {
		e.preventDefault();

		var desktop = t.data;
		var column = this;

		var newColumnName = t.$('.columnTitle').val();

		API.Desktop.changeColumnTitle(desktop._id, column._id, newColumnName);

		Session.set('kanban_isEditColumnTitle', null);
	}
});

Template.kanbanColumnOptions.events({
	'click .removeColumn': function (e, t) {
		e.preventDefault();

		var desktop = Template.parentData();
		var column = this;

		API.Desktop.removeColumn(desktop._id, column._id);
	}
});