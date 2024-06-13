document.addEventListener('DOMContentLoaded', function() {
  // Set the date we're counting down to
  const countDownDate = new Date("OCT 14, 2024 09:00:00").getTime();

  // Update the count down every 1 second
  const x = setInterval(function() {
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the respective elements
    updateElement("days", days);
    updateElement("hours", hours);
    updateElement("minutes", minutes);
    updateElement("seconds", seconds);

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("countdown").innerHTML = "The event has started!";
    }
  }, 1000);

  function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element.innerText != value) {
      element.innerText = value;
      element.classList.add("updated");
      setTimeout(() => {
        element.classList.remove("updated");
      }, 500);
    }
  }
});