var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start(){
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function(event){
    console.log(event);
    var Content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = Content;
    console.log(Content);

    if (Content == "take my selfie"){
        console.log("taking your selfie in 5 sec");
        speak();
    }
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "taking your selfie in 5 seconds";
    var UtterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(UtterThis);
    
    Webcam.attach(camera);

    setTimeout(function(){
        take_snapshot();
        save();
    },5000);
}

camera = document.getElementById("camera");
Webcam.set({
    width: 360,height:250,image_format:"png", png_quality: 90
});

function take_snapshot(){
    Webcam.snap(function(data_URI){
        document.getElementById("result").innerHTML = '<img id="selfie_img" src="'+data_URI+'">';
    });
}

function save(){
    link = document.getElementById("link");
    pick = document.getElementById("selfie_img").src;
    link.href = pick;
    link.click();
}