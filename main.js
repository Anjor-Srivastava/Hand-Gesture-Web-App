var prediction;
var output;
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
var classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/DkItGIcqv/model.json', model_loaded);
function model_loaded() {
    console.log("model loaded");
}

function speech() {
    var synth = window.speechSynthesis;
    var speech_data = new SpeechSynthesisUtterance(output);
    synth.speak(speech_data);
}

function check_results() {
    var img = document.getElementById("img_snapshot");
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if(error) {
        console.error(error);
        alert("Sorry, but an error occured");
    }
    else {
        var emogi;
        console.log(result);
        prediction = result[0].label;
        console.log(prediction);
        if(prediction == "Amazing") {
            output = "This is so amazing."
            emogi = "&#128076;";
        }
        if(prediction == "Best") {
            output = "All the best."
            emogi = "&#128077;";
        }
        if(prediction == "Victory") {
            output = "That was a marvellous vicotry."
            emogi = "&#9996;";
        }
        if(prediction == "Hifi") {
            output = "Hifi!!"
            emogi = "&#128591;";
        }
        if(prediction == "Like") {
            output = "Thanks!! I Like you too!"
            emogi = "&#129311;";
        }
        document.getElementById("result").innerHTML = emogi + "<br>" + output;
        speech();
    }
}