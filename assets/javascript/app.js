//You'll create a trivia game that shows only one question until the player answers it or their time runs out.
//First set an variable for the timer.
//The counter will count down from the start time. 
var timer;
var countStart = 20;
var panel = $('#trivia');

//Create the click events for the buttons.
//Create start button to start the game.
//Use jQuery to prepend the questions after the start button is clicked.
$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">20</span> Seconds</h2>');
  game.loadQuestion(e);
});

//Create button for the player to choose an answer.
$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

//Create button to restart the game (without reloading the page).
$(document).on('click', '#start-over', function(e) {
  game.reset(e);
});

//Create the an array list of questions and answers with properties and values that the player will choose from. 
var questions = [{
  question: 'What sitcom depicts a Family of "Monsters?"',
  answers: ["Family Matters", "Monsters Inc.", "The Munsters", "The Adams Family"],
  correctAnswer: "The Munsters",
  image:"assets/images/munsters.gif"
}, {
  question: 'What sitcom is modeled after "The Bull & Finch Pub?"',
  answers: ["Cheers", "Pete's Tavern", "The Regal Beagle", "American Bar"],
  correctAnswer: "Cheers",
  image:"assets/images/cheers.gif"
}, {
  question: 'What animated sitcom was created by "Matt Groening?"',
  answers: ["Family Guy", "The Critic", "The Simpsons", "Futurama"],
  correctAnswer: "The Simpsons",
  image:"assets/images/simpsons.gif"
}, { 
  question: 'Which sitcom featured a rich couple who moved into a luxury apartment building?',
  answers: ["A Different World", "All in the Family", "The Jeffersons", "Good Times"],
  correctAnswer: "The Jeffersons",
  image:"assets/images/georgej.gif"
}, {
  question: "What sitcom with two attractive young women and one handsome young man living together?",
  answers: ["Three's Company", " That 70s Show", "Happy Endings", "Girlfriends "],
  correctAnswer: "Three's Company",
  image:"assets/images/tc.gif"
}, {
  question: 'What dance move became famous for the sitcom: "Fresh Prince of Bel-Air?"',
  answers: ["The Carlton", "The Twist", "The Macarena", "The Mash Potato"],
  correctAnswer: "The Carlton",
  image:"assets/images/carlton.gif"
}, {
  question: "What sitcom's housewife could do magical acts with a signature wiggle of her nose?",
  answers: ["Roseanne", "Free Spirit", "Bewitched", "Tabitha"],
  correctAnswer: "Bewitched",
  image:"assets/images/bewitched.gif"
}, {
  question: "What sitcom featured three women detectives with a mysterious boss?",
  answers: ["The Golden Girls", "Who's the Boss?", "Broke Girls", "Charlie's Angels"],
  correctAnswer: "Charlie's Angels",
  image:"assets/images/ca.gif"
}];


//Using jQuery methods.
//Create a loop that will loop through the game questions, answers, and timmer.
//If the player runs out of time, tell the player that time's up and display the correct answer. Else wait a few seconds, then show the next question.
var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStart,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('OOPS! TIME UP');
      game.timeUp();
    }
  },
	
//After a few seconds, display the next question -- do this without user input.
//Load the assets back in and reset the counter.
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h4>' + questions[this.currentQuestion].question + '</h4>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStart;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);
	  
//If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds (set timer), then show the next question. 
	panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img class="answerImgs" src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },	
	
//Using jQuery methods.		
//Create methods to show the number of correct answers, incorrect answers. And set the timer to reset the game.	
  results: function() {
    clearInterval(timer);

    panel.html('<h2>Here are your results!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
	
//If the player selects the correct answer, show a screen congratulating them for choosing the right option. 
//If the player selects the wrong answer, show a screen letting the player know taht they chose the wrong answer.
//Append image to show in the tv screen after right or wrong answer.

//This scenario is similar for wrong answers and time-outs.
//Clear the timmer and add the assets. 
//If the answer is incorrect reset the counter else if the answer is correct reset the counter.
	
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nah!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img class="answerImgs" src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img class="answerImgs" src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },
	
//If the player choses to play again this will reset all assets.
//Reset all assets to 0 and the counter. 
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStart;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
