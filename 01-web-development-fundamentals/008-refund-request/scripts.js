const form = document.querySelector("form");
const title = document.getElementById("title");
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const expenseList = document.querySelector("ul");
const expenseQuantity = document.querySelector("aside header p span");
const expenseTotalAmount = document.querySelector("aside header h2");

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

form.onsubmit = (event) => {
  event.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    title: title.value,
    category: {
      id: category.value,
      name: category.options[category.selectedIndex].text,
    },
    amount: amount.value,
    createdAt: new Date().toISOString(),
  };

  addExpense(newExpense);
  updateTotalAmount();

  form.reset();
  title.focus();
};

function addExpense(newExpense) {
  try {
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute(
      "src",
      `./assets/icons/${newExpense.category.id}.svg`
    );

    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    const expenseInfoTitle = document.createElement("strong");
    expenseInfoTitle.textContent = newExpense.title;

    const expenseInfoCategory = document.createElement("span");
    expenseInfoCategory.textContent = newExpense.category.name;

    expenseInfo.append(expenseInfoTitle, expenseInfoCategory);

    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>$</small>${newExpense.amount.replace(
      "$",
      ""
    )}`;

    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "./assets/icons/remove.svg");
    removeIcon.setAttribute("alt", "Remove expense");
    removeIcon.onclick = () => {
      expenseItem.remove();
      updateTotalAmount();
    };

    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);
    expenseList.append(expenseItem);
  } catch (error) {
    console.error(error);
    alert("An unexpected error has occurred.");
  }
}

function updateTotalAmount() {
  const totalItems = expenseList.children.length;

  expenseQuantity.textContent = `${totalItems} ${
    totalItems === 1 ? "expense" : "expenses"
  }`;

  let totalAmountInCents = 0;
  for (const expense of expenseList.children) {
    const itemAmount = expense.querySelector(".expense-amount");
    const itemAmountValue = removeNonDigitCharacters(itemAmount.textContent);
    const itemAmountValueInCents = Number(itemAmountValue) / 100;

    if (isNaN(itemAmountValueInCents)) {
      alert("Invalid amount value.");
      return;
    }

    totalAmountInCents += itemAmountValueInCents;
  }

  expenseTotalAmount.innerHTML = `<small>$</small>${formatCurrencyToUSD(
    totalAmountInCents
  ).replace("$", "")}`;
}
