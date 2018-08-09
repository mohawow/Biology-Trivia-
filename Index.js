'use strict'

let scoreTotal = 0;
let questionNumber = 0;

function makeQuestion() {
	if (questionNumber <STORE.length) {
		return `
      <div class="row">
	      <section class="col-12 questionForm" role="contentinfo">
	        <h3 class="qHead">${STORE[questionNumber].question}</h3>
	          <form role="form">
	           <fieldset class="col-12 buttons"
						  role="radiogroup">
							<table>
	            <label class="answer">
	              <input id="btn0" type="radio" role="radio" value="${STORE[questionNumber].answerChoice[0]}" class="answerOption" name="answer" required>
	                <span id="opt1" class="answerChoice">${STORE[questionNumber].answerChoice[0]}</span>
	              </label>
	              <label class="answer">
	              <input id="btn2" type="radio" role="radio" value="${STORE[questionNumber].answerChoice[1]}" class="answerOption"  name="answer" required>
	                <span id="opt2" class="answerChoice">${STORE[questionNumber].answerChoice[1]}</span>
	              </label>
	              <label class="answer">
	              <input id="btn3" type="radio" role="radio" value="${STORE[questionNumber].answerChoice[2]}" class="answerOption"  name="answer" required>
	                  <span id="opt3" class="answerChoice">${STORE[questionNumber].answerChoice[2]}</span>
	              </label>
	              <label class="answer">
	              <input id="btn4" type="radio" role="radio" value="${STORE[questionNumber].answerChoice[3]}" class="answerOption"  name="answer" required>
	                <span id="opt4" class="answerChoice">${STORE[questionNumber].answerChoice[3]}</span>
	              </label>
	              <br>
	              <button class="answerBtn" role="button" value="Submit">Submit</button>
							</table>
	            </fieldset>
	          </form>
	        </section>
	    </div>`
    
  } else {
    finalScore();
    restartQuiz();
  }
};

function startQuiz() {
	$('.box').on('click', '.startBtn', function (event) {
		event.preventDefault();
		$('.box').remove();
		$('.questionBox').css('display', 'block');
		$('.questionNumber').text(1);
displayQuestion()
answerSubmition()
})};

function displayQuestion(){
  console.log(makeQuestion())
	$('.questionBox').html(makeQuestion());
}

function nextQuestion() {
	if (questionNumber <= STORE.length){
		$('main').on('click', '.nextBtn', function (event) {
			questionCounter();
			displayQuestion();
			answerSubmition();
		});

	} else {
		finalScore();
	};
}

function answerCorrect() {
	let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
	$('.questionBox').html( 
		`<div class='row'>
			<div class='col-12'>
				<section class='answerBoxCorrect' role='correctAnswerFeedBack'>
					<h2 class='response'> "Hooray! You got it right."</h2>
					<p class='feedBack'><span>${STORE[questionNumber].correctAnswer}</span> is the right answer!</p>
					<button class='nextBtn correctBtn' role='button'> Continue </button
				</section>
			</div>
		</div>`);
		scoreTable();
console.log('`answerCorrect` executed');	
}

function answerWrong () {
	let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
	let choice =$('input:checked');
    $('.questionBox').html(
    	`<div class='raw'>
    		<div class='col-12'>
    			<section class='answerBoxWrong' role='wrongAnswerFeedBack'
	    			<h2 class='response'> "Sorry! You got it wrong this time."</h2>
	    			<p class='feedBack'><span>${STORE[questionNumber].comment}</span></p>
	    			<button class='nextBtn wrongBtn' role='button'>Continue</button>
	    		</section>
	    	</div>
	    </div>`);
console.log('`answerWrong`  executed');
}

function scoreTable() {
	$(`.scoreTotal`).text(scoreTotal + 1);
	scoreTotal++;
	console.log('`scoreTable`  executed');
}

function answerSubmition() {
	$(`.questionForm`).on('submit', function (event) {
    event.preventDefault();
    let choice = $('input:checked');
    let userAnswer = choice.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (userAnswer === correctAnswer) {
      answerCorrect();
    } else {
      answerWrong();
    }
  });
}

function questionCounter() {
	questionNumber++;
	$('.questionNumber').text(questionNumber + 1);
}

function finalScore() {
	$('.questionBox').html(resultPage());
	$(`.scoreContainer`).css('display','none');
}

function restartQuiz() {
   $('main').on('click', '.restartBtn', function (event) {
    location.reload();
  });
 console.log('`restartQuiz` executed');
}

function resultPage() {
	$(`.questionNumber`).text(5)
  return `<div class="row">
        <div class="col-12 finalPage">
          <section role="contentinfo">
            <p><span class="scoreTotal">TOTAL SCORE: ${scoreTotal}</span></p>
            <button class="restartBtn peachBtn" role="button">Play again?</button>
          </section>
        </div>
      </div>`	
}

function biologyQuiz() {
	startQuiz();
	nextQuestion();
};


$(biologyQuiz);


