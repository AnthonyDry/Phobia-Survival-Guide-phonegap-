(function() {
  var PSG = {};
  window.PSG = PSG;
	
	//help function for getting relative template from Mustache.
  var template = function(name) {
    return Mustache.compile($('#'+name+'-template').html());
  };
  //HomeView
  PSG.HomeView = Backbone.View.extend({
    template: template('home-view'),
    render:function()
    {
        this.$el.html(this.template(this));
        return this;     
    }
  }),



  //Router
  PSG.Router = Backbone.Router.extend({
    initialize:function (options) {
        // Handle back button throughout the application
        this.el = options.el;
        /*$('.back').live('click', function(event) {
            window.history.back();
            return false;
        });
        */
        this.firstPage = true;
    },
    routes: 
    {
      "": "index"
    },
    index:function () {
        this.el.empty();
        this.changePage(new PSG.HomeView());
        PSG.UtilCSS.FloatMenuBg;
    },
    changePage:function (page) {
        $(page.el).attr('data-role', 'page');
        page.render();
        this.el.append($(page.el));
        //var transition = $.mobile.defaultPageTransition;
        // We don't want to slide the first page
        if (this.firstPage) {
            transition = 'none';
            this.firstPage = false;
        }
        //$.mobile.changePage($(page.el), {changeHash:false, transition: transition});
    }
}),
  PSG.UtilCSS = {
    initialize:function(){
      var steps = 0;
    },
    FloatMenuBg:function(){
        //setInterval(this.MoveBg.bind(this),10);
       
      $('#MenuBg').stop().animate({backgroundPosition:"(-15000px 0)"}, {duration:500});
    },
    MoveBg:function(){
    //  steps = steps+100;
     // $('#MenuBg').css('background-position-x', steps) + 'px';

    }


  },
  //My booter starts up my application.
  PSG.boot = function(container) 
  {
    container = $(container);
    var router = new PSG.Router({el: container})
    Backbone.history.start();
  }
})()