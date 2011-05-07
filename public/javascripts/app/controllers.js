Travis.repositoriesController = SC.ArrayController.create({
});

Travis.repositoryController = SC.ObjectController.create({
  load: function(params) {
    this.params = params;
    this.activateTab(params.tab);
    this.set('content', null);
    this.set('content', Travis.Repository.bySlug(params.owner + '/' + params.repository));
  },
  activateTab: function(tab) {
    this.activeTabController = Travis[tab + 'TabController'];
    $('#repository .tabs > li').removeClass('active');
    $('#repository #tab_' + tab).addClass('active');
  },
  repositoryObserver: function() {
    var repository = this.getPath('content.firstObject');
    if(repository) {
      this.activeTabController.set('content', null);
      this.activeTabController.load(repository, this.params);
    }
  }.observes('*content'),
});

Travis.currentTabController = SC.ObjectController.create(Travis.Helpers.Build, {
  name: 'current',
  repository: null,
  load: function(repository, params) {
    this.set('content', repository.lastBuild());
  }
});

Travis.buildsTabController = SC.ArrayController.create({
  name: 'builds',
  load: function(repository, params) {
    this.set('content', repository.builds());
  }
});

Travis.buildTabController = SC.ObjectController.create(Travis.Helpers.Build, {
  name: 'build',
  load: function(repository, params) {
    this.set('content', Travis.Build.find(params.id));
  },
});

