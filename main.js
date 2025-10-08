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

//define canvas var
var canvas = document.getElementByID("canvas");
var ctx = canvas.getContect("2d");
//the ctx is just the part of the canvas that we draw on
var width = ctx.canvas.width;
var height = ctx.canvas.height;

var amplitude = null;
var freq = null;
var x = 0;

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
    freq = pitch/10000;
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

    drawWave();
}



var counter = 0;
var interval = null;


function drawWave(){
    counter = 0;
    x=0;
    ctx.clearRect(0,0,width,height);
    //clears everythign inside the canvas
    y=height/2;
    ctx.moveTo (x,y);
    //moves our pointer to the left-most middle of our canvas, and it'll always start from there
    ctx.beginPath();
    //tells the computer that we're ready to start painting

    interval = setInterval (line,20);

}

function line(){
    y=height/2 + (amplitude *Math.sin(Math.PI*2*freq*x));
    ctx.lineTo(x,y);
    ctx.stroke();
    x= x+1;
    //increases counter by 1
    counter++;

        if (counter > 50){
        clearInterval (interval);
    }
    
}



