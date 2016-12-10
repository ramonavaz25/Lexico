var myApp = angular.module('starter',['ionic']);


myApp.controller('AppCtrl', ['$scope', '$rootScope','$http','$timeout',
function($scope,$rootScope,$http,$timeout){


  $scope.data = {
    speechText: 'Hi! Welcome to Lexico! We have 3 options for you to explore today. Start a new session, Review your wordlist, Learn about the App. Please express your choice immediately after the beep.                                                    ',
	chosenOption:null,
	count:0,
	i:0
  };
	  $scope.recognizedText = '';
	  //$scope.textResponse='';
	  $rootScope.$on("CallParentMethod", function(){
	  $scope.parentmethod();
  });
       
 
  $scope.parentmethod = function() {
	$scope.recognizedText='';
  ////////alert("in parent method"+$scope.data.speechText);	  
   window.TTS.speak({
           text: $scope.data.speechText,
           locale: 'en-GB',
           rate: 1.0
       }, function () { 
			var count=0;
           ////alert("in success"+$scope.data.speechText);
					$timeout(callAtTimeout, 1000);
					function callAtTimeout() {
						$scope.record();
					}
									
				//}      	   
		    //$scope.record();							
       }, function (reason) {
            ////////alert(reason+"");
       });
	   
      
   }
   
   
   
  
  $scope.record = function() {
    var recognition = new SpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults =true;
	//recognition.start();
	////alert(recognition.err);
    recognition.onresult = function(event) {
        if (event.results.length) {
			
            $scope.recognizedText = event.results[0][0].transcript;
           $scope.$apply();
			////////alert("applied to text field");
			////alert($rootScope.onLoad);
			if($rootScope.onLoad=="onload")
			{				
			//////alert($scope.recognizedText);
			$scope.chooseOption();
			}
			else if($scope.index<5)
				
			{
					
              //////alert($scope.recognizedText);			
			 // //alert(angular.isString($scope.synonyms.split(',')[0]));
			  result=angular.equals($scope.recognizedText.trim(),$scope.synonyms.split(',')[0].trim());
			  ////alert(result);
			  var arrMatch=[];
			  if(parseInt($scope.randNum)==1){
				  arrMatch[0]="fun";
				  arrMatch[1]="vine";
				  arrMatch[2]="one";
				  arrMatch[3]="run";
				  arrMatch[4]="un";
			  }
			  else if(parseInt($scope.randNum)==2){
				  arrMatch[0]="do";
				  arrMatch[1]="poop";
				  arrMatch[2]="two";
				  arrMatch[3]="to";
				  arrMatch[4]="oo";
			  }
			  else if(parseInt($scope.randNum)==3){
				  arrMatch[0]="tree";
				  arrMatch[1]="free";
				  arrMatch[2]="three";
				  arrMatch[3]="ee";
				  arrMatch[4]="me";
			  }
			  else if(parseInt($scope.randNum)==4){
				  arrMatch[0]="for";
				  arrMatch[1]="fork";
				  arrMatch[2]="four";
				  arrMatch[3]="food";
				  arrMatch[4]="full";
			  }
			  if ($scope.contains($scope.recognizedText.toLowerCase(),$scope.synonyms.split(',')[0])||$scope.contains($scope.recognizedText.toLowerCase(),$scope.randNum)||result||$scope.contains($scope.recognizedText.toLowerCase(),arrMatch[0])||$scope.contains($scope.recognizedText.toLowerCase(),arrMatch[1])||$scope.contains($scope.recognizedText.toLowerCase(),arrMatch[2])||$scope.contains($scope.recognizedText.toLowerCase(),arrMatch[3])||$scope.contains($scope.recognizedText.toLowerCase(),arrMatch[4])){
				  //////alert($scope.recognizedText);
				  
					$scope.assignTextArea("Brilliant!Your answer is correct!");
				//	$scope.data.speechText="Brilliant!Your answer is correct!";
						$scope.counterLevel.word=$scope.counterLevel.word+1;
						 window.TTS.speak({
							   text: $scope.data.speechText,
							   locale: 'en-GB',
							   rate: 1.0
						   }, function () { 
							   ////alert("in success"+$scope.data.speechText);
							   //if($scope.index<5){
							   $scope.index=$scope.index+1;
							   if($scope.index<5)
							   {
							   $scope.session($scope);
							   }							   
							   else{
								   $scope.assignTextArea("Hope you had a great time! Would be great if you would come back and visit!");
								   //$scope.data.speechText="Hope you had a great time! Would be great if you would come back and visit!";  
				                     //alert("last turn");
				                window.TTS.speak({
							   text: $scope.data.speechText,
							   locale: 'en-GB',
							   rate: 1.0
						   }, function () { 
							      //alert("Bye");
								  navigator.app.exitApp();
						   }, function (reason) {
								////////alert(reason+"");
						   });
							
							   }
														
						   }, function (reason) {
								////////alert(reason+"");
						   });
						
						}
				else{
					$scope.assignTextArea("Shoot!Your answer is incorrect!The correct answer is " + $scope.synonyms.split(',')[0]+". Better luck next time! ");
				//	$scope.data.speechText="Shoot!Your answer is incorrect!The correct answer is " + $scope.synonyms.split(',')[0]+". Better luck next time! ";
					    //$scope.index=$scope.index+1;
						 window.TTS.speak({
							   text: $scope.data.speechText,
							   locale: 'en-GB',
							   rate: 1.0
						   }, function () { 
							   ////alert("in success"+$scope.data.speechText);
							   //if($scope.index<5){
							   $scope.index=$scope.index+1;
							   if($scope.index<5)
							   {
							   $scope.session($scope);
							   }
							   else{
								   $scope.assignTextArea("Hope you had a great time! Come back again to have fun with words.");
								   //$scope.data.speechText="Hope you had a great time! Come back again to have fun with words.";  
				                    // //alert("last turn");
				                window.TTS.speak({
							   text: $scope.data.speechText,
							   locale: 'en-GB',
							   rate: 1.0
						   }, function () { 
							      alert("Bye");
								  navigator.app.exitApp();
						   }, function (reason) {
								////////alert(reason+"");
						   });
							
							   }
							   //}
                             						   
						   }, function (reason) {
								////////alert(reason+"");
						   });
						
				}
				
				//////alert($scope.index);
	   
			
			}
			/*else{
					//alert("how did i land here");	
			}*/
			
			
        }
		
		
    };
    recognition.start();
	////alert(err);
	/*recognition.onend=function(event){
		$scope.chooseOption();
		return;
		//return $scope.recognizedText;
	}*/
	
  }
  
 $scope.assignTextArea=function(strAssign){
	// document.write('<textarea id="text-content">'+strAssign+'</textarea>');
	 document.getElementById('myTextarea').value = strAssign;
	 $scope.data.speechText=strAssign;
 }
  
$scope.contains = function (a, b) {
    return a.toLowerCase().indexOf(b) >= 0;	
}
$scope.chooseOption = function()
{
	
		var textInput = $scope.recognizedText;
		////////alert("chosen option");
		
	  if($scope.data.count>2)
		 {
			
			//////////alert($scope.onLoad="onload");
			$scope.assignTextArea("I'm sorry, i guess you're having a rough day.I'll see you soon! Bye for now.");
		 	//$scope.data.speechText = "I'm sorry, i guess you're having a rough day.I'll see you soon! Bye for now.";
			$scope.parentmethod();
			navigator.app.exitApp();
		  }
	    if($scope.contains(textInput,"session")||$scope.contains(textInput,"station")||$scope.contains(textInput,"musician")||$scope.contains(textInput,"nation")|| $scope.contains(textInput,"statistician")||$scope.contains(textInput,"fashion")||$scope.contains(textInput,"nutrition")||$scope.contains(textInput,"recession")||$scope.contains(textInput,"infection")||$scope.contains(textInput,"fabrication")||$scope.contains(textInput,"intuition")||$scope.contains(textInput,"digestion")||$scope.contains(textInput,"fishing")||$scope.contains(textInput,"position"))
		{
			////////alert("session");
			$scope.data.chosenOption="session";
			
		}
	else if($scope.contains(textInput,"word list")||$scope.contains(textInput,"list")||$scope.contains(textInput,"wordlist"))
		{
			////////alert("wordlist");
			$scope.data.chosenOption="wordlist";
		}
	else if($scope.contains(textInput,"learn")||$scope.contains(textInput,"earn"))
		{
			////////alert("learn");
			$scope.data.chosenOption="learn";
		}
	else if($scope.contains(textInput,"start")|| $scope.contains(textInput,"begin")|| $scope.contains(textInput,"new"))
		{
			if ($scope.contains(textInput,"session"))
				{
					////////alert("session");
					$scope.data.chosenOption="session";
				}
				else if ($scope.contains(textInput,"wordlist") || $scope.contains(textInput,"list"))
				{
					////////alert("wordlist");
					$scope.data.chosenOption="wordlist";
				}
		}
	else if($scope.contains(textInput,"application")||$scope.contains(textInput,"app"))
		{
			////////alert("learn");
			$scope.data.chosenOption="learn";
		}
	else if($scope.data.chosenOption == null){
		////////alert("sorry no match");
		////////alert($scope.data.count);
		   if($scope.data.count==0)
		   {   
			$scope.data.speechText = "Sorry, I did not quite understand what you said. Would you please tell me what you'd like to do again? Your options are start a session,get your word list,learn about the app";
		   }
		   if($scope.data.count==1)
		   {
			   $scope.assignTextArea("I guess i'm a little hard of hearing. Would you be kind and tell me what you'd like to do again? Your options are start a session,get your word list,learn about the app");
			//$scope.data.speechText = "I guess i'm a little hard of hearing. Would you be kind and tell me what you'd like to do again? Your options are start a session,get your word list,learn about the app";  
           }			   
			$rootScope.onLoad="onload";
			$scope.data.count= $scope.data.count+1;
			////////alert($scope.data.count);
			$scope.parentmethod();	
			//////////alert($scope.onLoad="onload");	 
	}
$scope.SwitchFuction();
}


$scope.SwitchFuction = function () {
switch ($scope.data.chosenOption)
	{
	case "session":
		//////alert("calling new session function");
		$rootScope.onLoad=null;
		
		$scope.assignTextArea("In this session,you will be asked the synonyms of five words given the options for each word. Brace yourself! Good luck!");
		//$scope.data.speechText="In this session,you will be asked the synonyms of five words given the options for each word. Brace yourself! Good luck! ";
		window.TTS.speak({
							   text: $scope.data.speechText,
							   locale: 'en-GB',
							   rate: 1.0
						   }, function () { 
							   ////alert("in success"+$scope.data.speechText);
							   //$scope.$apply();
							   $scope.fetch();
							  // $scope.index=$scope.index+1;
							   //$scope.session($scope);	
														
						   }, function (reason) {
								////////alert(reason+"");
						   });
		
		//$scope.parentmethod();
		
		
		break;
	case "wordlist":
		////////alert("calling new wordlist function");
		$scope.wordList();
		$rootScope.onLoad="onload";		
		break;
	case "learn" :
		$scope.learnApp();
		$rootScope.onLoad="onload";
		////////alert("calling learn app function");
		//$scope.data.speechText="What would you like to do next? Start a new session or Review your wordlist?"
		//$scope.parentmethod();
		//$rootScope.onLoad=null;
		break;		
	default:
      ////////alert("test");
	  
	  break;
}
}

$scope.fetch = function()

{

	$http.get("http://lexico.pythonanywhere.com/vocabsession/api/getSession/purnendu/").then(function(response)
	{ 
	$scope.details = response.data;
	$scope.length = response.data.length;	
	$scope.index=0;
	//$scope.data.speechText="In this session,you will be asked the meaning of five words given the options for each word.Good luck,I trust you'll do well!"
	//$scope.parentmethod();
	$scope.session($scope);
	
	
	 //$scope.$watch((userRating), function(newvalue, oldvalue){ console.log(userRating); }) 
	});	
	
}





$scope.session= function($scope)
{
		//for (var j=0;j<=$scope.length-1;j++){
			////alert("in session");
			//////alert("inside loop");
			 $scope.word=$scope.details[$scope.index].word;
			//////alert($scope.word);
			$scope.meaning=$scope.details[$scope.index].meaning;
			//////alert($scope.meaning);
			$scope.synonyms=$scope.details[$scope.index].synonyms;
			//////alert($scope.synonyms);
			$scope.example=$scope.details[$scope.index].example;
			//////alert($scope.example);
			//var textResponse=null;
			
			//dictionary for word level update
			$scope.counterLevel={};
			$scope.counterLevel.word=0;
			
			//meaning list
			$scope.meaningList=$scope.meaning.split(",");
			//////alert($scope.meaningList);
			
			//synonyms into list
			
			$scope.synonymList=$scope.synonyms.split(',');
			//////alert($scope.synonymList);

		function myFunction() {
					$scope.Math = window.Math;
					var x = $scope.Math.floor(($scope.Math.random() * 4) + 1);
					return x;
				}
				
				var randomWords= $scope.details[$scope.index].randoms;
				$scope.randNum = myFunction();
				var random=0;
				var synList=[null,null,null,null];
				for(var randNumber=0;randNumber<=3;randNumber++)
				{
					
					synList[$scope.randNum-1]=$scope.synonyms.split(',')[0];
					if(synList[randNumber]==null)
					{
						synList[randNumber]=randomWords.split(',')[random];
						//////alert(synList[randNumber]);
						random=random+1;		
					}
				}
				$scope.assignTextArea("Choose the correct synonym for the word, "+$scope.word+". Your options are 1 , "+synList[0]+", 2 , "+synList[1]+", 3 , "+synList[2]+" and 4 , "+synList[3]+". Option number would suffice");
				//$scope.data.speechText="Choose the correct synonym for the word, "+$scope.word+". Your options are 1 , "+synList[0]+", 2 , "+synList[1]+", 3 , "+synList[2]+" and 4 , "+synList[3]+". Option number would suffice";
				
				
			//}

			$scope.parentmethod();
			
			
}



$scope.makePostCall = function()
{ 

	for(var j=0;j<=4;j++)
		////////alert("inside loop");
	{
		$scope.word = $scope.details[j].word;
		//$scope.word="alacrity";
		//$scope.newLevel="2";
		$scope.newLevel = $scope.counterLevel[word];
		////////alert($scope.word);
		////////alert($scope.newLevel);
		
	}	

////////alert("test call");
	var req = {
		method: 'POST',
		url: 'http://lexico.pythonanywhere.com/vocabsession/api/userprog/',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {"user":"riddhima", "word":$scope.word, "level":$scope.newLevel}
	}

	$http(req).then(function (response) {
		////////alert("blah");
	}, function (response) {
		////////alert("nah");
		// Failure Function
	});

}

$scope.learnApp=function(){
	$scope.assignTextArea("A Quizzing Lexicon designed to boost and build your vocabulary. In every new session you will be exposed to 5 words and , challenged to guess the synonyms of the words correctly. In the wordlist feature, you will be able to review the words learnt in previous sessions.");
	//$scope.data.speechText="A Quizzing Lexicon designed to boost and build your vocabulary. In every new session you will be exposed to 5 words and , challenged to guess the synonyms of the words correctly. In the wordlist feature, you will be able to review the words learnt in previous sessions.";
		window.TTS.speak({
							   text: $scope.data.speechText,
							   locale: 'en-GB',
							   rate: 1.0
						   }, function () { 
							   $scope.data.speechText="What would you like to do next? Start a new session or Review your wordlist?"
								$scope.parentmethod();	
														
						   }, function (reason) {
								////////alert(reason+"");
						   });
}

$scope.wordList=function(){
	$scope.assignTextArea("This feature is being developed currently and will be available shortly.");
	//$scope.data.speechText="This feature is being developed currently and will be available shortly.";
		window.TTS.speak({
							   text: $scope.data.speechText,
							   locale: 'en-GB',
							   rate: 1.0
						   }, function () { 
							   $scope.data.speechText="What would you like to do next? Start a new session or Learn about the app?"
								$scope.parentmethod();	
														
						   }, function (reason) {
								////////alert(reason+"");
						   });
}
}]);



myApp.controller('myCtrl',['$scope', '$rootScope',
   function($scope,$rootScope) {
             $rootScope.childmethod = function() {
             document.addEventListener("deviceready", function(){	
             $rootScope.onLoad ="onload";			 
             $rootScope.$emit("CallParentMethod", {});		 
			 });
		}
   }	
   ]);
	
	
	