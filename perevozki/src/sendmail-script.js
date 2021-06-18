"use strict";

document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('form');

  form.addEventListener('submit', sendForm);

  async function sendForm(evt) {
    evt.preventDefault();

    let formData = new FormData(form);

    const pageBody = document.getElementsByTagName('body')

    form.classList.add('calculation__form_sending');
    pageBody.classList.add('no-scroll');

    let response = await fetch('sendmail.php', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      let result = await response.json();
      alert(result.message);
      form.reset();
      form.classList.remove('calculation__form_sending');
      pageBody.classList.remove('no-scroll');
    } else {
      alert('Упс... Что-то пошло не так');
      form.classList.remove('calculation__form_sending');
      pageBody.classList.remove('no-scroll');
    }
  };
});
