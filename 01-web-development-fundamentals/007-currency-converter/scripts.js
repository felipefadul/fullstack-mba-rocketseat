const amount = document.getElementById("amount");

function removeNonDigitCharacters(value) {
  const nonDigitCharacterRegex = /\D+/g;
  return value.replace(nonDigitCharacterRegex, "");
}

amount.addEventListener("input", () => {
  amount.value = removeNonDigitCharacters(amount.value);
});
