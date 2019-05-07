// Our labels along the x-axis
var areas = ['Banyule ', 'Bayside ', 'Boroondara ', 'Brimbank ', 'Casey ', 'Darebin ', 'Frankston ', 'Hobsons Bay ', 'Hume ', 'Kingston ', 'Knox ', 'Manningham ', 'Maribyrnong ', 'Maroondah ', 'Melbourne ', 'Melton ', 'Monash ', 'Moonee Valley ', 'Moreland ', 'Nillumbik ', 'Port Phillip ', 'Queenscliffe ', 'Stonnington ', 'Whitehorse ', 'Whittlesea ', 'Wyndham ', 'Yarra ', 'Yarra Ranges ', 'Glen Eira ', 'Greater Geelong '];
// For drawing the lines
var assault = [631, 323, 395, 1514, 2345, 847, 1211, 497, 1698, 754, 834, 363, 573, 664, 3039, 931, 725, 610, 1010, 192, 871, 8, 615, 606, 1380, 1235, 838, 725, 548, 1596];
var arson = [34, 12, 18, 102, 172, 58, 95, 32, 180, 53, 39, 17, 18, 35, 55, 85, 29, 31, 42, 15, 36, 1, 9, 28, 78, 91, 55, 67, 26, 160];
var robbery = [33, 24, 39, 266, 147, 113, 70, 41, 96, 62, 60, 31, 125, 51, 416, 88, 112, 92, 79, 10, 82, 0, 65, 62, 81, 153, 156, 33, 45, 83];

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: areas,
    datasets: [
      { 
        data: assault,
        label: "Assault counts",
        borderColor: "#3e95cd",
        fill: false
      },
      { 
        data: arson,
        label: "Arson counts",
        borderColor: "#8e5ea2",
        fill: false
      }, 
      {
        data: robbery,
        label: "Robbery counts",
        borderColor: "#e8c3b9",
        fill: false
      }
    ]
  }
});

var melb_chart = new Chart(ctx, myChart);
$("0").click(function() {
    var data = melb_chart.myChart.data;
    data.datasets[0].data = assault;
    data.datasets[1].data = arson;
    data.datasets[2].data = robbery;
    data.labels = areas;
    melb_chart.update();
});
$("1").click(function() {
  var data = melb_chart.myChart.data;
  data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 28, 78, 91, 55, 67, 26, 160];
  data.datasets[1].data = arson;
  data.datasets[2].data = robbery;
  data.labels = areas;
  melb_chart.update();
});

