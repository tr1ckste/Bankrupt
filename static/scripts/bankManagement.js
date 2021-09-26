'use strict';

const adder = document.getElementById('adder');
const closer = document.getElementById('close_popup');
const popup = document.querySelector('.bank_popup');
const confirmBank = document.getElementById('confirm_bank');
const inputs = document.querySelectorAll('.bank_input');
const hint = document.getElementById('hint');

const bankInputs = {
  name: document.getElementById('bank_name'),
  interestRate: document.getElementById('interest_rate'),
  maximumLoan: document.getElementById('maximum_loan'),
  minimumDownPayment: document.getElementById('minimum_down_payment'),
  loanTerm: document.getElementById('loan_term')
}

const checkInputs = inputs => {
  let content = true;
  for (const input of inputs) {
    content = content && input.value;
  }
  return content;
}

adder.addEventListener('click', () => {
  popup.style.display = 'block';
});

closer.addEventListener('click', () => {
  popup.style.display = 'none';
});

confirmBank.addEventListener('click', async () => {
  if(!checkInputs(inputs)) {
    hint.innerHTML = 'Fill in all the fields';
    hint.style.display = 'inline';
    return;
  }
  const values = {};
  for (const key in bankInputs) {
    values[key] = bankInputs[key].value;
  }
  const { name, interestRate, maximumLoan, minimumDownPayment, loanTerm } = values;
  if (interestRate > 100 || interestRate < 0) {
    hint.innerHTML = 'Unacceptable interest rate value';
    hint.style.display = 'inline';
    return;
  }

  const error = await postData('/bank/add', { login: MY_LOGIN, name, interestRate,
                                maximumLoan, minimumDownPayment, loanTerm });
  console.error();(error);
  document.location.href = '/static/html/bankManagement.html';
});


