// Countdown Timer
const eventDate = new Date("October 15, 2024 09:00:00").getTime();

const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML =
        `<div class="time-unit"><span class="time">${days}</span> Days</div>` +
        `<div class="time-unit"><span class="time">${hours}</span> Hours</div>` +
        `<div class="time-unit"><span class="time">${minutes}</span> Minutes</div>` +
        `<div class="time-unit"><span class="time">${seconds}</span> Seconds</div>`;

    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = "The event has started!";
    }
}, 1000);
