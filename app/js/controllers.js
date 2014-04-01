'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('MyCtrl', ['$scope',
        function ($scope) {

            $scope.loadVoices = function () {
                speechSynthesis.getVoices().forEach(function (voice) {
                    console.log(voice.name, voice.
                        default ? '(default)' : '');
                });
            }

            //voices are loaded async
            window.speechSynthesis.onvoiceschanged = function (e) {
                $scope.loadVoices();
            };


            var i = 0;
            var msg = new SpeechSynthesisUtterance();
            
            msg.voice = speechSynthesis.getVoices().filter(function (voice) {
                    return voice.name == 'native';
                })[0];
            
            msg.onstart = function (event) {
              
            }

            msg.onend = function (event) {

                if (i < $scope.ttsData.length) {
                    $scope.next();
                }

            };

            $scope.speechTemplate = function () {
                return "partials/speech1.html";

            }()

            $scope.next = function () {

                $scope.speechTemplate = function () {
                    return "partials/speech2.html";
                }()

                $scope.speak();
            }


            $scope.speak = function () {

                console.log('ival=' + i);
                $scope.ttsObj = $scope.ttsData[i++];

                msg.text = ($scope.ttsObj.ttsMessage);
               
                speechSynthesis.speak(msg);
            }


            $scope.ttsData = [
                {
                    "id": "tts1",
                    "template": "",
                    "displayText": "Welcome to Desert Code Camp",
                    "ttsMessage": "Welcome to Desert Code Camp"
            },
                {
                    "id": "tts2",
                    "template": "",
                    "displayText": "Hope you enjoy the show",
                    "ttsMessage": "Hope You Enjoy the Show"
            }
                              ]



  }]);