$(document).ready(function() {
  $(document).scroll(function () {
    var position = $(this).scrollTop();
    if (position > 140) {
      $('#footer').css({
        transform: 'translateY(-60px)',
        transition: 'all 0.3s ease'
      });
    } 
    else {
      $('#footer').css('transform', 'translateY(60px)');
    }
  });    
});