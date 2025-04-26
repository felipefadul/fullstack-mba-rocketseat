const exchangeRateToBRL = {
  USD: { value: 5.71, symbol: "$" },
  EUR: { value: 6.46, symbol: "€" },
  GBP: { value: 7.57, symbol: "£" },
};

const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

amount.addEventListener("input", () => {
  amount.value = removeNonDigitCharacters(amount.value);
});

form.onsubmit = (event) => {
  event.preventDefault();

  try {
    const selectedCurrency = currency.value;
    const currencyValueInBRL = exchangeRateToBRL[selectedCurrency].value;
    const currencySymbol = exchangeRateToBRL[selectedCurrency].symbol;

    const currencyConverted = convertCurrencyToBRL(
      amount.value,
      currencyValueInBRL
    );

    description.textContent = `${currencySymbol}1 ${selectedCurrency} = ${formatCurrencyToBRL(
      currencyValueInBRL
    )} BRL`;
    result.textContent = `${currencyConverted} BRL`;

    footer.classList.add("show-result");
  } catch (error) {
    footer.classList.remove("show-result");
    alert("An error has occurred while converting the currency.");
    throw error;
  }
};

function removeNonDigitCharacters(value) {
  const nonDigitCharacterRegex = /\D+/g;
  return value.replace(nonDigitCharacterRegex, "");
}

function convertCurrencyToBRL(amount, price) {
  const convertedValue = amount * price;
  return convertedValue.toFixed(2);
}

function formatCurrencyToBRL(value) {
  return Number(value).toLocaleString("en-US", {
    style: "currency",
    currency: "BRL",
  });
}
