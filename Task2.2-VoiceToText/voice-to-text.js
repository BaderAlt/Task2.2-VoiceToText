document.addEventListener("DOMContentLoaded", function() {
    const startRecordBtn = document.getElementById('start-record-btn');
    const voiceText = document.getElementById('voice-text');
    const status = document.getElementById('status');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';

    recognition.onstart = function() {
        status.textContent = "Voice recognition started. Speak into the microphone.";
    };

    recognition.onspeechend = function() {
        status.textContent = "Voice recognition stopped.";
        recognition.stop();
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        voiceText.textContent = transcript;
        saveTextToDatabase(transcript);
    };

    startRecordBtn.addEventListener('click', function() {
        recognition.start();
    });

    function saveTextToDatabase(text) {
        fetch('save_text.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `text=${encodeURIComponent(text)}`
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
