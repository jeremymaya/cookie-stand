'use strict';

var hourDay = ['6:00am','7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'];

function CookiesSold(location, minCust, maxCust, avgCookies) {
  this.name = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookies = avgCookies;
  CookiesSold.location.push(this.name);
  CookiesSold.projectedSales.push(this.simulateDay());
}
CookiesSold.location = [];
CookiesSold.projectedSales = [];

CookiesSold.prototype.randomCustPerHour = function() {
  return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
};

CookiesSold.prototype.simulateDay = function() {
  var daySales = [];
  for (var i = 0; i <= hourDay.length - 1; i++) {
    daySales.push(Math.floor(this.randomCustPerHour() * this.avgCookies));
  }
  return daySales;
};

function prepare() {
  hourDay.unshift('');
  for (var i = 0; i <= CookiesSold.location.length - 1; i++) {
    CookiesSold.projectedSales[i].unshift(CookiesSold.location[i]);
  }
}


var totalHour = ['Totals'];

function render() {
  prepare();
  var storeLocation = document.getElementById('storeLocation');
  for (var i = 0; i <= CookiesSold.location.length; i++) {
    var table = document.createElement('tr');
    storeLocation.appendChild(table);

    for (var j = 0; j <= hourDay.length - 1; j++) {
      if (i === 0) {
        var newHour = document.createElement('th');
        newHour.textContent = hourDay[j];
        table.appendChild(newHour);
      }
      else {
        newHour = document.createElement('td');
        newHour.textContent = CookiesSold.projectedSales[i-1][j];
        table.appendChild(newHour);
      }
    }
    storeLocation.appendChild(table);
  }
}

new CookiesSold('1st and Pike', 23, 65, 6.3);
new CookiesSold('SeaTac Airport', 3, 24, 1.2);
new CookiesSold('Seattle Center', 11, 38, 3.7);
new CookiesSold('Capitol Hill', 20, 38, 2.3);
new CookiesSold('Alki', 2, 16, 4.6);

console.log(CookiesSold.location);
console.log(CookiesSold.projectedSales);

render();
