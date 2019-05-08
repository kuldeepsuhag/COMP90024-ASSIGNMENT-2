/* chart.js chart examples */

// chart colors
var colors = ['#007bff','#28a745','#444444','#c3e6cb','#dc3545','#6c757d'];
var areas = ['Banyule ', 'Bayside ', 'Boroondara ', 'Brimbank ', 'Casey ', 'Darebin ', 'Frankston ', 'Hobsons Bay ', 'Hume ', 'Kingston ', 'Knox ', 'Manningham ', 'Maribyrnong ', 'Maroondah ', 'Melbourne ', 'Melton ', 'Monash ', 'Moonee Valley ', 'Moreland ', 'Nillumbik ', 'Port Phillip ', 'Queenscliffe ', 'Stonnington ', 'Whitehorse ', 'Whittlesea ', 'Wyndham ', 'Yarra ', 'Yarra Ranges ', 'Glen Eira ', 'Greater Geelong '];
var sedentary = [34.3, 24.8, 23.3, 36.2, 36.3, 35.3, 38.3, 29.0, 33.5, 29.9, 27.4, 30.6, 33.9, 33.5, 33.0, 30.1, 28.3, 28.6, 30.1, 29.4, 30.8, 18.8, 24.9, 25.6, 22.0, 41.9, 36.2, 27.9];
var overweight = [38.6, 38.4, 38.6, 37.5, 38.4, 37.8, 37.9, 38.6, 37.8, 38.5, 38.4, 38.4, 37.9, 38.3, 33.0, 38.8, 37.4, 38.6, 38.0, 35.3, 38.2, 39.5, 36.6, 36.5, 37.4, 37.7, 38.5, 38.9, 37.0, 38.5, 0, 34.2]; 
var waist = [59.8, 54.3, 52.1, 60.1, 63.2, 60.4, 62.9, 61.0, 64.8, 59.6, 58.7, 56.1, 59.1, 62.3, 47.7, 67.0, 56.5, 59.3, 62.0, 65.3, 57.0, 60.1, 55.4, 66.7, 52.6, 56.4, 64.2, 66.6, 52.7, 61.8, 0, 70.7];
var chBar = document.getElementById("barChart");
var chartData = {
  labels: areas,
  datasets: [{
    label: "Sedentary",
    data: sedentary,
    backgroundColor: colors[0]
  },
  {
    label: "Overweight",
    data: overweight,
    backgroundColor: colors[1]
  },
  {
    label: "Waist",
    data: waist,
    backgroundColor: colors[2]
  }]
};

if (chBar) {
  new Chart(chBar, {
  type: 'bar',
  data: chartData
  });
}

function showMap() {
  location.href='sloth-map.html';
  // show google map
}