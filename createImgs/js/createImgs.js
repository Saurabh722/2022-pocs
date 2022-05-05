var $document = $(document);
var scrollPoint = 500;
var $views;
function singlepage(index) {
  if (index > 0) {
    resetView();
  }
  
  setView($($views[index]));
}

function resetView(view) {
  $views.removeClass('fixed').hide();
}

function setView(view) {
  $(view).show();
  view.addClass('fixed');
}

function controller(view) {
  singlepage(view);
}


$document.ready(function() {
  $views = $('.view');
  $(window).scroll(function() {
    var viewPoint = $document.scrollTop();
    var viewIndex = Math.floor(viewPoint/scrollPoint);
    console.log(viewIndex);
    controller(viewIndex);
    
    
  });
});
