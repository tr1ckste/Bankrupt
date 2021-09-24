'use strict';

const loginForm = document.getElementById('login_form');
const passwordForm = document.getElementById('password_form');
const submitButton = document.getElementById('submit');

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

submitButton.addEventListener('click', () => {
  const login = loginForm.value;
  const password = passwordForm.value;
  if (login && password) {
    postData('/register', { login, password });
  }
});
