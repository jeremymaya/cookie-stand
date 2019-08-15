'use strict';

var form = document.getElementById('new-store');
var table = document.getElementById('sales-data');
var tbody = document.createElement('tbody');
var tfoot = document.createElement('tfoot');
var tr = document.createElement('tr');
var hour = ['6:00am','7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'];
var listOfStores = [];
var listOfNewStores = [];

//Object Constructor for Stores
function Store (location, minCust, maxCust, avgPerCust) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgPerCust = avgPerCust;
  this.salesGenerated = this.generateSales();
  this.dailyTotal = this.dailyTotal();
  listOfStores.push(this);
}

//Generates a random number of cookies sold based on the object properties
Store.prototype.salesData = function () {
  var randomGenerated = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  return Math.floor((randomGenerated * this.avgPerCust));
};

//Generates an array of sales data by pushing data generated from salesData prototype
Store.prototype.generateSales = function () {
  var sales = [];
  for (var i = 0; i < hour.length; i++) {
    sales.push(this.salesData());
  }
  return sales;
};

//Calculates daily total of cookies sold by adding all values in the array created from generateSales ptototype
Store.prototype.dailyTotal = function () {
  var sum = 0;
  for (var i = 0; i < this.salesGenerated.length; i++) {
    sum += this.salesGenerated[i];
  }
  return sum;
};

//Creates an array of hourly total and sum of daily total
function hourlyTotal () {
  var totals = [];
  for (var i = 0; i < hour.length; i++) {
    var sum = 0;
    for (var j = 0; j < listOfStores.length; j++) {
      sum += listOfStores[j].salesGenerated[i];
    }
    totals.push(sum);
  }
  var sumTotal = 0;
  for (var k = 0; k < totals.length; k++) {
    sumTotal += totals[k];
  }
  totals.push(sumTotal);
  return totals;
}

//Event listener that passes user entered store information to Store object constructor
//It prevents the page from regreshing
//It renders a new row of sales data for the entered store
//It should remove the old tfoot and render a new one with a updated total BUT it's not
function newStore(event) {
  event.preventDefault();
  var location = event.target.location.value;
  var minCust= parseInt(event.target.minCust.value);
  var maxCust = parseInt(event.target.maxCust.value);
  var avgPerCust = parseInt(event.target.avgPerCust.value);

  listOfNewStores.push(new Store (location, minCust, maxCust, avgPerCust));

  renderSalesTableBodyNew();
  rednderSalesTableFootAgain();

  form.reset();
  console.log(listOfStores);
  console.log(listOfNewStores);
}

//Draws the table head
function renderSalesTableHead () {
  var thead = document.createElement('thead');
  var tr = document.createElement('tr');
  var th = document.createElement('th');
  th.textContent = '';
  tr.appendChild(th);
  for (var i = 0; i < hour.length; i++) {
    th = document.createElement('th');
    th.textContent = hour[i];
    tr.appendChild(th);
  }
  th = document.createElement('th');
  th.textContent = 'Daily Sales Total';
  tr.appendChild(th);
  thead.appendChild(tr);
  table.appendChild(thead);
  tbody;
}

//Draws the table body using the object data stored in listOfStores
function renderSalesTableBody () {
  for (var i = 0; i < listOfStores.length; i++){
    var tr =document.createElement('tr');
    var td = document.createElement('td');
    td.textContent = listOfStores[i].location;
    tr.appendChild(td);
    for (var j = 0; j < hour.length; j++) {
      td = document.createElement('td');
      td.textContent = listOfStores[i].salesGenerated[j];
      tr.appendChild(td);
    }
    td = document.createElement('td');
    td.textContent = listOfStores[i].dailyTotal;
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
}

//Draws a row using the new object data stored in listOfNewStores
function renderSalesTableBodyNew () {
  for (var i = listOfNewStores.length - 1; i < listOfNewStores.length; i++){
    var tr =document.createElement('tr');
    var td = document.createElement('td');
    td.textContent = listOfNewStores[i].location;
    tr.appendChild(td);
    for (var j = 0; j < hour.length; j++) {
      td = document.createElement('td');
      td.textContent = listOfNewStores[i].salesGenerated[j];
      tr.appendChild(td);
    }
    td = document.createElement('td');
    td.textContent = listOfNewStores[i].dailyTotal;
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
}

//Draws the table foot using the array of hourly total calcualted from hourlyTotal function
function rednerSalesTableFoot () {
  table.appendChild(tbody);
  tfoot;
  tr;
  var td = document.createElement('td');
  td.textContent = 'Total';
  tr.appendChild(td);
  for (var i = 0; i < hour.length + 1; i++) {
    td = document.createElement('td');
    td.textContent = hourlyTotal()[i];
    tr.appendChild(td);
  }
  tfoot.appendChild(tr);
  table.appendChild(tfoot);
}

//Removes the existing table foot and draws a new table foot to disply new hourlyTotal
function rednderSalesTableFootAgain () {
  table.removeChild(tfoot); //Source: https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
  rednerSalesTableFoot();
}

new Store ('1st and Pike', 23, 65, 6.3);
new Store ('SeaTac Airport', 3, 24, 1.2);
new Store ('Seattle Center', 11, 38, 3.7);
new Store ('Capitol Hill', 20, 38, 2.3);
new Store ('Alki', 2, 16, 4.6);

renderSalesTableHead();
renderSalesTableBody();
form.addEventListener('submit', newStore);
rednerSalesTableFoot();
console.log(listOfStores);
