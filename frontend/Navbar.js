// Toggle mobile navbar
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

navbarToggler.addEventListener('click', () => {
  navbarCollapse.classList.toggle('show');

  // Update max-height value based on the content height
  if (navbarCollapse.classList.contains('show')) {
    const navbarContent = navbarCollapse.querySelector('.navbar-nav');
    const contentHeight = navbarContent.offsetHeight;
    navbarCollapse.style.maxHeight = `${contentHeight}px`;
  } else {
    // Set max-height to current height before transitioning to 0
    navbarCollapse.style.maxHeight = `${navbarCollapse.scrollHeight}px`;
    setTimeout(() => {
      navbarCollapse.style.maxHeight = '0';
    }, 200); // Adjust the timeout duration as needed
  }
});

// Close mobile navbar when a nav link is clicked
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      navbarCollapse.style.maxHeight = `${navbarCollapse.scrollHeight}px`;
      setTimeout(() => {
        navbarCollapse.classList.remove('show');
        navbarCollapse.style.maxHeight = '0';
      }, 200); // Adjust the timeout duration as needed
    }
  });
});