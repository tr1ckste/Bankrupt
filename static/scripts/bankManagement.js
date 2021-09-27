'use strict';

const adder = document.getElementById('adder');
const closer = document.getElementById('close_popup');
const popup = document.querySelector('.bank_popup');
const confirmBank = document.getElementById('confirm_bank');
const inputs = document.querySelectorAll('.bank_input');
const hint = document.getElementById('hint');
const banksWrapper = document.querySelector('.wrapper');

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

const createHtmlBank = (name, interestRate, maximumLoan, minimumDownPayment, loanTerm) => {
  const mainDiv = document.createElement('div');
  mainDiv.className = 'bank';
  mainDiv.id = `bank_${name}`;
  const cross = mainDiv.appendChild(document.createElement('img'));
  cross.src = '/static/img/cross.png';
  cross.className = 'close_edit close';
  // const edit = mainDiv.appendChild(document.createElement('img'));
  // edit.src = '/static/img/edit.png';
  // edit.className = 'close_edit edit';
  // edit.style.right = '30px';
  const first = mainDiv.appendChild(document.createElement('div'));
  const second = mainDiv.appendChild(document.createElement('div'));
  const third = mainDiv.appendChild(document.createElement('div'));
  const img = first.appendChild(document.createElement('img'));
  img.src = '/static/img/bank.png';
  img.style.width = '100px';
  const nameH = first.appendChild(document.createElement('h3'));
  nameH.innerHTML = 'Name:';
  const nameP = first.appendChild(document.createElement('p'));
  nameP.innerHTML = name;
  const interestRateH = second.appendChild(document.createElement('h3'));
  interestRateH.innerHTML = 'Interest rate:';
  const interestRateP = second.appendChild(document.createElement('p'));
  interestRateP.innerHTML = interestRate;
  const maximumLoanH = second.appendChild(document.createElement('h3'));
  maximumLoanH.innerHTML = 'Maximum loan:';
  const maximumLoanP = second.appendChild(document.createElement('p'));
  maximumLoanP.innerHTML = maximumLoan;

  const minimumDownPaymentH = third.appendChild(document.createElement('h3'));
  minimumDownPaymentH.innerHTML = 'Minimum down payment:';
  const minimumDownPaymentP = third.appendChild(document.createElement('p'));
  minimumDownPaymentP.innerHTML = minimumDownPayment;
  const loanTermH = third.appendChild(document.createElement('h3'));
  loanTermH.innerHTML = 'Loan term:';
  const loanTermP = third.appendChild(document.createElement('p'));
  loanTermP.innerHTML = loanTerm;
  return mainDiv;
}

const removeBank = async (login, name) => {
  const resonse = await postData('/bank/delete', { login, name });
  document.location.href = '/static/html/bankManagement.html';
}

const loadBanks = async login => {
  const banks = await postData('/bank/load', login);
  console.log(banks);
  for (const bank of banks) {
    const { name, interestrate, maximumloan, minimumdownpayment, loanterm } = bank;
    const divBank = createHtmlBank(name, interestrate, maximumloan, minimumdownpayment, loanterm);
    divBank.querySelector('.close').addEventListener('click', async () => {
      const answer = confirm('Are you sure?');
      if (answer) await removeBank(MY_LOGIN, name);
    });
    banksWrapper.appendChild(divBank);
  }
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
  if (error) {
    hint.innerHTML = error;
    hint.style.display = 'inline';
    return;
  }
  document.location.href = '/static/html/bankManagement.html';
});

loadBanks(MY_LOGIN);