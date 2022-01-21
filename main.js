x = 0;
y = 0;
screen_width = 0;
screen_heigh = 0;
draw_apple = "";
apple = "";
speak_data = "";
tonumber = 0;

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start()
{
    document.getElementById("status").innerHTML = "System is listening please speak: ";
    recognition.start();
}

recognition.onresult = function(event)
{
    console.log(event);
    var content = event.results[0][0].transcript;
    document.getElementById("status").innerHTML = "The speech has been recognized as: " + content;
    tonumber = Number(content);
    if(Number.isInteger(tonumber))
    {
        document.getElementById("status").innerHTML = "Started drawing apple or apples ";
        draw_apple = "set";
    }
    else
    {
        document.getElementById("status").innerHTML = "The speech has not recognized a number";
    }
}

function preload()
{
    apple = loadImage("https://i.postimg.cc/JnyLKQcn/apple.png");
}

function setup()
{
    screen_width = window.innerWidth;
    screen_height = window.innerHeight;
    canvas = createCanvas(screen_width, screen_height - 150);
    canvas.position(0, 150);
}

function draw()
{
    if(draw_apple == "set")
    {
        for(var i = 1; i <= tonumber; i++)
        {
            x = Math.floor(Math.random()* 700);
            y = Math.floor(Math.random()* 400);
            image(apple, x, y, 50, 50);
        }
        document.getElementById("status").innerHTML = tonumber + " Apples drawn";
        speak_data = tonumber + " Apples drawn";
        speak();
        draw_apple = "";
    }
}

function speak()
{
    var synth = window.speechSynthesis;
    var utterthis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis);
    speak_data = "";
}