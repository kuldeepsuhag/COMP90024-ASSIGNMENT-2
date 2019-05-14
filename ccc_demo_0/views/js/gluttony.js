var colors = ['#007bff','#28a745','#444444','#c3e6cb','#dc3545','#6c757d'];
// Our labels along the x-axis
var areas = ['Banyule', 'Bayside ', 'Boroondara ', 'Brimbank ', 'Casey ', 'Darebin ', 'Frankston ', 'Hobsons Bay ', 'Hume ', 'Kingston ', 'Knox ', 'Manningham ', 'Maribyrnong ', 'Maroondah ', 'Melbourne ', 'Melton ', 'Monash ', 'Moonee Valley ', 'Moreland ', 'Nillumbik ', 'Port Phillip ', 'Queenscliffe ', 'Stonnington ', 'Whitehorse ', 'Whittlesea ', 'Wyndham ', 'Yarra ', 'Yarra Ranges ', 'Glen Eira ', 'Greater Geelong '];
// For drawing the lines
var overWeight = [38.6, 38.4, 38.6, 37.5, 38.4, 37.8, 37.9, 38.6, 37.8, 38.5, 38.4, 38.4, 37.9, 38.3, 33.0, 38.8, 37.4, 38.6, 38.0, 39.5, 36.6, 36.5, 37.4, 37.7, 38.5, 38.9, 37.0, 38.5, 38.2 , 35.3];
var HBP = [21.5 ,16.6 ,19.3,29.2,25.0,28.4,24.0,27.3,25.8,22.9,22.9,18.4,32.5,23.7,43.1,23.9,20.3,22.2,31.7,22.9,31.9,15.9,24.7,23.0,24.1,22.0,36.4,23.7,22.4,22.2];
var ctx = document.getElementById("myChart");
var twitter = []; 
var gluttony_r = 0.0;

$(document).ready(function(){
  $.ajax({
    timeout : 6000,
    type:"post",
    async: false,
    url:"/gluttony",
    data: { num: 123 },
    dataType:"json",
    success: function (data) {
      for(let i = 0; i < data.length; i++)
      {
        twitter.push(data[i][2]);
      }
      console.log(data.length);
      showChart(twitter);
    }
  });
});

var config = {
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
          beginAtZero: true,
          max: 40
       },
        scaleLabel: {
          display: true,
          labelString: 'Gluttony Twitter / Area (%)'
        }
      }],
      xAxes: [{
        ticks: {
          beginAtZero: true
       },
        scaleLabel: {
          display: true,
          labelString: 'OverWeight(%)',
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

var myChart = new Chart(ctx, config);

function showChart(twitter){
  if (myChart) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, config);
  var myData = [];
  for(let i = 0; i < twitter.length; i++)
  {
    myData.push (
      {
        x: overWeight[i],
        y: twitter[i]
      }
    );
  };
  $.ajax({
    timeout : 6000,
    type:"post",
    async: false,
    url:"/gluttony_par",
    data: { num: 123 },
    dataType:"json",
    success: function (data) {
      gluttony_r = data;
    }
  });
  myChart.config.data.datasets[0].data = myData;
  myChart.config.data.datasets[0].label = "R : " + gluttony_r;
  myChart.update();
}
var allConfig = {
    type: 'bar',
    data: {
        labels: areas,
        datasets: [
          {
            data: twitter,
            label: "Gluttony tweets",
            borderColor: "#1DA1F2",
            fill: false,
            type: 'line'
          },
          { 
            data: HBP,
            label: "High Blood Preasure",
            backgroundColor: colors[2],
            fill: false,
          },
          { 
            data: overWeight,
            label: "OverWeight",
            backgroundColor: colors[1],
            fill: false,
          }
        ]
    },
    options: {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Percentage / Population'
          }
        }]
      }
    }
};
function showAll() {
  if (myChart) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, allConfig);


}

function showMap() {
  location.href='gluttony-map.html';
}

