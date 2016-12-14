var myApp = angular.module('starter',['ionic']);


myApp.controller('AppCtrl', ['$scope', '$rootScope','$http','$timeout',
function($scope,$rootScope,$http,$timeout){


  $scope.data = {
    speechText: 'Hi! Welcome to Lexico! We have 3 options for you to explore today:Start a new session ,Review your wordlist ,Learn about the App. Which one would you like to choose?',
	chosenOption:null,
	count:0,
	i:0
  };
	  $scope.recognizedText = '';
	  $scope.textResponse='';
	  $rootScope.$on("CallParentMethod", function(){
	  $scope.parentmethod();
  });
       
 
  $scope.parentmethod = function() {
	$scope.recognizedText='';
  //alert("in parent method"+$scope.data.speechText);	  
   window.TTS.speak({
           text: $scope.data.speechText,
           locale: 'en-GB',
           rate: 1.0
       }, function () { 
           //alert("in success"+$scope.data.speechText); 
           //$timeout(callAtTimeout, 000);
				//function callAtTimeout() {
					////alert("crazy");
					//$scope.startrecord ="recording";
					$scope.textResponse=$scope.record();
					
				//}      	   
		    //$scope.record();							
       }, function (reason) {
            //alert(reason+"");
       });
	   

	   
   }
   
   
   
  
  $scope.record = function() {
    var recognition = new SpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults =true;
	//recognition.start();
	
    recognition.onresult = function(event) {
        if (event.results.length) {
            $scope.recognizedText = event.results[0][0].transcript;
           // $scope.$apply();
			//alert("applied to text field");
			//alert($rootScope.onLoad);
			if($rootScope.onLoad=="onload")
			{				
			//alert($scope.recognizedText);
			$scope.chooseOption();
			}
			else
			{			
			   //alert("nothing for now");
			}
			
        }
    };
    recognition.start();
	/*recognition.onend=function(event){
		$scope.chooseOption();
		return;
		//return $scope.recognizedText;
	}*/
  }
  
  
  
$scope.contains = function (a, b) {
	//if(!angular.isUndefined(a))
	//{
    return a.indexOf(b) >= 0;
	//}
	//else
	//{ 
    
	 $scope.contains(a,b);
	//}
}
$scope.chooseOption = function()
{
	
		var textInput = $scope.recognizedText;
		//alert("chosen option");
		
	  if($scope.data.count>=2)
		 {
			
			////alert($scope.onLoad="onload");
		 	$scope.data.speechText = "I'm sorry, i guess you're having a rough day.I'll see you soon! Bye for now.";
			$scope.parentmethod();
			navigator.app.exitApp();
		  }
	    if($scope.contains(textInput,"session")||$scope.contains(textInput,"station")||$scope.contains(textInput,"musician")||$scope.contains(textInput,"nation")|| $scope.contains(textInput,"statistician"))
		{
			//alert("session");
			$scope.data.chosenOption="session";
			
		}
	else if($scope.contains(textInput,"word list")||$scope.contains(textInput,"list")||$scope.contains(textInput,"wordlist"))
		{
			//alert("wordlist");
			$scope.data.chosenOption="wordlist";
		}
	else if($scope.contains(textInput,"learn")||$scope.contains(textInput,"earn"))
		{
			//alert("learn");
			$scope.data.chosenOption="learn";
		}
	else if($scope.contains(textInput,"start")|| $scope.contains(textInput,"begin")|| $scope.contains(textInput,"new"))
		{
			if ($scope.contains(textInput,"session"))
				{
					//alert("session");
					$scope.data.chosenOption="session";
				}
				else if ($scope.contains(textInput,"wordlist") || $scope.contains(textInput,"list"))
				{
					//alert("wordlist");
					$scope.data.chosenOption="wordlist";
				}
		}
	else if($scope.contains(textInput,"application")||$scope.contains(textInput,"app"))
		{
			//alert("learn");
			$scope.data.chosenOption="learn";
		}
	else if($scope.data.chosenOption == null){
		//alert("sorry no match");
		//alert($scope.data.count);
		   if($scope.data.count==0)
		   {   
			$scope.data.speechText = "Sorry, I did not quite understand what you said. Would you please tell me what you'd like to do again? Your options are start a session,get your word list,learn about the app";
		   }
		   if($scope.data.count==1)
		   {
			$scope.data.speechText = "I guess i'm a little hard of hearing. Would you be kind and tell me what you'd like to do again? Your options are start a session,get your word list,learn about the app";  
           }			   
			$rootScope.onLoad="onload";
			$scope.data.count= $scope.data.count+1;
			//alert($scope.data.count);
			$scope.parentmethod();	
			////alert($scope.onLoad="onload");	 
	}
$scope.SwitchFuction();
}


$scope.SwitchFuction = function () {
switch ($scope.data.chosenOption)
	{
	case "session":
		//alert("calling new session function");
		$rootScope.onLoad=null;
		$scope.fetch();
		
		break;
	case "wordlist":
		//alert("calling new wordlist function");
		$rootScope.onLoad=null;		
		break;
	case "learn" :
		//alert("calling learn app function");
		$rootScope.onLoad=null;
		break;		
	default:
      //alert("test");
	  
	  break;
}
}

$scope.fetch = function()

{
	
	/*PromiseUtils.getPromiseHttpResult($http.get('/api/get/call'))
.then(function(result){
    console.log("result", result);
})*/
	$http.get("http://lexico.pythonanywhere.com/vocabsession/api/getSession/purnendu/").then(function(response)
	{ 
	$scope.details = response.data;
	//alert($scope.details);
	$scope.length = response.data.length;
	//alert($scope.length);
	////alert($scope.details.random[0]);
	$scope.session();
	});	
	
}



$scope.session= function()
{
for (var i=1;i<=4;i++)
	{
		//alert("inside outer loop");
		for (var j=0;j<=$scope.length-1;j++){
			//alert("inside inner loop");
			var word=$scope.details[j].word;
			//alert(word);
			var meaning=$scope.details[j].meaning;
			//alert(meaning);
			var synonyms=$scope.details[j].synonyms;
			//alert(synonyms);
			var example=$scope.details[j].example;
			//alert(example);
			//var textResponse=null;
			
			//dictionary for word level update
			$scope.counterLevel={};
			$scope.counterLevel.word=0;
			
			//meaning list
			$scope.meaningList=meaning.split(",");
			//alert($scope.meaningList);
			
			//synonyms into list
			
			$scope.synonymList=synonyms.split(',');
			//alert($scope.synonymList);
			//alert($scope.details[j].level);
			if(parseInt($scope.details[j].level)==0)
			{
				$scope.textCount=0;
				if($scope.textCount=4)
				{
					$scope.textCount=0;
				}
				//Word+meaning+synonym+example 
				if ($scope.textCount=0){
					$scope.data.speechText = "Your first word for today is"+word+", which means"+meaning+". The word is similar to"+synonyms+"."+word+"can be used in a sentence as follows"+example;
					$scope.textCount=$scope.textCount+1;
					$scope.parentmethod();
				}
				else if($scope.textCount=1){
					$scope.data.speechText = "Up next we have the word"+word+"which means"+meaning+". Synonyms for the word are"+synonyms+". An example for its usage is"+example;
					$scope.textCount=$scope.textCount+1;
					$scope.parentmethod();
					
				}
				else if($scope.textCount=2)
				{
					$scope.data.speechText = "Pull up your socks for the next word:"+word+". This means"+meaning+". Similar word to this are"+synonyms+". An example for its usage is"+example;
					$scope.textCount=$scope.textCount+1;
					$scope.parentmethod();
				}
				else if($scope.textCount=3)
				{
					$scope.data.speechText = "Let's get to know about the word:"+word+". Meaning of thr eord is"+meaning+". Synonyms include"+synonyms+". It can be used in a sentence like"+example;
					$scope.textCount=$scope.textCount+1;
					$scope.parentmethod();
				}
								
			}
			else if(i==1){
				//Guess the synonym
				//alert("inside level 1 quiz");
				function myFunction() {
					$scope.Math = window.Math;
					var x = $scope.Math.floor(($scope.Math.random() * 4) + 1);
					//alert("random"+x);
					return x;
				}
				//alert($scope.details[j].randoms);
				var randomWords= $scope.details[j].randoms;//.split(',');
				//alert(randomWords);
				var randNum = myFunction();
				//alert(randNum);
				var random=0;
				var synList=[null,null,null,null];
				for(var randNumber=0;randNumber<=3;randNumber++)
				{
					//alert("inside for loop");
					
					//alert(synList);
					//alert(synonyms.split(',')[0]);
					//synList.splice(randNum-1, 0, synonyms.split(',')[0]);
					synList[randNum-1]=synonyms.split(',')[0];
					//alert(synList[randNum-1]);
					//alert(synList[randNumber]);
					if(synList[randNumber]==null)
					{
						
						synList[randNumber]=randomWords.split(',')[random];
						//alert(randomWords.split(',')[random]);
						//alert(synList[randNumber]);
						random=random+1;
						
					}
				}
				$scope.data.speechText="Choose the correct synonym for the word "+word+". Your options are 1"+synList[0]+", 2"+synList[1]+",3"+synList[2]+"and 4"+synList[3];
				$scope.parentmethod();
				//textResponse=$scope.recognizedText;
				
				if ($scope.contains($scope.textResponse,synonyms.split(',')[0])||$scope.contains($scope.textResponse,randNum)){
					$scope.data.speechText="Your answer is correct!";
						$scope.counterLevel.word=$scope.counterLevel.word+1;
						$scope.parentmethod();
						}
				else{
					$scope.data.speechText="Shoot!Your answer is incorrect! Better luck next time!";
						$scope.parentmethod();
				}
			}
			else if(i==2)
			{
				//Guess the word from the meaning
				//alert("in level 2");
				$scope.data.speechText="Recall the meaning of the words and guess the word from it's meaning. Which word means "+meaning+"?";
				//alert($scope.data.speechText);
				$scope.parentmethod();
	            
				//$scope.record();
				$scope.textResponse=$scope.recognizedText;
				//alert($scope.textResponse);	
				//}	
				//alert("outside loop"+$scope.textResponse);
				if($scope.contains($scope.textResponse,word)||angular.equals($scope.textResponse,word))					
				{
						$scope.data.speechText = "Your answer is correct!";
	                    $scope.counterLevel.word=$scope.counterLevel.word+1;
						$scope.parentmethod();
                        //$scope.record();						
				}
				else {
					$scope.data.speechText="I am sorry!Your answer is incorrect! Better luck next time!";
					$scope.parentmethod();
				}				
				
			}
			else if(i==3)
			{
				//alert("write");
				// meaning of the word
				var counter=0;
				$scope.data.speechText="What is the meaning of the word "+word+"?";
				$scope.parentmethod();
				$scope.textResponse=$scope.recognizedText;
				//alert(textResponse);
				for(var intSyn=0;intSyn<$scope.meaningList.length;intSyn++){
					if($scope.contains($scope.textResponse,$scope.meaningList[intSyn])){
						$scope.counterLevel[$scope.details[j].word]=$scope.counterLevel[$scope.details[j].word]+1;
						counter=counter+1;
					}
				}
				for(var intSyn=0;intSyn<$scope.synonymList.length;intSyn++){
					if($scope.contains($scope.textResponse,$scope.synonymList[intSyn])){
						$scope.counterLevel[$scope.details[j].word]=$scope.counterLevel[$scope.details[j].word]+1;
						counter=counter+1;
					}
				}
				if (counter>0){
					$scope.data.speechText="Your answer is correct!";
					$scope.parentmethod();
					$scope.counterLevel.word=$scope.counterLevel.word+1;
				}
				else
				{
					$scope.data.speechText="I am sorry!Your answer is incorrect! Better luck next time!";
					$scope.parentmethod();
				}
			}
			else if(i==4)
			{
				//Fill in the blank
				var blankExample=example.replace($scope.details[j].word,"blank");
				var counter=0;
				$scope.data.speechText="Fill in the blank with the appropriate word"+blankExample;
				$scope.parentmethod();
				$scope.textResponse=$scope.recognizedText;
				for(var intSyn=0;intSyn<$scope.meaningList.length;intSyn++){
					if($scope.contains($scope.textResponse,$scope.meaningList[intSyn])){
						$scope.counterLevel[$scope.details[j].word]=$scope.counterLevel[$scope.details[j].word]+1;
						counter=counter+1;
					}
				}
				for(var intSyn=0;intSyn<$scope.synonymList.length;intSyn++){
					if($scope.contains($scope.textResponse,$scope.synonymList[intSyn])){
						$scope.counterLevel[$scope.details[j].word]=$scope.counterLevel[$scope.details[j].word]+1;
						counter=counter+1;
					}
				}
				if (counter>0){
					$scope.data.speechText="Your answer is correct!";
					$scope.parentmethod();
					$scope.counterLevel.word=$scope.counterLevel.word+1;
				}
				else
				{
					$scope.data.speechText="I am sorry!Your answer is incorrect! Better luck next time!";
					$scope.parentmethod();
				}
				}
				/*if(i==1)
				{
					//alert("after recognition");
					//alert($scope.textResponse);
					//$timeout(callAtTimeout,3000);
				//function callAtTimeout() {
					
						alert($scope.textResponse)	
				/*while(count<=10){
						var count=0;
						
							count++;
						
					}
					else 
					{*/
				/*function textResponse($scope)
				{
					//alert("in if textResponse");
					//alert($scope.textResponse);
					if($scope.containsText($scope.textResponse,synonyms.split(',')[0])||$scope.containsText($scope.textResponse,randNum)){
					$scope.data.speechText="Your answer is correct!";
						$scope.counterLevel.word=$scope.counterLevel.word+1;
						$scope.parentmethod();
						}
					else{
					$scope.data.speechText="Shoot!Your answer is incorrect! Better luck next time!";
						$scope.parentmethod();
				}
				}
				console.log($scope.textResponse);
				
				//alert($scope.textResponse);
				if($scope.textResponse==''||$scope.textResponse==null||$scope.textResponse==""||angular.isUndefined($scope.textResponse))
				{
					
				
				//alert("in if");
					 $scope.$watch(function($scope) { return $scope.textResponse },
              function textIfResponse($scope)
				{
					textResponse($scope);
				}
             );
				 }
				 /*else{
					 
					 alert("in else");
					textResponse($scope);
				 }*/
					//}
					//}
				//}
		}
		
	}
//$scope.makePostCall();	
}



$scope.makePostCall = function()
{ 

for(var j=0;j<=4;j++)
	//alert("inside loop");
{
	$scope.word = $scope.details[j].word;
	//$scope.word="alacrity";
	//$scope.newLevel="2";
	$scope.newLevel = $scope.counterLevel[word];
	//alert($scope.word);
	//alert($scope.newLevel);
	
}	

//alert("test call");
var req = {
    method: 'POST',
    url: 'http://lexico.pythonanywhere.com/vocabsession/api/userprog/',
    headers: {
        'Content-Type': 'application/json'
    },
    data: {"user":"riddhima", "word":$scope.word, "level":$scope.newLevel}
}

$http(req).then(function (response) {
    //alert("blah");
}, function (response) {
	//alert("nah");
    // Failure Function
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
	
	
	