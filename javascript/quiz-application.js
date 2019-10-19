/* Quiz Builder Application */
var quiz = {
    /* This is the method responsible for building the list of questions */ 
    buildQuiz : function () {

        var form = document.getElementById("quiz-form");

        /* Build the DIV element that holds each question with its options */
        for (var index in quizQuestions) {
            var number = parseInt(index) + 1; // This creates the question number
            var questionDiv = document.createElement("div"); 
            questionDiv.classList.add("question-div"); 

            /* The question itself will be in a H2 element */
            var question = document.createElement("h2");
            question.innerHTML = number + ") " + quizQuestions[index]['question'];
            questionDiv.appendChild(question);

            /* The options are going to be put in input radios */
            for (var optionIndex in quizQuestions[index]['options']) {
                
                var label = document.createElement("label");
                questionDiv.appendChild(label);
                
                var option = document.createElement("input");
                option.type = "radio";
                option.value = optionIndex;
                option.required = true;
                option.classList.add("quiz-option"); 
                
                option.name = "quiz-" + number;
                label.appendChild(option);
                
                /* Lists all the options for the previouly built question */
                var optionRadio = document.createTextNode(quizQuestions[index]['options'][optionIndex]);
                label.appendChild(optionRadio);
            }            

            /* Added an illustrative image to each question */
            var image = document.createElement("img");            
            image.src = quizQuestions[index]['imgSRC'];
            image.classList.add("question-image");
            questionDiv.appendChild(image);

            form.appendChild(questionDiv);
            

        }

        /* This is the submit button responsible for activating the evaluation function/method */
        var submitButton = document.createElement("input");
        submitButton.type = "submit";
        form.appendChild(submitButton);
        form.addEventListener("submit", quiz.submit);
    },

    /* This is the method responsible for evatuating the answers of the user */
    submit : function (evaluate) {    

        // Stops the form from submitting
        evaluate.preventDefault();
        evaluate.stopPropagation();
        
        var chosenOption = document.querySelectorAll(".quiz-option:checked");

        /* Computes the number of correct answers */
        var correctAnswer = 0;
        for (var index in quizQuestions) {
            if (chosenOption[index].value == quizQuestions[index]['answer']) {
                correctAnswer++;
            }
        }
        
        var total = chosenOption.length;
        var percent = correctAnswer / total ;

        /* Displays the score of the Answers provided by the user */
        var html = '<h2 class="resultHeader">';
        if (percent>=0.7) {
            html += "Congratulations! You know your Casablanca stuff!";
        } else if (percent>=0.4) {
            html += "At least you've seen the characters, right?!";
        } else {
            html += "Have you ever really watched the movie?";
        }
        html += "</h3>";
        html += '<div class="numberOfCorrect"><p>You got ' + correctAnswer + ' question out of ' + total + ' correct.</p></div>';
        html += '<button class="tryAgain"><a href="http://cit261.leonidasyopan.com/javascript/">Try Again</a></button>';

        document.getElementById("quiz-form").innerHTML = html;
        
    }
};

/* Calls the method to build the quiz on screen */
window.addEventListener("load", quiz.buildQuiz);