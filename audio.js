// Hangok (8-bites)
export function playSound(type) {
    // Egyszerű beep hangok generálása
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const frequencies = {
        purchase: 440,
        cut: 220,
        sell: 330,
        build: 550,
        complete: 660
    };

    oscillator.frequency.value = frequencies[type] || 440;
    oscillator.type = 'square'; // 8-bites hang
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

