audioCtx.resume();
gainNode.gain.value = 0;

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

gainNode.gain.setValueAtTime(100, audioCtx.currentTime);
oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime);
gainNode.gain.setValueAtTime(0, audioCtx.currentTime+1);

oscillator.start();
gainNode.gain.value = 0;


function frequency(pitch) {

}

function handle() {

    frequency(input.value);
}