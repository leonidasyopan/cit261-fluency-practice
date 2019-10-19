/* Quiz Builder Application */
var quiz = {
    buildQuiz : function () {

    var form = document.getElementById("quiz-form");

    /* Build the DIV element that holds each question with its options */
    for (var list in quizQuestions) {
    var number = parseInt(index) + 1; // The current question number
    var qwrap = document.createElement("div"); // A div wrapper to hold this question and options
    qwrap.classList.add("question"); // CSS class, for cosmetics

    // The question - <h1> header
    var question = document.createElement("h2");
    question.innerHTML = number + ") " + quizQuestions[index]['question'];
    qwrap.appendChild(question);

    // The options - <input> radio buttons and <label>
    for (var oindex in quizQuestions[index]['options']) {
        // The <label> tag
        var label = document.createElement("label");
        qwrap.appendChild(label);

        // The <option> tag
        var option = document.createElement("input");
        option.type = "radio";
        option.value = oindex;
        option.required = true;
        option.classList.add("oquiz"); // Will explain this later in function submit below

        // Remember that a radio button group must share the same name
        option.name = "quiz-" + number;
        label.appendChild(option);

        // Add the option text
        var otext = document.createTextNode(quizQuestions[index]['options'][oindex]);
        label.appendChild(otext);
    }

    // Finally, add this question to the main HTML quiz wrapper
    form.appendChild(qwrap);
    }

    // Attach submit button + event handler to the quiz wrapper
    var submitbutton = document.createElement("input");
    submitbutton.type = "submit";
    form.appendChild(submitbutton);
    form.addEventListener("submit", quiz.submit);
},

submit : function (evt) {
// quiz.submit() : Handle the calculations when the user submits to quiz

    // Stop the form from submitting
    evt.preventDefault();
    evt.stopPropagation();

    // Remember that we added an "oquiz" class to all the options?
    // We can easily get all the selected options this way
    var selected = document.querySelectorAll(".oquiz:checked");

    // Get the score
    var score = 0;
    for (var index in quizQuestions) {
    if (selected[index].value == quizQuestions[index]['answer']) {
        score++;
    }
    }

    // We can calculate the score now
    var total = selected.length;
    var percent = score / total ;

    // Update and show the score
    // Instead of creating elements, we can also directly alter the inner HTML
    var html = "<h1>";
    if (percent>=0.7) {
    html += "WELL DONE!";
    } else if (percent>=0.4) {
    html += "NOT BAD!";
    } else {
    html += "TRY HARDER!";
    }
    html += "</h1>";
    html += "<div>You scored " + score + " out of " + total + ".</div>";
    document.getElementById("quiz-form").innerHTML = html;
}
};

/* [INIT] */
window.addEventListener("load", quiz.buildQuiz);