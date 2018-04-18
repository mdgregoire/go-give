myApp.controller('AdminController', ['UserService', 'NonprofitService','FeedService', '$window',
        function(UserService, NonprofitService, FeedService, $window){
    const self = this;

    // $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://www.youtube.com/**']);

    self.UserService = UserService;
    self.userObject = UserService.userObject;

    self.fbLogout = UserService.fbLogout;

    self.newNonprofit = NonprofitService.newNonprofit;
    self.addNonprofit = NonprofitService.addNonprofit;
    self.getAllNonprofit = NonprofitService.getAllNonprofit;
    self.getAllNonprofit();
    self.allNonprofits = NonprofitService.allNonprofits;

    self.newFeedItem = FeedService.newFeedItem;
    self.addFeedItem = FeedService.addFeedItem;
    self.getFeedItems = FeedService.getFeedItems;
    self.getFeedItems();
    self.allFeedItems = FeedService.allFeedItems;

    self.editNonprofit = NonprofitService.editNonprofit;
    self.deleteNonprofit = NonprofitService.deleteNonprofit;
    self.submitEditedNonprofit = NonprofitService.submitEditedNonprofit;
    self.editNonprofitToggle = NonprofitService.editNonprofitToggle
    self.upload = NonprofitService.upload;

    self.updateFeedItem = FeedService.updateFeedItem;
    self.deleteFeedItem = FeedService.deleteFeedItem;
    self.displayFeedItem = FeedService.displayFeedItem;
    self.editFeedToggle = FeedService.editFeedToggle;

    self.userArray = UserService.userArray;
    self.getAllUsers = UserService.getAllUsers;
    self.getAllUsers();
    self.deleteUser = UserService.deleteUser;

    self.getIframeSrc = function (videoId) {
      console.log(videoId);
      console.log('https://www.youtube.com/embed/' + videoId);
      return 'https://www.youtube.com/embed/' + videoId;
    };


}])
.config(function($sceDelegateProvider){
  $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://www.youtube.com/**']);
})
;
