var myApp = angular.module('starter',['ionic']);
myApp.controller('AppCtrl', function($scope) {
  $scope.data = {
    speechText: ''
  };
  $scope.recognizedText = '';
 
  $scope.speakText = function() {
   window.TTS.speak({
           text: $scope.data.speechText,
           locale: 'en-GB',
           rate: 0.7
       }, function () {
           // Do Something after success
       }, function (reason) {
           // Handle the error case
        alert(reason+"");
       });
  };
  
  

  $scope.record = function() {
	 

    var recognition = new SpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults =true;
    recognition.onresult = function(event) {
        if (event.results.length) {
			var lastResultIdx = event.results.resultIndex;
            $scope.recognizedText = event.results[0][0].transcript;
            $scope.$apply();
			
        }
    };
    recognition.start();
	
  };
});

/*window.TTS.speak({
            text: 'hello world!',
            locale: 'en-GB',
            rate: 1.1
          }, function () {
          }, function (reason) {
          });
    }})
	
	$(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
});

var recognition;
function onDeviceReady() {  

    $('#speak').click( function() {
        recognition = new SpeechRecognition();          
        recognition.onresult = function(event) {
            if (event.results.length > 0) {
                console.log(event.results[0][0].transcript);                
                q.value = event.results[0][0].transcript;
            }
        };      
        recognition.start();
    });
}
	$(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
});

var recognition;
function onDeviceReady() {  

    $('#speak').click( function() {
        recognition = new SpeechRecognition();          
        recognition.onresult = function(event) {
            if (event.results.length > 0) {
                console.log(event.results[0][0].transcript);                
                q.value = event.results[0][0].transcript;
            }
        };      
        recognition.start();
    });
}*/
	