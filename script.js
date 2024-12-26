//getting elements
const transSelectElement = document.getElementById("transaction-select");
const descriptionElement = document.getElementById("description-input");
const amountElement = document.getElementById("amount-input");
const addBtn = document.getElementById("btn-add");
const tbodyOutput = document.getElementById("transaction-tbody");

let transactionArray = [];
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTransaction();
});

function clearAll() {
  transSelectElement.value = "";
  descriptionElement.value = "";
  amountElement.value = "";
}

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

//{id: 1735223150895, trans_type: 'income', trans_description: 'salary', trans_amount: '1000'}
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
}
function deleteTransaction(id) {
  if (confirm("Are You Sure To Delete?")) {
    let delete_trans = transactionArray.filter((item) => item.id != id);
    transactionArray = delete_trans;
    loadTransaction();
  }
}
