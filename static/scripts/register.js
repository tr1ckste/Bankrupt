'use strict';

const loginForm = document.getElementById('login_form');
const passwordForm = document.getElementById('password_form');
const submitButton = document.getElementById('submit');

const occupiedLoginWarning = document.getElementById('occupied_login_warning');
const emptyFieldWarning = document.getElementById('empty_field_warning');

const submitButtonHandler = async (login, password) => {
  if (!(login && password)) {
    occupiedLoginWarning.style.display = 'none';
    emptyFieldWarning.style.display = 'inline';
    return;
  }
  const response = await postData('/user/register', { login, password });
  occupiedLoginWarning.style.display = 'none';
  emptyFieldWarning.style.display = 'none';
  if (response === 'occupied') {
    occupiedLoginWarning.style.display = 'inline';
    emptyFieldWarning.style.display = 'none';
  }
  MY_LOGIN = response;
  console.log(response);
  document.location.href = '/static/html/bankManagement.html';
}

submitButton.addEventListener('click', async () => {
  const login = loginForm.value;
  const password = passwordForm.value;
  submitButtonHandler(login, password);
});
