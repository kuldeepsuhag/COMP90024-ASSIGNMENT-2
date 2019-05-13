/* chart.js chart examples */

// chart colors
var colors = ['#007bff','#28a745','#444444','#c3e6cb','#dc3545','#6c757d'];
var areas = ['Banyule ', 'Bayside ', 'Boroondara ', 'Brimbank ', 'Casey ', 'Darebin ', 'Frankston ', 'Hobsons Bay ', 'Hume ', 'Kingston ', 'Knox ', 'Manningham ', 'Maribyrnong ', 'Maroondah ', 'Melbourne ', 'Melton ', 'Monash ', 'Moonee Valley ', 'Moreland ', 'Nillumbik ', 'Port Phillip ', 'Queenscliffe ', 'Stonnington ', 'Whitehorse ', 'Whittlesea ', 'Wyndham ', 'Yarra ', 'Yarra Ranges ', 'Glen Eira ', 'Greater Geelong '];
var sedentary = [34.6,39.8,45.9,24.9,32.7,40.2,33.6,42.3,31.2,32.0,39.9,31.6,38.2,33.8,52.3,29.0,33.1,29.5,38.1,32.2,44.7,21.3,35.4,41.5,29.0,32.8,43.4,27.2,40.7,30.0];
var overWeight = [38.6, 38.4, 38.6, 37.5, 38.4, 37.8, 37.9, 38.6, 37.8, 38.5, 38.4, 38.4, 37.9, 38.3, 33.0, 38.8, 37.4, 38.6, 38.0, 39.5, 36.6, 36.5, 37.4, 37.7, 38.5, 38.9, 37.0, 38.5, 38.2 , 35.3];
// var unemployment = [3.7, 3.2, 3.9, 10.0, 8.0, 6.3, 6.0, 5.9, 9.1, 5.8, 4.6, 5.8, 7.2, 5.3, 3.9, 7.7, 3.8, 4.9, 6.5, 2.1, 4.2, 2.7, 3.0, 5.9, 6.1, 6.7, 5.9, 5.0, 4.1, 5.9];
var twitter = []; 
var ctx = document.getElementById("barChart");

$(document).ready(function(){
  $.ajax({
    timeout : 6000,
    type:"post",
    async: false,
    url:"/sloth",
    data: { num: 123 },
    dataType:"json",
    success: function (data) {
      for(let i = 0; i < data.length; i++)
      {
        twitter.push(data[i][2]);
      }
      console.log(data.length);
      showChart();
    }
  });
});

var config = {
  type: 'bar',
  data: {
      labels: areas,
      datasets: [
        {
          data: twitter,
          label: "Sloth tweets",
          borderColor: "#1DA1F2",
          fill: false,
          type: 'line'
        },
        { 
          data: sedentary,
          label: "Sedentary",
          backgroundColor: colors[4],
          fill: false,
        },
        { 
          data: overWeight,
          label: "OverWeight",
          backgroundColor: colors[1],
          fill: false,
        }
      ]
  }
};
var myChart = new Chart(ctx, config);

function showChart() {
  if (myChart) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, config);
  // myChart.config = config;
  // myChart.update();
}

var sedentaryConfig = {
  type: 'scatter',
  data: {
     labels: areas,
     datasets: [{
        label: 'Legend',
        showLine: false,
        borderColor: '#2196f3', // Add custom color border            
        backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
        data: []
     }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
        ticks: {
          // beginAtZero: true
          suggestedMin: 30
       },
        scaleLabel: {
          display: true,
          labelString: 'Sloth Twitter count'
        }
      }],
      xAxes: [{
        ticks: {
          // beginAtZero: true
          suggestedMin: 20
       },
        scaleLabel: {
          display: true,
          labelString: 'Sedentary'
        }
      }]
    } ,
     tooltips: {
        callbacks: {
           label: function(tooltipItem, data) {
              var label = data.labels[tooltipItem.index];
              return label + ': (' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
           }
        }
     }
  }
};

function showSedentary() {
  if (myChart) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, sedentaryConfig);

  var myData = [];
  for(let i = 0; i < twitter.length; i++)
  {
    if (twitter[i] !== 0 && twitter[i] !== 100){
        myData.push (
          {
            x: sedentary[i],
            y: twitter[i]
          }
        );
      };
    };
  myChart.config.data.datasets[0].data = myData;
  myChart.update();
}

var overWeightConfig = {
  type: 'scatter',
  data: {
     labels: areas,
     datasets: [{
        label: 'Legend',
        showLine: false,
        borderColor: '#2196f3', // Add custom color border            
        backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
        data: []
     }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
        ticks: {
          // beginAtZero: true
          suggestedMin: 30
       },
        scaleLabel: {
          display: true,
          labelString: 'Sloth Twitter count'
        }
      }],
      xAxes: [{
        ticks: {
          suggestedMin: 30
          // beginAtZero: true
       },
        scaleLabel: {
          display: true,
          labelString: 'OverWeight'
        }
      }]
    } ,
     tooltips: {
        callbacks: {
           label: function(tooltipItem, data) {
              var label = data.labels[tooltipItem.index];
              return label + ': (' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
           }
        }
     }
  }
};

function showOverweight() {
  if (myChart) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, overWeightConfig);
  var myData = [];
  for(let i = 0; i < twitter.length; i++)
  {
    if (twitter[i] !== 0 && twitter[i] !== 100){
      myData.push (
        {
          x: overWeight[i],
          y: twitter[i]
        }
      );
    };
  };
  myChart.config.data.datasets[0].data = myData;
  myChart.update();
}

function showMap() {
  location.href='sloth-map.html';
  // show google map
}