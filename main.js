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

var amplitude = null;


//define canvas var
var canvas = document.getElementByID("canvas");
var ctx = canvas.getContect("2d");
//the ctx is just the part of the canvas that we draw on
var width = ctx.canvas.width;
var height = ctx.canvas.height;


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



var counter = 0;
function drawWave(){
    ctx.clearRect(0,0,width,height);
    //clears everythign inside the canvas
    x=0;
    y=height/2;
    ctx.moveTo (x,y);
    //moves our pointer to the left-most middle of our canvas, and it'll always start from there
    ctx.beginPath();
    //tells the computer that we're ready to start painting
    counter = 0;
    interval = setInterval (line,20);

}

function line(){
    frequency = pitch/10000;
    y=height/2 + (amplitude *Math.sin(Math.PI*2*frequency*x));
    ctx.lineTo(x,y);
    ctx.stroke();
    x++;
    counter++;

    if (counter > 50){
        clearInterval (interval);
    }
    
}