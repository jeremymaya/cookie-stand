'use strict';


var hourDay = ['6am','7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

function CookiesSold(location, minCust, maxCust, avgCookies) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookies = avgCookies;
  CookiesSold.locationTest.push(this.location);
}
CookiesSold.locationTest = [];
CookiesSold.daySales = [];

CookiesSold.prototype.randomCustPerHour = function() {
  return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
};

CookiesSold.prototype.simulateDay = function() {
  for (var i = 0; i <= hourDay.length - 1; i++) {
    CookiesSold.daySales.push(Math.floor(this.randomCustPerHour() * this.avgCookies));
  }
};

var pike = new CookiesSold('1st and Pike', 23, 65, 6.3);
var seaTac = new CookiesSold('SeaTac Airport', 3, 24, 1.2);

console.log(pike);
console.log(pike.randomCustPerHour());
console.log(pike.simulateDay());
console.log(CookiesSold.daySales);
console.log(CookiesSold.locationTest);

function render() {
  var storeLocation = document.getElementById('storeLocation');
  for (var i = 0; i <= CookiesSold.locationTest.length - 1; i++) {
    var newLocation = document.createElement('h2');
    newLocation.textContent = CookiesSold.locationTest[i];
    storeLocation.appendChild(newLocation);

    var unoredred = document.createElement('ul');

    for (var j = 0; j <= CookiesSold.daySales.length - 1; j++) {
      var newHour = document.createElement('li');
      newHour.textContent = hourDay[j] + ': ' + CookiesSold.daySales[j] + ' cookies';
      unoredred.appendChild(newHour);
    }
    storeLocation.appendChild(unoredred);
  }
}
render();




/*
var pike = {
  location: '1st and Pike',
  minCust: 23,
  maxCust: 65,
  avgCookie: 6.3,
  simulated: [],
  custPerHour: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  },
  simulateDay: function() {
    for (var i = 0; i <= 14; i++) {
      this.simulated.push(parseInt(this.custPerHour() * this.avgCookie));
    }
  },
};

var seaTac = {
  location: 'SeaTac Airport',
  minCust: 3,
  maxCust: 24,
  avgCookie: 1.2,
  simulated: [],
  custPerHour: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  },
  simulateDay: function() {
    for (var i = 0; i <= 14; i++) {
      this.simulated.push(parseInt(this.custPerHour() * this.avgCookie));
    }
  },
};

var seattleCenter = {
  location: 'Seattle Center',
  minCust: 11,
  maxCust: 38,
  avgCookie: 3.7,
  simulated: [],
  custPerHour: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  },
  simulateDay: function() {
    for (var i = 0; i <= 14; i++) {
      this.simulated.push(parseInt(this.custPerHour() * this.avgCookie));
    }
  },
};

var capitolHill = {
  location: 'Capitol Hill',
  minCust: 20,
  maxCust: 38,
  avgCookie: 2.3,
  simulated: [],
  custPerHour: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  },
  simulateDay: function() {
    for (var i = 0; i <= 14; i++) {
      this.simulated.push(parseInt(this.custPerHour() * this.avgCookie));
    }
  },
};

var alki = {
  location: 'Alki',
  minCust: 2,
  maxCust: 16,
  avgCookie: 4.6,
  simulated: [],
  custPerHour: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  },
  simulateDay: function() {
    for (var i = 0; i <= 14; i++) {
      this.simulated.push(parseInt(this.custPerHour() * this.avgCookie));
    }
  },
};


var stores = [pike, seaTac, seattleCenter, capitolHill, alki];

var storeLocation = document.getElementById('storeLocation');
for (var i = 0; i <= stores.length - 1; i++) {
  var newLocation = document.createElement('h2');
  newLocation.textContent = stores[i].location;
  storeLocation.appendChild(newLocation);
  
  stores[i].simulateDay();
  console.log(stores[i].simulated);
  var total = 0;
  var elementSimulated = document.getElementById('storeLocation');
  for (var j = 0; j <= stores[i].simulated.length; j++) {
    if (j + 6 < 12) {
      var newHour = document.createElement('li');
      newHour.textContent = j + 6 + 'am: ' + stores[i].simulated[j] + ' cookies';
      elementSimulated.appendChild(newHour);
    }
    else if (j + 6 === 12) {
      newHour = document.createElement('li');
      newHour.textContent = '12pm: ' + stores[i].simulated[j] + ' cookies';
      elementSimulated.appendChild(newHour);
    }
    else if (j === stores[i].simulated.length) {
      newHour = document.createElement('li');
      newHour.textContent = 'Total: ' + total + ' cookies';
      elementSimulated.appendChild(newHour);
    }
    else {
      newHour = document.createElement('li');
      newHour.textContent = j - 6 + 'pm: ' + stores[i].simulated[j] + ' cookies';
      elementSimulated.appendChild(newHour);
    }
    total += stores[i].simulated[j];
  }
}
*/
