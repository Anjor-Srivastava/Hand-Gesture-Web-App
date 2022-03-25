if (screen.width <= 565) {
    document.getElementById("instruct").style.fontSize = "30px";
    document.getElementById("btn_heading").style.letterSpacing = "5px";
}
if (screen.width <= 387) {
    document.getElementById("result_snapshot").style.marginLeft = "0px";
    document.getElementById("camera").style.marginLeft = "0px";
}

Webcam.set({
    height: 200,
    width: 300,
    image_format: 'png',
    png_quality: 90
});

Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result_snapshot").innerHTML = '<img id="img_snapshot" src="' + data_uri + '" />';
    });
}

console.log(ml5.version);
var classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/wiVKqs4WP/model.json', model_loaded);
function model_loaded() {
    console.log("model loaded");
}

function speech(prediction) {
    var synth = window.speechSynthesis;
    var speech_data = new SpeechSynthesisUtterance(prediction);
    synth.speak(speech_data);
}