// constants
const CURRENCY_USD = 'USD';
const CURRENCY_CAD = 'CAD';
const USD_CAD_CONVERSION = 1.36;
const CAD_USD_CONVERSION = 0.73;
const ERROR_VISIBLE_CLASS = 'amount-error--visible';
const FLAG_US = 'flag--us';
const FLAG_CA = 'flag--ca';

// target form from DOM
const form = document.getElementById('convert-form');

if (form) {
  // target inputs
  let amountInput = form.querySelector('#amount');
  let amountCurrency = amountInput.dataset.currency;
  const amountInputError = form.querySelector('#amount-error');
  let convertedAmountInput = form.querySelector('#converted-amount');
  let convertedAmountCurrency = convertedAmountInput.dataset.currency;
  const switchButton = form.querySelector('#switch');

  const getInputValue = function(inputField) {
    return parseFloat(inputField.value);
  }

  const validateAmountValue =  function(inputValue) {
    return !isNaN(inputValue);
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    amountInputError.classList.remove(ERROR_VISIBLE_CLASS);
    const amountValue = getInputValue(amountInput);
    if (validateAmountValue(amountValue)) {
      const convertedAmountValue = amountCurrency == CURRENCY_USD ?
        amountValue * USD_CAD_CONVERSION : amountValue * CAD_USD_CONVERSION;
      convertedAmountInput.value = convertedAmountValue.toFixed(2);
    } else {
      amountInputError.classList.add(ERROR_VISIBLE_CLASS);
    }
  });

  switchButton.addEventListener('click', function(e) {
    e.preventDefault();
    if (!amountInputError.classList.contains(ERROR_VISIBLE_CLASS)) {
      const amountValue = getInputValue(amountInput);
      const convertedAmountValue = getInputValue(convertedAmountInput);
      const amountButton = amountInput.nextElementSibling;
      const amountButtonFlag = amountButton.querySelector('.flag');
      const amountButtonCurrency = amountButton.querySelector('.button-currency');
      const convertedAmountButton = convertedAmountInput.nextElementSibling;
      const convertedAmountButtonFlag = convertedAmountButton.querySelector('.flag');
      const convertedAmountButtonCurrency = convertedAmountButton.querySelector('.button-currency');
      if (amountCurrency == CURRENCY_USD) {
        amountInput.value = convertedAmountValue;
        amountCurrency = CURRENCY_CAD;
        amountButtonCurrency.textContent = CURRENCY_CAD;
        amountButtonFlag.classList.remove(FLAG_US);
        amountButtonFlag.classList.add(FLAG_CA);
        convertedAmountInput.value = amountValue;
        convertedAmountCurrency = CURRENCY_USD;
        convertedAmountButtonCurrency.textContent = CURRENCY_USD;
        convertedAmountButtonFlag.classList.remove(FLAG_CA);
        convertedAmountButtonFlag.classList.add(FLAG_US);
      } else {
        amountInput.value = convertedAmountValue;
        amountCurrency = CURRENCY_USD;
        amountButtonCurrency.textContent = CURRENCY_USD;
        amountButtonFlag.classList.remove(FLAG_CA);
        amountButtonFlag.classList.add(FLAG_US);
        convertedAmountInput.value = amountValue;
        convertedAmountCurrency = CURRENCY_CAD;
        convertedAmountButtonCurrency.textContent = CURRENCY_CAD;
        convertedAmountButtonFlag.classList.remove(FLAG_US);
        convertedAmountButtonFlag.classList.add(FLAG_CA);
      }
    }
  });
}
