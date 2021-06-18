const questions = document.querySelectorAll('.faq__question');
const answers = document.querySelectorAll('.faq__answer');
const questionIcons = document.querySelectorAll('.faq__btnIcon');

for (let i = 0; i < questions.length; i++) {
	questions[i].addEventListener('click', function(evt) {
    evt.preventDefault();
		answers[i].classList.toggle('faq__answer_show');
		questionIcons[i].classList.toggle('faq__btnIcon_rotate');
	});
};
