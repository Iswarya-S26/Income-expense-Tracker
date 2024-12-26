//getting elements
const transSelectElement = document.getElementById("transaction-select");
const descriptionElement = document.getElementById("description-input");
const amountElement = document.getElementById("amount-input");
const addBtn = document.getElementById("btn-add");
const tbodyOutput = document.getElementById("transaction-tbody");
//getting balances element
const total_element = document.getElementById("total-ouput");
const income_element = document.getElementById("income-output");
const expense_element = document.getElementById("expense-output");

// global transation array
let transactionArray = [];
let total_balance = 0;
let total_income = 0;
let total_expense = 0;

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTransaction();
});

//clearing input value
function clearAll() {
  transSelectElement.value = "";
  descriptionElement.value = "";
  amountElement.value = "";
}

//add transaction
function addTransaction() {
  if (
    transSelectElement.value == "" ||
    descriptionElement.value == "" ||
    amountElement.value == ""
  ) {
    alert("Please Enter Data");
    return;
  }
  const transObj = {
    id: Date.now(),
    trans_type: transSelectElement.value,
    trans_description: descriptionElement.value,
    trans_amount: amountElement.value,
  };
  console.log(transObj);
  transactionArray.push(transObj);
  clearAll();
  loadTransaction();
}

//load transaction
function loadTransaction() {
  let output = "";
  transactionArray.forEach((item, index) => {
    output += `
        <tr> 
        <td>${index + 1}.</td>
        <td>${item.trans_type}</td>
        <td>${item.trans_description}</td>
        <td>${item.trans_amount}</td>
        <td>
        <button>edit</button>
        <button data-id=${item.id} class="delete-btn">delete</button>
        </td>
        </tr>
        `;
  });
  //fetching all delete buttons
  tbodyOutput.innerHTML = output;
  const deleteBtns = document.querySelectorAll(".delete-btn");
  console.log(deleteBtns);
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let id = Number(e.target.dataset.id);
      console.log(id);
      deleteTransaction(id);
    });
  });
  displayBalance();
}

//{id: 1735223150895, trans_type: 'income', trans_description: 'salary', trans_amount: '1000'}
function displayBalance() {
  total_income = 0;
  total_expense = 0;
  transactionArray.forEach((item) => {
    if (item.trans_type == "income") {
      total_income += Number(item.trans_amount);
    } else {
      total_expense += Number(item.trans_amount);
    }
  });
  total_balance = total_income - total_expense;
  income_element.innerHTML = total_income.toFixed(2);
  expense_element.innerHTML = total_expense.toFixed(2);
  total_element.innerHTML = total_balance.toFixed(2);
}

//delete transcation
function deleteTransaction(id) {
  if (confirm("Are You Sure To Delete?")) {
    let updated_array = transactionArray.filter((item) => item.id != id);
    transactionArray = updated_array;
    loadTransaction();
  }
}
