'use strict';

const loginForm = document.getElementById('login_form');
const passwordForm = document.getElementById('password_form');
const submitButton = document.getElementById('submit');

const occupiedLoginWarning = document.getElementById('occupied_login_warning');
const emptyFieldWarning = document.getElementById('empty_field_warning');

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
};

const getData = async url => {
  let result;
  fetch(url)
    .then((response) => {
    return response.json();
    })
    .then((data) => {
      result = data;
    });
  return result;
};

const submitButtonHandler = async (login, password) => {
  if (!(login && password)) {
    occupiedLoginWarning.style.display = 'none';
    emptyFieldWarning.style.display = 'inline';
    return;
  }
  const error = await postData('/user/register', { login, password });
  occupiedLoginWarning.style.display = 'none';
  emptyFieldWarning.style.display = 'none';
  if (error === 'occupied') {
    occupiedLoginWarning.style.display = 'inline';
    emptyFieldWarning.style.display = 'none';
  }
}

submitButton.addEventListener('click', async () => {
  const login = loginForm.value;
  const password = passwordForm.value;
  submitButtonHandler(login, password);
});
