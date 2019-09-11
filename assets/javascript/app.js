//buttons on the page that respond to a click
window.onload = function() {
    $("#start-button").on("click", stopwatch.start);
    $(".choice").on("click", stopwatch.correctCount);
    $("#done-button").on("click", stopwatch.stop);
    $("#restart-button").on("click", stopwatch.reset);
};

var intervalId;
var clockRunning = false;
var correctAnswers = 0;

// stopwatch object and its functions
var stopwatch = {
    time: 60,

    // this will check to see if the answers are correct
    correctCount: function() {
        
        if (clockRunning) {
            var selection = $(this).val().trim();
            if (selection === "correct" && correctAnswers < 7) {
                correctAnswers++
            }

            //if all of the questions are correct, the timer stops
            else if (correctAnswers > 7) {
                stopwatch.stop();
            }
        }

        //will not allow you to select an answer without clicking start
        else if (!clockRunning) {
            event.preventDefault();
        }
    },

    //reset button
    reset: function() {
        stopwatch.stop();
        stopwatch.time = 60;
        correctAnswers = 0;
        $("#time-remaining").text("1:00");
        $("input[type='radio']").prop('checked', false);
    },

    //start button
    start: function() {
        if (!clockRunning) {
            intervalId = setInterval(stopwatch.count, 1000);
            clockRunning = true;
        }
    },

    //stop button
    stop: function() {
        clearInterval(intervalId);
        clockRunning = false;

        //changes the time to your score once the game is over
        $("#time-remaining").html("Score:" + correctAnswers + "/7");
    },

    //the countdown function
    count: function() {
        if (stopwatch.time > 0) {
            stopwatch.time--;
            var converted = stopwatch.timeConverter(stopwatch.time);

            //dispays the time to text
            $("#time-remaining").text(converted);
        }
        else {
            stopwatch.stop();
        }
    },

    //function that converts the time to display it in minutes and seconds
    timeConverter: function(t) {
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
        }
};         