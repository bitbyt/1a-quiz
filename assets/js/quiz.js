// Quiz parameters

var makeQuiz = function(totalQuestions, questions) {
  this.player1Score = 0;
  this.player2Score = 0;
  this.player1Turn = true;
  this.questions = questions;
  this.totalQuestions = totalQuestions -1;
  this.currQnNo = -1;
  this.random = 0;
};

//Quiz functions

makeQuiz.prototype = {
  constructor: makeQuiz,

  numberOfQuestions: function() {
    return this.totalQuestions;
  },

  currentQuestion: function() {
    this.currQnNo = Math.floor(Math.random() * this.questions.length);
    return this.currQnNo;
  },

  correctAnswer: function() {
    var answer = this.questions[this.currQnNo].answer;
    return answer;
  },

  playerTurn: function(playerChoice) {
    if (this.currQnNo > -1) {
      if (playerChoice == this.correctAnswer()) {
        if (this.player1Turn) {
          this.player1Score++;
        } else {
          this.player2Score++;
        }
        this.updateQuestions();
        return true;
      } else {
        this.updateQuestions();
        return false;
      }
    } else {
      return true;
    }
  },

  updateQuestions: function() {
    this.player1Turn = !this.player1Turn;
    this.totalQuestions--;
    this.questions.splice(this.currQnNo, 1);
  },

  gameOver: function() {
    if (this.totalQuestions <= 0) {
      return true;
    } else {
      return false;
    }
  },

  checkWinner: function() {
    if (this.gameOver()) {
      if (this.player1Score > this.player2Score) {
        return 1;
      } else if (this.player2Score > this.player1Score) {
        return 2;
      } else {
        return 3;
      }
    }
    return 0;
  },
  //Get questions
  getQuestion: function() {
    return {
      question: this.questions[this.currQnNo].question,
      trivia: this.questions[this.currQnNo].trivia
    };
  },

  restart: function() {
    location.reload();
  }

};

$(document).ready(function() {
    console.log( "ready!" );
    var gameStart = true;
    var totalQns = 10;
    var buttons = $('button');
    var trivia = "";
    var questionList = [];

    var questionList = [{
      question: "Donald Trump once thought flying golden toilets were a good idea.",
      options: ["true", "false"],
      answer: "true",
      trivia: "In 1989 Trump bought over Eastern Air Lines with the intention to build a luxury airline service called The Trump Shuttles. Featuring maple wood veneer, chrome seat belt latches, and gold shit holes; it is testament to his obnoxious, frat boy business acumen. Of course it tanked in 3 years, what a champ!"
    }, {
      question: "Donald Trump attended a military academy for high school.",
      options: ["true", "false"],
      answer: "true",
      trivia: "trivia"
    },{
      question: "Among the strangest things Donald Trump has owned is a reptile farm in Florida",
      options: ["true", "false"],
      answer: "false",
      trivia: "Yes,"
    },{
      question: "The Trump wall will save all of America",
      options: ["true", "false"],
      answer: "false",
      trivia: "trivia"
    },{
      question: "question one",
      options: ["true", "false"],
      answer: "true",
      trivia: "trivia"
    },{
      question: "question one",
      options: ["true", "false"],
      answer: "true",
      trivia: "trivia"
    },{
      question: "question one",
      options: ["true", "false"],
      answer: "true",
      trivia: "trivia"
    },{
      question: "question one",
      options: ["true", "false"],
      answer: "true",
      trivia: "trivia"
    },{
      question: "question one",
      options: ["true", "false"],
      answer: "true",
      trivia: "trivia"
    },{
      question: "question one",
      options: ["true", "false"],
      answer: "true",
      trivia: "trivia"
    },{
      question: "question one",
      options: ["true", "false"],
      answer: "true",
      trivia: "trivia"
    },{
      question: "question one",
      options: ["true", "false"],
      answer: "true",
      trivia: "trivia"
    },{
      question: "question one",
      options: ["true", "false"],
      answer: "true",
      trivia: "trivia"
    },{
      question: "question one",
      options: ["true", "false"],
      answer: "true",
      trivia: "trivia"
    },{
      question: "question one",
      options: ["true", "false"],
      answer: "true",
      trivia: "trivia"
    }];


    console.log(questionList);

    var game = new makeQuiz(totalQns, questionList);

    function startGame() {
      $('.hidden').removeClass('hidden').addClass('show');
      updateGame();
    }

    function updateGame() {
      var currQn = game.currentQuestion();
      var question = game.getQuestion().question;
      trivia = game.getQuestion().trivia;
      var qnNumber = totalQns - game.numberOfQuestions();

      $('.game > h6').text('Question #' + qnNumber);
      $('.game > h4').text(question);

      if (game.player1Turn) {
        $('.info > h5').text('It\'s Player One\'s Turn');
      } else {
        $('.info > h5').text('It\'s Player Two\'s Turn');
      };

      updateScore();
    };

    function updateScore() {
      $('.player1 > .score').text(game.player1Score);
      $('.player2 > .score').text(game.player2Score);
    };

    function alertBox(type, winner) {
      var allowClickable = false;
      console.log(trivia);

      switch (type) {
        case 0:
        swal({
          title: "You got it!",
          text: trivia,
          confirmButtonText: "Next",
          allowOutsideClick: allowClickable,
          allowEscapeKey: false,
          customClass: "custom-alert",
          confirmButtonColor: 'none'
        }, function() {
          updateGame();
        });
        break;
        case 1:
        swal({
          title: "Ooops, that's not right!",
          text: trivia,
          confirmButtonText: "Next",
          allowOutsideClick: allowClickable,
          allowEscapeKey: false,
          customClass: "custom-alert",
          confirmButtonColor: 'none'
        }, function() {
          updateGame();
        });
        break;
        case 2:
        var result = "";
        if (winner === 3) {
          result = "It's a Draw!";
        } else {
          result = "Player" + winner + "won!";
        };
        swal({
          title: result,
          confirmButtonText: "Restart Game",
          allowOutsideClick: false,
          customClass: "custom-alert",
          confirmButtonColor: 'none'
        }, function(){
          game.restart();
        });
        break;
      }
    }

    $('.btn-game-state').click(function() {
      if (gameStart) {
        gameStart = false;
        $(this).text('Reset Game').toggleClass('btn-reset btn-game-state');
        startGame();
      } else {
        game.restart();
      }
    });

    $('.btn-option').click(function() {
      if (!game.gameOver() && !gameStart) {
        if (game.playerTurn($(this).val())) {
          alertBox(0);
        } else {
          alertBox(1);
        }
      }  else {
        game.playerTurn($(this).val());
        updateScore();
        var winner = game.checkWinner();
        alertBox(2, winner);
      }
    });

});
