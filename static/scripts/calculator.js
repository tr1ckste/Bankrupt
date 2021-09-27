'use strict';

const { pow } = Math;

const priceInput = document.getElementById('price_input');
const downPaymentInput = document.getElementById('down_payment');
const priceInputSlider = document.getElementById('price_slider');
const downPaymentSlider = document.getElementById('down_payment_slider');
const bankSelector = document.getElementById('length_of_loan_selector');
const monthlyOutput = document.getElementById('monthly_output');
const confirmButton = document.getElementById('confirm');
const hint = document.getElementById('hint');

let banks;
let currentBank;

const getMonthlyPayment = (loan, downPayment, interestRate, months) => {
  interestRate = interestRate / 100;
  const borrowedMoney = loan - downPayment;
  const numenator = borrowedMoney * (interestRate / 12) * pow((1 + interestRate / 12), months);
  const denumenator = pow((1 + interestRate / 12), months) - 1;
  return Math.round(numenator / denumenator);
}

const findBankByName = name => banks.find(element => element.name === name);

const renewInputs = () => {
  priceInputSlider.max = currentBank.maximumloan;
  priceInputSlider.min = currentBank.minimumdownpayment;
  downPaymentSlider.max = currentBank.maximumloan;
  downPaymentSlider.min = currentBank.minimumdownpayment;
  downPaymentInput.value = currentBank.minimumdownpayment;
  priceInput.value = currentBank.minimumdownpayment;
  monthlyOutput.value = 0;
}

const loadBanks = async login => {
  banks = await postData('/bank/load', login);
  for (const bank of banks) {
    const { name } = bank;
    const option = bankSelector.appendChild(document.createElement('option'));
    option.innerHTML = name;
  }
  currentBank = banks[0];
  if (!currentBank) return;
  renewInputs();  
};

priceInputSlider.addEventListener('change', () => {
  const { value } = priceInputSlider;
  priceInput.value = value;
});

downPaymentSlider.addEventListener('change', () => {
  const { value } = downPaymentSlider;
  downPaymentInput.value = value;
});

bankSelector.addEventListener('change', () => {
  priceInput.value = 0;
  priceInputSlider.value = 0;
  const bankName = bankSelector.value;
  currentBank = findBankByName(bankName);
  renewInputs();
});

confirmButton.addEventListener('click', () => {
  const loan = priceInput.value;
  const downPayment = downPaymentInput.value;
  const interestRate = currentBank.interestrate;
  const months = currentBank.loanterm;
  if (+downPayment > +loan) {
    hint.innerHTML = 'Down payment must be less then loan';
    hint.style.display = 'inline';
    return;
  }
  hint.style.display = 'none';
  monthlyOutput.value = getMonthlyPayment(loan, downPayment, interestRate, months);
});

loadBanks(MY_LOGIN);  



