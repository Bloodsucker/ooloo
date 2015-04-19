Router.route('/', function() {
	name: "home",
	this.render('home');
});

Router.route('/dashboard', {
	name: "dashboard",
	controller: 'DashboardController'
});

Router.route('/:desktopId/Kanban', {
	name: "kanban",
	controller: 'KanbanController'
});

Router.route('/:desktopId/Kanban/:cardId', {
	name: "kanbanCardDetail",
	controller: 'KanbanController'
});