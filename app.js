'use strict';
var products = [];
var imageFile = []; //image path array
var totalClicks = 0;

var imageLeft = document.getElementById('leftimage');
var imageCenter = document.getElementById('centerimage');
var imageRight = document.getElementById('rightimage');

var bag = new Product('Star Wars Luggage', 'images/bag.jpg', 'bag');
var banana = new Product('Banana Slicer', 'images/banana.jpg', 'banana');
var bathroom = new Product('Bathroom Tablet Holder', 'images/bathroom.jpg', 'bathroom');
var boots = new Product('Toeless Rain Boots', 'images/boots.jpg', 'boots');
var breakfast = new Product('Breakfast Cooking Station', 'images/breakfast.jpg', 'breakfast');
var bubbleGum = new Product('Meatball Bubble Gum', 'images/bubblegum.jpg', 'bubblegum');
var chair = new Product('Rounded Chair', 'images/chair.jpg', 'chair');
var cthulhu = new Product('Cthulhu Action Figure', 'images/cthulhu.jpg', 'cthulhu');
var dogDuck = new Product('Duck Bill Muzzle', 'images/dog-duck.jpg', 'dogduck');
var dragon = new Product('Dragon Meat', 'images/dragon.jpg', 'dragon');
var pen = new Product('Pen Cutlery', 'images/pen.jpg', 'pen');
var petSweep = new Product('Pet Sweeper', 'images/pet-sweep.jpg', 'petsweep');
var scissors = new Product('Pizza Scissors', 'images/scissors.jpg', 'scissors');
var shark = new Product('Shark Sleeping Bag', 'images/shark.jpg', 'shark');
var sweep = new Product('Baby Sweeper', 'images/sweep.png', 'sweep');
var taunTaun = new Product('Tauntaun Sleeping Bag', 'images/tauntaun.jpg', 'tauntaun');
var unicorn = new Product('Unicorn', 'images/unicorn.jpg', 'unicorn');
var usb = new Product('Dragon Tail USB Drive', 'images/usb.gif', 'usb');
var waterCan = new Product('Novelty Watering Can', 'images/water-can.jpg', 'watercan');
var wineGlass = new Product('Novelty Wine Glass', 'images/wine-glass.jpg', 'wineglass');
if (localStorage.lsProducts) {
  var existingData = JSON.parse(localStorage.lsProducts);
  for( var i = 0; i < existingData.length; i++){
    products[i].timesClicked += existingData[i].timesClicked;
    products[i].timesShown += existingData[i].timesShown;
  }
};

function Product(name, filePath, idString) {
  this.name = name;
  this.filePath = filePath;
  this.idString = idString;
  this.timesShown = 0;
  this.timesClicked = 0;
  products.push(this);
  imageFile.push(filePath);
};

function randomNumber() {
  return Math.floor(Math.random() * (imageFile.length));
};

var priorImages = [];

function generateImages() {

  var currentImages = [];

  while (currentImages.length < 3) {
    var randomSelection = randomNumber();
    if (!priorImages.includes(randomSelection) && !currentImages.includes(randomSelection)) {
      currentImages.push(randomSelection);
    }
  }
  var prod1 = products[currentImages[0]];
  var prod2 = products[currentImages[1]];
  var prod3 = products[currentImages[2]];

  imageLeft.src = prod1.filePath;
  imageCenter.src = prod2.filePath;
  imageRight.src = prod3.filePath;

  imageLeft.alt = currentImages[0];
  imageCenter.alt = currentImages[1];
  imageRight.alt = currentImages[2];

  priorImages = currentImages;

  prod1.timesShown++;
  prod2.timesShown++;
  prod3.timesShown++;
};
generateImages();

var clickLimit = 25;
function handleTheClick() {
  generateImages();
  totalClicks++;
  var productIdx = this.alt;

  products[productIdx].timesClicked++;
  if (totalClicks === clickLimit) {
    localStorage.lsProducts = JSON.stringify(products);
    imageLeft.removeEventListener('click', handleTheClick);
    imageCenter.removeEventListener('click', handleTheClick);
    imageRight.removeEventListener('click', handleTheClick);
    productClicks();

  }
};
imageLeft.addEventListener('click', handleTheClick);
imageCenter.addEventListener('click', handleTheClick);
imageRight.addEventListener('click', handleTheClick);

var voteTotals = [];
var nameArray = [];
function productClicks () {
  for (var i = 0; i < products.length; i++) {
    voteTotals.push(products[i].timesClicked);
    nameArray.push(products[i].name);
  }
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  canvas.setAttribute('class', 'visible');

  var data = {
    labels: nameArray,
    datasets: [{
      label: 'Clicks Received',
      data: voteTotals,
      backgroundColor: '#8e1517'
    }, {
    }]
  };

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
};
