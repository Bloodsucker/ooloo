Template.normal_navbar.events({
	'submit .createDesktop': function (e, t) {
		e.preventDefault();

		var $form = $(t.firstNode).find('.createDesktop')
		var desktopName = $form.find('.desktopName').val();

		API.Desktop.createNew(desktopName, function (err, desktopId) {
			Router.go('kanban', {desktopId: desktopId});
		});

		$form[0].reset();
	}
});