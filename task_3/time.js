let countdownInterval;
document.getElementById('startButton').addEventListener('click', function() {
    const targetDateInput = document.getElementById('targetDate').value;
    if (!targetDateInput) {
        alert('Please select a target date and time.');
        return;
    }
    const targetDate = new Date(targetDateInput).getTime();
    clearInterval(countdownInterval);
    countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        if (distance <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('timer').innerHTML = "EXPIRED";
        } 
        else {
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                document.getElementById('timer').innerHTML = 
                (hours < 10 ? "0" + hours : hours) + ":" +
                (minutes < 10 ? "0" + minutes : minutes) + ":" +
                (seconds < 10 ? "0" + seconds : seconds);
        }
    }, 1000);
});
