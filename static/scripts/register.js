'use strict';

const loginForm = document.getElementById('login_form');
const passwordForm = document.getElementById('password_form');
const submitButton = document.getElementById('submit');

const occupiedLoginWarning = document.getElementById('occupied_login_warning');
const emptyFieldWarning = document.getElementById('empty_field_warning');

const postData = async (url, data) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
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
  const users = await getData('/users/getAll');
  if (!(login && password)) {
    occupiedLoginWarning.style.display = 'none';
    emptyFieldWarning.style.display = 'inline';
  }
}

submitButton.addEventListener('click', async () => {
  const login = loginForm.value;
  const password = passwordForm.value;
  if (login && password) {
    postData('/register', { login, password });
  }
});
