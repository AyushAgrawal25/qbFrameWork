var myApp = angular.module('qbApp', []);
myApp.controller('qbCtrl', function($scope,$interval,$compile) {
    $scope.qbRadioValue=null;
    var qbQuestionDatas=[];


    var qbCreateQuestionDataFun=function(num){
        var qbQuestionNewData={};
        qbQuestionNewData.id=num;
        qbQuestionNewData.question_text={
            hindi:{
                id:num,
                text:"Hindi Text of Question ID "+num,
                status:1
            },
            english:{
                id:num,
                text:"English Text of Question ID "+num,
                status:1
            }
        }
        qbQuestionNewData.options=[];
        qbQuestionNewData.answer=null;
        for(let i=0; i<4; i++)
        {
            let qbOptionData={};
            qbOptionData.id=(num*100)+i;
            qbOptionData.option_text={
                hindi:{
                    id:(num*100)+i,
                    text:"Hindi Text of Option ID "+(num*100)+i,
                    status:1
                },
                english:{
                    id:(num*100)+i,
                    text:"English Text of Option ID "+(num*100)+i,
                    status:1
                }
            }
            qbOptionData.status=1;
            qbQuestionNewData.options.push(qbOptionData);
        }    
        qbQuestionNewData.status=1;
        return qbQuestionNewData;
    }

    var qbQuestionNum=0;
    var qbAjaxForData=function(){
        for(let i=0; i<5; i++)
        {
            qbQuestionDatas.push(qbCreateQuestionDataFun(qbQuestionNum+i));
        }
        qbQuestionNum+=5;
        console.log("Ajax is Called.");   
    }

    qbAjaxForData();
    qbAjaxForData();

    var qbQuestionGreatestNum=0;

    var qbQuestionCurrentNum=0;
    var qbQuestionBox=angular.element(document.querySelector("#qb-question-box"));
    var qbOptionsBox=angular.element(document.querySelector("#qb-options-box"));

    var qbShowQuestionFun =function(){
        $scope.qbRadioValue=qbQuestionDatas[qbQuestionCurrentNum].answer;
        var qbQuestionEnglishDiv=angular.element("<div  ng-if=\"!qbTextLanguage\" class=\"qb-question-english\" qb-question-id=\""+qbQuestionDatas[qbQuestionCurrentNum].id+"\">"+qbQuestionDatas[qbQuestionCurrentNum].question_text.english.text+"</div>");
        var qbQuestionHindiDiv=angular.element("<div  ng-if=\"qbTextLanguage\" class=\"qb-question-hindi\" qb-question-id=\""+qbQuestionDatas[qbQuestionCurrentNum].id+"\">"+qbQuestionDatas[qbQuestionCurrentNum].question_text.hindi.text+"</div>");
        
        qbQuestionBox.empty();
        qbQuestionBox.append($compile(qbQuestionEnglishDiv)($scope));
        qbQuestionBox.append($compile(qbQuestionHindiDiv)($scope));

        qbOptionsBox.empty();
        angular.forEach(qbQuestionDatas[qbQuestionCurrentNum].options,function(qbQuestionOption, key){
            var qbOptionEnglishDiv=angular.element("<div class=\"qb-option-wrap\" ng-if=\"!qbTextLanguage\"  ><input type=\"radio\" ng-model=\"$parent.qbRadioValue\" value=\""+qbQuestionOption.id+"\" ><div class=\"qb-option-english qb-option\">"+qbQuestionOption.option_text.english.text+"</div></div>");
            var qbOptionHindiDiv=angular.element("<div class=\"qb-option-wrap\" ng-if=\"qbTextLanguage\"  ><input type=\"radio\" ng-model=\"$parent.qbRadioValue\" value=\""+qbQuestionOption.id+"\" ><div class=\"qb-option-hindi qb-option\">"+qbQuestionOption.option_text.hindi.text+"</div></div>");
        
            qbOptionsBox.append($compile(qbOptionEnglishDiv)($scope));
            qbOptionsBox.append($compile(qbOptionHindiDiv)($scope))
        });
    }

    $scope.qbBackFun=function(){
        qbQuestionDatas[qbQuestionCurrentNum].answer=$scope.qbRadioValue;
        qbQuestionCurrentNum--;
        qbShowQuestionFun();
    }

    $scope.qbNextFun=function(){
        qbQuestionDatas[qbQuestionCurrentNum].answer=$scope.qbRadioValue;
        qbQuestionCurrentNum++;
        if(qbQuestionCurrentNum>qbQuestionGreatestNum)
        {
            if(qbQuestionCurrentNum%5==0)
            {
                qbAjaxForData();
            }
            qbQuestionGreatestNum=qbQuestionCurrentNum;
        }
        qbShowQuestionFun();
    }
    

    $scope.qbRadioValue=2;
    $scope.qbSubmitFun=function(){  
        qbQuestionDatas[qbQuestionCurrentNum].answer=$scope.qbRadioValue;
        console.log(qbQuestionDatas);
    }
    qbShowQuestionFun();
});

//<div class=\"gallery-pic-cover\">   <div class=\"gallery-pic\">   <img  src=\"images/pic1.jpg\" alt=\"Tedx NIT Raipur\">    </div>    </div>
