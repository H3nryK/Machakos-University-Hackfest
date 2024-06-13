document.addEventListener('DOMContentLoaded', function() {
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    const animatedElements = document.querySelectorAll('.animated');
    function checkAnimations() {
      animatedElements.forEach(element => {
        if (isInViewport(element)) {
          element.classList.add('fadeIn');
        }
      });
    }

    window.addEventListener('scroll', checkAnimations);
    window.addEventListener('resize', checkAnimations);
    checkAnimations();
});