const myForm = document.querySelector("form");
let totalDictionaryOfPayments = {principalPartHTML: 0, interestHTML: 0, totalPaymentHTML: 0}
myForm.addEventListener("submit", function (event) {
  event.preventDefault();
    const input = event.target.elements.loanAmount.value;
    totalDictionaryOfPayments = {principalPartHTML: 0, interestHTML: 0, totalPaymentHTML: 0}
    loanAmount = input
    remainingAmount = input
    const loanschedule = document.querySelector(".output");
        setItemsFromArrayToTable();
    let row = tableBody.insertRow()
    row.className = "table-row"
    let numberHTML = row.insertCell(0);
    numberHTML.className = "table-data"
    numberHTML.innerHTML = ''
    let remainingAmountHTML = row.insertCell(1);
    remainingAmountHTML.className = "table-data"
    remainingAmountHTML.innerHTML = 'Total:'
    let principalPartHTML = row.insertCell(2);
    principalPartHTML.className = "table-data"
    principalPartHTML.innerHTML = totalDictionaryOfPayments.principalPartHTML.toFixed(2) + ' EUR'
    let interestHTML = row.insertCell(3);
    interestHTML.className = "table-data"
    interestHTML.innerHTML = totalDictionaryOfPayments.interestHTML.toFixed(2) + ' EUR'
    let totalPaymentHTML = row.insertCell(4);
    totalPaymentHTML.className = "table-data"
    totalPaymentHTML.innerHTML = totalDictionaryOfPayments.totalPaymentHTML.toFixed(2) + ' EUR'


})

let loanAmount = 0
let remainingAmount = 0
const yearlyInterest = 0.127
let numberOfPeriods = 6
let payment = PMT(0.127/12, 6, loanAmount)*-1

function PMT(ir, np, pv, fv, type) {
    /*
     * ir   - interest rate per month
     * np   - number of periods (months)
     * pv   - present value
     * fv   - future value
     * type - when the payments are due:
     *        0: end of the period, e.g. end of month (default)
     *        1: beginning of period
     */
    let pmt, pvif;

    fv || (fv = 0);
    type || (type = 0);

    if (ir === 0)
        return -(pv + fv)/np;

    pvif = Math.pow(1 + ir, np);
    pmt = ir * (pv * pvif + fv) / (pvif - 1);

    if (type === 1)
        pmt /= (1 + ir);

    return pmt;
}

function loadTableData(items) {
    let tableBody = document.getElementById("tableBody");
    items.forEach( item => {
      let row = tableBody.insertRow();
      row.className = "table-row"
      let numberHTML = row.insertCell(0);
      numberHTML.className = "table-data"
      numberHTML.innerHTML = item.numberHTML;
      let remainingAmountHTML = row.insertCell(1);
      remainingAmountHTML.className = "table-data"
      remainingAmountHTML.innerHTML = item.remainingAmountHTML;
      let principalPartHTML = row.insertCell(2);
      principalPartHTML.className = "table-data"
      principalPartHTML.innerHTML = item.principalPartHTML;
      let interestHTML = row.insertCell(3);
      interestHTML.className = "table-data"
      interestHTML.innerHTML = item.interestHTML;
      let totalPaymentHTML = row.insertCell(4);
      totalPaymentHTML.className = "table-data"
      totalPaymentHTML.innerHTML = item.totalPaymentHTML;
    });
  }


number = 0
function createPaymentCycle(loanAmountTest) {
  totalPayment = PMT(0.127/12, 6, loanAmount).toFixed(2)
  interest = (remainingAmount*yearlyInterest/12).toFixed(2)
  principalPart = (totalPayment - interest).toFixed(2)
  remainingAmount = (loanAmountTest - principalPart).toFixed(2)
  number++
  if (number === numberOfPeriods ) {
    principalPart = (parseFloat(principalPart) + parseFloat(remainingAmount)).toFixed(2)
    totalPayment = (parseFloat(totalPayment) + parseFloat(remainingAmount)).toFixed(2)
    remainingAmount = 0
  }
  totalDictionaryOfPayments.principalPartHTML =  totalDictionaryOfPayments.principalPartHTML + parseFloat(principalPart)
  totalDictionaryOfPayments.interestHTML += parseFloat(interest)
  totalDictionaryOfPayments.totalPaymentHTML += parseFloat(totalPayment)

 
  return [{ numberHTML: number, remainingAmountHTML: remainingAmount, principalPartHTML: principalPart, interestHTML: interest, totalPaymentHTML: totalPayment}]
}

function setItemsFromArrayToTable() {
  let i = 0;

  let arrayOfPayments = []

  for (let i = 0; i < numberOfPeriods; i++) {
    arrayOfPayments.push(createPaymentCycle(remainingAmount));
      }
    let tableBody = document.getElementById("tableBody");
    tableBody.remove()
    number = 0
    let tableElement = document.getElementById("myTable");
    newTableBody = document.createElement('tbody')
    newTableBody.id = ("tableBody")
    tableElement.appendChild(newTableBody)

  while (i < arrayOfPayments.length) {
  loadTableData(arrayOfPayments[i]);
  i++;
}
}
