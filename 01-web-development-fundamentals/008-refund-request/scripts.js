const amount = document.getElementById("amount");

amount.oninput = () => {
  const amountValue = removeNonDigitCharacters(amount.value);
  const amountValueInCents = Number(amountValue) / 100;
  amount.value = formatCurrencyToUSD(amountValueInCents);
};

function removeNonDigitCharacters(value) {
  const nonDigitCharactersRegex = /\D+/g;
  return value.replace(nonDigitCharactersRegex, "");
}

function formatCurrencyToUSD(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
