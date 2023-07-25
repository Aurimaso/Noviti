// var items1 = [
//     { date: "10/17/2018", name: "john doe" },
//     { date: "10/18/2018", name: "jane doe" },
//   ];
//   var items2 = [
//     { date: "10/17/2019", name: "john doe" },
//     { date: "10/18/2019", name: "jane doe" },
//   ];
//   function loadTableData(items) {
//     const table = document.getElementById("testBody");
//     items.forEach( item => {
//       let row = table.insertRow();
//       let date = row.insertCell(0);
//       date.innerHTML = item.date;
//       let name = row.insertCell(1);
//       name.innerHTML = item.name;
//     });
//   }
// //   loadTableData(items1);
// //   loadTableData(items2);
// //   loadTableData([]);


//   var array = [items1, items2]

//   let i = 0;

// while (i < array.length) {
//     loadTableData(array[i]);
//     i++;
// }

function createPaymentCycle(loanAmount) {
  // totalPayment = PMT(0.127/12, 6, loanAmount)*-1
  // interest = loanAmount*yearlyInterest/12
  // remainingAmount = remainingAmount - totalPayment
  // principalPart = totalPayment - interest
  // number++
 
  item = { number: 1, remainingAmount: 10052.27, principalPart: 1947.73, interest: 127.00, totalPayment: PMT(0.127/12, 6, loanAmount)*-1}
  return item
  // return {number: number, remainingAmount: remainingAmount, principalPart: principalPart, interest: interest, totalPayment: totalPayment}
}

console.log(createPaymentCycle(12000))



