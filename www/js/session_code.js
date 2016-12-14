$scope.session= function($scope)
{
    alert("within session function");
for (var i=1;i<=4;i++)
  {
    alert("inside outer loop");
    for (var j=0;j<=4;j++){               // Applying level i for each of the 5 words.
      alert("inside inner loop");
      var word=$scope.details[j].word;
      alert(word);

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
        alert("level = 0");

        $scope.textCount=0;
        if($scope.textCount=4)
        {
          $scope.textCount=0;
        }
        //Word+meaning+synonym+example 
        if ($scope.textCount=0){
          $scope.data.speechText = "Your first word for today is"+word+", which means"+meaning+". The word is similar to"+synonyms+"."+word+"can be used in a sentence as follows"+example;
          $scope.textCount=$scope.textCount+1;
          $scope.parentmethod($scope);
        }
        else if($scope.textCount=1){
          $scope.data.speechText = "Up next we have the word"+word+"which means"+meaning+". Synonyms for the word are"+synonyms+". An example for its usage is"+example;
          $scope.textCount=$scope.textCount+1;
          $scope.parentmethod($scope);
          
        }
        else if($scope.textCount=2)
        {
          $scope.data.speechText = "Pull up your socks for the next word:"+word+". This means"+meaning+". Similar word to this are"+synonyms+". An example for its usage is"+example;
          $scope.textCount=$scope.textCount+1;
          $scope.parentmethod($scope);
        }
        else if($scope.textCount=3)
        {
          $scope.data.speechText = "Let's get to know about the word:"+word+". Meaning of thr eord is"+meaning+". Synonyms include"+synonyms+". It can be used in a sentence like"+example;
          $scope.textCount=$scope.textCount+1;
          $scope.parentmethod($scope);
        }
                
      }
      else if(i==1){
        //Guess the synonym
        alert("inside level 1 quiz");
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
        alert("b4 parentmethod");
        $scope.data.speechText="Choose the correct synonym for the word "+word+". Your options are 1"+synList[0]+", 2"+synList[1]+",3"+synList[2]+"and 4"+synList[3];
        //$scope.parentmethod($scope);

          window.TTS.speak({
           text: $scope.data.speechText,
           locale: 'en-GB',
           rate: 1.7
       }, function () { 
           //alert("in success"+$scope.data.speechText); 
           //$timeout(callAtTimeout, 000);
        //function callAtTimeout() {
          ////alert("crazy");
          //$scope.startrecord ="recording";
          alert("after lex speaks and before record");
          $scope.textResponse=$scope.record($scope);
          alert("after record");

          
        //}          
        //$scope.record($scope);              
       }, function (reason) {
            //alert(reason+"");
       });


        //textResponse=$scope.recognizedText;
        /*if ($scope.contains($scope.textResponse,synonyms.split(',')[0])||$scope.contains($scope.textResponse,randNum)){
          $scope.data.speechText="Your answer is correct!";
            $scope.counterLevel.word=$scope.counterLevel.word+1;
            $scope.parentmethod($scope);
            }
        else{
          $scope.data.speechText="Shoot!Your answer is incorrect! Better luck next time!";
            $scope.parentmethod($scope);
        }*/
        alert("after parentmethod");
      }
      else if(i==2)
      {
        //Guess the word from the meaning
        alert("in level 2");
        $scope.data.speechText="Recall the meaning of the words and guess the word from it's meaning. Which word means "+meaning+"?";
        //alert($scope.data.speechText);
        $scope.parentmethod($scope);
              
        //$scope.record($scope);
        $scope.textResponse=$scope.recognizedText;
        //alert($scope.textResponse); 
        //} 
        //alert("outside loop"+$scope.textResponse);
        if($scope.contains($scope.textResponse,word)||angular.equals($scope.textResponse,word))         
        {
            $scope.data.speechText = "Your answer is correct!";
                      $scope.counterLevel.word=$scope.counterLevel.word+1;
            $scope.parentmethod($scope);
                        //$scope.record($scope);            
        }
        else {
          $scope.data.speechText="I am sorry!Your answer is incorrect! Better luck next time!";
          $scope.parentmethod($scope);
        }       
        
      }
      else if(i==3)
      {
        //alert("write");
        alert("level = 3");
        // meaning of the word
        var counter=0;
        $scope.data.speechText="What is the meaning of the word "+word+"?";
        $scope.parentmethod($scope);
        textResponse=$scope.recognizedText;
        //alert(textResponse);
        for(var intSyn=0;intSyn<$scope.meaningList.length;intSyn++){
          if($scope.contains(textResponse,$scope.meaningList[intSyn])){
            $scope.counterLevel[$scope.details[j].word]=$scope.counterLevel[$scope.details[j].word]+1;
            counter=counter+1;
          }
        }
        for(var intSyn=0;intSyn<$scope.synonymList.length;intSyn++){
          if($scope.contains(textResponse,$scope.synonymList[intSyn])){
            $scope.counterLevel[$scope.details[j].word]=$scope.counterLevel[$scope.details[j].word]+1;
            counter=counter+1;
          }
        }
        if (counter>0){
          $scope.data.speechText="Your answer is correct!";
          $scope.parentmethod($scope);
          $scope.counterLevel.word=$scope.counterLevel.word+1;
        }
        else
        {
          $scope.data.speechText="I am sorry!Your answer is incorrect! Better luck next time!";
          $scope.parentmethod($scope);
        }
      }
      else if(i==4)
      {
        alert("level = 4");
          //Fill in the blank
          var blankExample=example.replace($scope.details[j].word,"blank");
          var counter=0;
          $scope.data.speechText="Fill in the blank with the appropriate word"+blankExample;
          $scope.parentmethod($scope);
          textResponse=$scope.recognizedText;
          for(var intSyn=0;intSyn<$scope.meaningList.length;intSyn++){
            if($scope.contains(textResponse,$scope.meaningList[intSyn])){
              $scope.counterLevel[$scope.details[j].word]=$scope.counterLevel[$scope.details[j].word]+1;
              counter=counter+1;
            }
          }
          for(var intSyn=0;intSyn<$scope.synonymList.length;intSyn++){
            if($scope.contains(textResponse,$scope.synonymList[intSyn])){
              $scope.counterLevel[$scope.details[j].word]=$scope.counterLevel[$scope.details[j].word]+1;
              counter=counter+1;
            }
          }
          if (counter>0){
            $scope.data.speechText="Your answer is correct!";
            $scope.parentmethod($scope);
            $scope.counterLevel.word=$scope.counterLevel.word+1;
          }
          else
          {
            $scope.data.speechText="I am sorry!Your answer is incorrect! Better luck next time!";
            $scope.parentmethod($scope);
          }
        }
        if(i==1)
        {
                alert("second if i=1");
                //alert("after recognition");
                //alert($scope.textResponse);
                //$timeout(callAtTimeout,3000);
              //function callAtTimeout() {
                
              /*while(count<=10){
                  alert($scope.textResponse);
                if($scope.textResponse==null||$scope.textResponse=='')
                { 
                  var count=0;
                  
                    count++;
                  
                }
                else 
                {*/

                
                    setTimeout(function(){ 

                          alert('hello');

              alert($scope.textResponse);
                      }, 5000);  
                

              console.log($scope.textResponse);
              alert($scope.textResponse);
              if($scope.textResponse!==''||$scope.textResponse!==null||$scope.textResponse!==""||$scope.textResponse!==undefined)
              {
              if($scope.contains($scope.textResponse,synonyms.split(',')[0])||$scope.contains($scope.textResponse,randNum)){
                $scope.data.speechText="Your answer is correct!";
                  $scope.counterLevel.word=$scope.counterLevel.word+1;
                  $scope.parentmethod($scope);
                  }
                else{
                $scope.data.speechText="Shoot!Your answer is incorrect! Better luck next time!";
                  $scope.parentmethod($scope);
              }
               }
          }
          //}
        //}
    }
    
  }
//$scope.makePostCall();  
}