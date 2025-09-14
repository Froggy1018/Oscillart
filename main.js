const input = document.getElementById('input')

//creates web audio api elements
//creates an object called "AudioContext"
const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();

//create Oscillator node
const oscillator = audioCtx.createOscillator();
//gainNode = controls volume of AudioContext
//Oscillator will play frequencies based on the oscillating mathmatical graphs
//(How computers can play pure tones)
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.type = "sine";

oscillator.start();
gainNode.gain.value = 0;

notes = new Map();
notes.set(C, 261.6);
notes.set(D,293.7);
notes.set(E,329.6);
notes.set(F,349.2);
notes.set(G,392.0);
notes.set(A,440);
notes.set(B,493.9);


function frequency(pitch) {
    gainNode.gain.setValueAtTime(100, audioCtx.currentTime);
    oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime+1);
}

audioCtx.resume();
gainNode.gain.value = 0;

function handle() {

    frequency(input.value);
    var userInput = String(input.value);
    frequency(notes.get(userInput));
}