$(function() {
    const parallaxScene = $('#parallaxSection').scrollorama({
      blocks: '.parallax-layer',
      enablePin: false
    });
  
    parallaxScene.addTrigger('next', function() {
      const top = Math.min($('#parallaxSection').outerHeight() - $(window).height(), Math.max(0, $(window).scrollTop() - $('#parallaxSection').offset().top));
      const scrolloramaData = $(this).data('scrollorama');
      scrolloramaData.offset = top / 2; // Adjust the parallax effect speed
    });
});