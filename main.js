x = 0;
y = 0;
screen_width = 0;
screen_height = 0;
apple = "";
speak_data = "";
to_number = "";

draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function setup() {
  screen_width = window.innerWidth;
  console.log(screen_width);
  screen_height = window.innerHeight;
  console.log(screen_width)
  canvas = createCanvas(screen_width, screen_height - 150);
  console.log("CANVAS LOADED!")
  canvas.position(0 ,160);
}

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
    to_number = Number(content);
    console.log(to_number);
    if(Number.isInteger(to_number)){
      document.getElementById("status").innerHTML = "Started Drawing Apple"; 
      draw_apple = "set";
    }
    else{
        document.getElementById("status").innerHTML = "The speech has not recognized a number"; 
    }
}

function draw() {
  if(draw_apple == "set"){
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
    speak_data = to_number + "Apples Drawn";
    speak();
    for(var i = 1; i <= to_number; i++){
      x = Math.floor(Math.random() * 700);
      y = Math.floor(Math.random() * 400);
      image(apple , x, y, 50, 50);
    }
  }
}
function speak(){
  var synth = window.speechSynthesis;

  var utterThis = new SpeechSynthesisUtterance(speak_data);

  synth.speak(utterThis);

  speak_data = "";
}
function preload(){
  apple = loadImage("download.jpeg");
}