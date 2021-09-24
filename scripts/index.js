'use strict';

const { pow } = Math;

const priceInput = document.getElementById('price_input');
const priceInputSlider = document.getElementById('price_slider');

const bankData = {
  name: '',
  interestRate: null,
  maximumLoan: null,
  minimumDownPayment: null,
  loanTerm: null
}

priceInput.addEventListener('change', () => {
  const { value } = priceInput;
  priceInputSlider.value = value;
  console.log('inputChanged');
});

priceInputSlider.addEventListener('change', () => {
  const { value } = priceInputSlider;
  priceInput.value = value;
  console.log('sliderChanged');
});
