'use strict';

const { pow } = Math;

const priceInput = document.getElementById('price_input');
const priceInputSlider = document.getElementById('price_slider');
const bankSelector = document.getElementById('length_of_loan_selector');
const monthlyOutput = document.getElementById('monthly_output');
const confirm = document.getElementById('confirm');

let banks;
let currentBank;

const getMonthlyPayment = (loan, interestRate, months) => {
  interestRate = interestRate / 100;
  const numenator = loan * (interestRate / 12) * pow((1 + interestRate / 12), months);
  const denumenator = pow((1 + interestRate / 12), months) - 1;
  return Math.round(numenator / denumenator);
}

const findBankByName = name => banks.find(element => element.name === name);

const loadBanks = async login => {
  banks = await postData('/bank/load', login);
  for (const bank of banks) {
    const { name } = bank;
    const option = bankSelector.appendChild(document.createElement('option'));
    option.innerHTML = name;
  }
  currentBank = banks[0];
  priceInputSlider.max = banks[0].maximumloan;
};

priceInputSlider.addEventListener('change', () => {
  const { value } = priceInputSlider;
  priceInput.value = value;
});

bankSelector.addEventListener('change', () => {
  priceInput.value = 0;
  priceInputSlider.value = 0;
  const bankName = bankSelector.value;
  currentBank = findBankByName(bankName);
  priceInputSlider.max = currentBank.maximumloan;
});

confirm.addEventListener('click', () => {
  const loan = priceInput.value;
  const interestRate = currentBank.interestrate;
  const months = currentBank.loanterm;
  monthlyOutput.value = getMonthlyPayment(loan, interestRate, months);
});



loadBanks(MY_LOGIN);


