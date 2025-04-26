const currencyExchangeRate = {
  USD: { value: 5.71, symbol: "$" },
  EUR: { value: 6.46, symbol: "€" },
  GBP: { value: 7.57, symbol: "£" },
};

const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");

amount.addEventListener("input", () => {
  amount.value = removeNonDigitCharacters(amount.value);
});

form.onsubmit = (event) => {
  event.preventDefault();

  const currencyConverted = convertCurrency(
    amount.value,
    currencyExchangeRate[currency.value].value,
    currencyExchangeRate[currency.value].symbol
  );
};

function removeNonDigitCharacters(value) {
  const nonDigitCharacterRegex = /\D+/g;
  return value.replace(nonDigitCharacterRegex, "");
}

function convertCurrency(amount, price, symbol) {
  const convertedValue = amount * price;
  return `${symbol} ${convertedValue.toFixed(2)}`;
}
