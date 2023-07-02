let set_budget_btn = document.getElementById('set-budget-btn')
let expense_btn = document.getElementById('expense-btn')
set_budget_btn.addEventListener('click', set_budget)
expense_btn.addEventListener('click', expenses)

function allrecord() {   //allrecord display total records
  let set_budget = JSON.parse(localStorage.getItem('set_budget'))
  let ex_budget = JSON.parse(localStorage.getItem('budget_details'))
  let total_budget = 0;
  let sum = 0
  for (let x of set_budget) {   // sum of total budget
    total_budget += x.set_amount
  }
  document.getElementById('amount').innerHTML = total_budget
  for (x of ex_budget) {   //sum of total expanses
    sum += x.ex_amount
  }
  document.getElementById("expenditure-value").innerHTML = sum
  document.getElementById('balance-amount').innerHTML = total_budget - sum
  viewdata()
}

function set_budget() {    
  let total_amount = document.getElementById('total-amount')
  let budget_error = document.getElementById('budget-error')
  if (total_amount.value != "") {     
    budget_error.style.display = "none"
    let amount = document.getElementById('amount')
    let data = JSON.parse(localStorage.getItem("set_budget")) || [] //get data from localStorage
    let sum = 0
    let obj = {   
      set_amount: parseFloat(total_amount.value)
    }
    data.push(obj)   //push object  
    for (x of data) {  // sum of total budget
      sum += x.set_amount
    }
    document.getElementById("amount").innerHTML = sum

    localStorage.setItem("set_budget", JSON.stringify(data)) //set data in localStorage
    amount.innerHTML = sum
    total_amount.value = ""
    total_balance()  //display total balance
  }
  else {
    budget_error.style.display = "block"
  }
}

function expenses() { 
  let product_title = document.getElementById('product-title')
  let expanse_amount = document.getElementById('user-amount')
  let product_title_error = document.getElementById('product-title-error')
  if ((product_title.value != "") && (expanse_amount.value != "")) {  //if any input empty show error message
    product_title_error.style.display = "none"
    let expenditure_value = document.getElementById("expenditure-value")

    let data = JSON.parse(localStorage.getItem("budget_details")) || []  //get data from localStorage
    let obj = {                     
      title: product_title.value,
      ex_amount: parseFloat(expanse_amount.value)
    }
    data.push(obj)                 
    let sum = 0
    for (x of data) {              // sum of expanse amount
      sum += x.ex_amount
    }
    expenditure_value.innerHTML = sum

    localStorage.setItem("budget_details", JSON.stringify(data))    //set data to localStorage
    total_balance()  //display total balance
    viewdata()    //display transactions 
    expanse_amount.value = ""
    product_title.value = ""
  }
  else {
    product_title_error.style.display = "block"
  }
}

function total_balance() {     //display total balance
  let amount = document.getElementById('amount')
  let expenditure_value = document.getElementById('expenditure-value')
  let balance_amount = document.getElementById('balance-amount')
  let balance = parseFloat(amount.innerHTML) - parseFloat(expenditure_value.innerHTML)
  balance_amount.innerHTML = balance
}

function viewdata() {   //display transactions
  let data = JSON.parse(localStorage.getItem("budget_details"))
  let tbl = ""
  data.forEach((val) => {
    tbl += `
                   <div class="row py-1 rounded-3">
                      <div class="col-6 bg-secondary ps-3 rounded-start">${val.title}</div>
                      <div class="col-6 bg-secondary text-end pe-5 rounded-end">${val.ex_amount}</div>
                    </div>
    `
  });
  document.getElementById("list").innerHTML = tbl
}