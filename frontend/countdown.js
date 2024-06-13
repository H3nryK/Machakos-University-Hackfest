const eventDate = new Date("2024-10-14T10:00:00"); 
const countdownTimer = new CountdownTimer({
  targetDate: eventDate,
  selector: '#countdown',
  leadingZeros: true,
  coundownMultiple: -1, // Countdown to the event date
  onCountdownEnd: function() {
    console.log('Countdown has ended!');
  }
});