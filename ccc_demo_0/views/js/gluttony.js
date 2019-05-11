// Our labels along the x-axis
var areas = ['Banyule ', 'Bayside ', 'Boroondara ', 'Brimbank ', 'Casey ', 'Darebin ', 'Frankston ', 'Hobsons Bay ', 'Hume ', 'Kingston ', 'Knox ', 'Manningham ', 'Maribyrnong ', 'Maroondah ', 'Melbourne ', 'Melton ', 'Monash ', 'Moonee Valley ', 'Moreland ', 'Nillumbik ', 'Port Phillip ', 'Queenscliffe ', 'Stonnington ', 'Whitehorse ', 'Whittlesea ', 'Wyndham ', 'Yarra ', 'Yarra Ranges ', 'Glen Eira ', 'Greater Geelong '];
// For drawing the lines
var overWeight = [38.6, 38.4, 38.6, 37.5, 38.4, 37.8, 37.9, 38.6, 37.8, 38.5, 38.4, 38.4, 37.9, 38.3, 33.0, 38.8, 37.4, 38.6, 38.0, 39.5, 36.6, 36.5, 37.4, 37.7, 38.5, 38.9, 37.0, 38.5, 38.2 , 35.3];
var HBP = [21.5 ,16.6 ,19.3,29.2,25.0,28.4,24.0,27.3,25.8,22.9,22.9,18.4,32.5,23.7,43.1,23.9,20.3,22.2,31.7,22.9,31.9,15.9,24.7,23.0,24.1,22.0,36.4,23.7,22.4,22.2];
var ctx = document.getElementById("myChart");
var config = {
  type: 'line',
  data: {
      labels: areas,
      datasets: [
        { 
          data: overWeight,
          label: "overWeight counts",
          borderColor: "#3e95cd",
          fill: false
        },
        { 
          data: HBP,
          label: "Hight Blood Pressure counts",
          borderColor: "#8e5ea2",
          fill: false
        }
      ]
  }
};

var myChart = new Chart(ctx, config);

// function melbdata(){
//   var data = myChart.config.data;
//   data.datasets[0].data = assault;
//   data.datasets[1].data = arson;
//   data.datasets[2].data = robbery;
//   data.labels = areas;
//   myChart.update();
// }
// function syddata(){
//   var data = myChart.config.data;
//   data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 28, 78, 91, 55, 67, 26, 160];
//   data.datasets[1].data = arson;
//   data.datasets[2].data = robbery;
//   data.labels = areas;
//   myChart.update();
// }

function showMap() {
  location.href='gluttony-map.html';
  // show google map
}

