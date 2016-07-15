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
      question: "Donald Trump wants to stop Japan selling so many cars to the US.",
      options: ["true", "false"],
      answer: "true",
      trivia: "\"We allow Japan to sell us millions of cars with zero import tax and we can't make a trade deal with them - our country is in big trouble!\" Trump trumped on his Facebook page."
    },{
      question: "The Trump wanna be bffs with Vladimir Putin",
      options: ["true", "false"],
      answer: "true",
      trivia: "Trump told Fox News' Bill O'Reilly: \"I would be willing to bet that I'd have a great relationship with Vladimir Putin. It's about leadership.\""
    },{
      question: "Make every American have their birth certificate on them at all times for counter-terrorism purposes.",
      options: ["true", "false"],
      answer: "false",
      trivia: "Considering his views on mexicans and muslims, this foreign policy is surprisingly false!"
    },{
      question: "Create a super amendment called the Trump amendment that literally trumps all other amendments.",
      options: ["true", "false"],
      answer: "false",
      trivia: "This may not be true but it could very well be when he's elected."
    },{
      question: "Enforce a top secret, “foolproof” plan that will defeat Isis “quickly and effectively” but not tell anyone what it is.",
      options: ["true", "false"],
      answer: "true",
      trivia: "\"If I run, and if I win, I don’t want the enemy to know what I’m doing. Unfortunately, I’ll probably have to tell at some point, but there is a method of defeating them quickly and effectively and having total victory.\""
    },{
      question: "Build the Great Wall of Frump around Mexico and make Mexico pay for it.",
      options: ["true", "false"],
      answer: "true",
      trivia: "Trump says the wall will cost no more than $12 billion, but some experts estimate that it could require an investment of $25 billion or more, not including hefty maintenance costs."
    },{
      question: "Ban the national curriculum.",
      options: ["true", "false"],
      answer: "true",
      trivia: "Trump said in an interview that the national curriculum should be replaced by local curricula. \"I think that for people in Washington to be setting curriculum and to be setting all sorts of standards for people living in Iowa and other places is ridiculous.\""
    },{
      question: "Ban 'perverts' from public office.",
      options: ["true", "false"],
      answer: "true",
      trivia: "In a video message from his private jet, Trump spoke out about 'perverts' being elected to public office."
    },{
      question: "Ban new-born children in the US being named 'Donald'.",
      options: ["true", "false"],
      answer: "false",
      trivia: "He is the Trump after all."
    },{
      question: "Re-invade Iraq and take all its oil.",
      options: ["true", "false"],
      answer: "true",
      trivia: "In a 2011 interview, Trump said he would authorize another invasion of Iraq to replenish funds spent in the war. \"In the old days, you know when you had a war, to the victor belong the spoils. You go in. You win the war and you take it... You’re not stealing anything. You’re taking - we’re reimbursing ourselves - at least, at a minimum\""
    },{
      question: "Start charging Saudi Arabia up to $1bn/day for Middle East security.",
      options: ["true", "false"],
      answer: "true",
      trivia: "Trump said: \"I love the Saudis, many are in this building. They make a billion dollars a day. Whenever they have problems, we send over the ships. We send, we’re going to protect – what are we doing? They got nothing but money. If the right person asked them, they’d pay a fortune. They wouldn’t be there except for us.\""
    },{
      question: "Ban windmills.",
      options: ["true", "false"],
      answer: "true",
      trivia: "\"Wind is destroying the environment in many, many places. People are going crazy over the horrible, noisy, disgusting windmills. And they are horrible and a horrible intrusion, ruining communities.\""
    },{
      question: "Fund a mission to Mars by 2020 to search for ‘Mars oil’.",
      options: ["true", "false"],
      answer: "false",
      trivia: "nothing stopping him from building a wall"
    },{
      question: "Start a trade war with China.",
      options: ["true", "false"],
      answer: "true",
      trivia: "\"What you do to China is you say if you don’t behave we’re going to have to start taxing your goods coming into this country. … They charge us tariffs. We don’t charge them because we’re stupid.\""
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
