function onDeviceReady() {
window.plugins.speechrecognizer.init(onConversionSucess, onConversionFail)
}

function onConversionSucess(){
  var requestCode = 12345;
  var maxMatches = 1;               // you can increase the number.
  var promptString = "Speak Now";    // you can change the prompt message.
               window.plugins.speechrecognizer.startRecognize(onSuccess, onError, requestCode, maxMatches, promptString);
        }
 
        function onConversionFail(){
    navigator.notification.alert("Could not convert the speech to text:" + error);
        }

function onSuccess(data) {
if (data) {
var jsonObject = JSON.parse(data);
     // It will return the first matched text for the speech.
     var convertedText = jsonObject.speechMatches.speechMatch[0];
        $("#results").html(convertedText);    
}
}

function onError(error) {
navigator.notification.alert("Conversion failed due to: " + error);
}
