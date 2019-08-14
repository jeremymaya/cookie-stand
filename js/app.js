'use strict';

var hourDay = ['6am','7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

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


function render() {
  hourDay.unshift('');
  var storeLocation = document.getElementById('storeLocation');
  for (var i = 0; i <= CookiesSold.location.length - 1; i++) {
    var unoredred = document.createElement('tr');
    storeLocation.appendChild(unoredred);

    CookiesSold.projectedSales[i].unshift(CookiesSold.location[i]);
    for (var j = 0; j <= hourDay.length - 1; j++) {
      if (i === 0) {
        var newHour = document.createElement('th');
        newHour.textContent = hourDay[j];
        unoredred.appendChild(newHour);
      }
      else {
        newHour = document.createElement('td');
        newHour.textContent = CookiesSold.projectedSales[i-1][j];
        unoredred.appendChild(newHour);
      }
    }
    storeLocation.appendChild(unoredred);
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
