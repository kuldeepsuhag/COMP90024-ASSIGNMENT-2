// x-axis
var areas = ['Banyule ', 'Bayside ', 'Boroondara ', 'Brimbank ', 'Casey ', 'Darebin ', 'Frankston ', 'Hobsons Bay ', 'Hume ', 'Kingston ', 'Knox ', 'Manningham ', 'Maribyrnong ', 'Maroondah ', 'Melbourne ', 'Melton ', 'Monash ', 'Moonee Valley ', 'Moreland ', 'Nillumbik ', 'Port Phillip ', 'Queenscliffe ', 'Stonnington ', 'Whitehorse ', 'Whittlesea ', 'Wyndham ', 'Yarra ', 'Yarra Ranges ', 'Glen Eira ', 'Greater Geelong '];
// y-axis
var assault =  [0.494, 0.314, 0.223, 0.736, 0.748, 0.546, 0.868, 0.532, 0.817, 0.474, 0.519, 0.295, 0.656, 0.577, 2.053, 0.657, 0.376, 0.496, 0.587, 0.669, 0.299, 0.368, 0.802, 0.275, 0.551, 0.356, 0.664, 0.541, 0.897, 0.467];
var overWeight = [38.6, 38.4, 38.6, 37.5, 38.4, 37.8, 37.9, 38.6, 37.8, 38.5, 38.4, 38.4, 37.9, 38.3, 33.0, 38.8, 37.4, 38.6, 38.0, 39.5, 36.6, 36.5, 37.4, 37.7, 38.5, 38.9, 37.0, 38.5, 38.2 , 35.3];
var homicide =  [0.002, 0.002, 0.001, 0.006, 0.004, 0.003, 0.001, 0.002, 0.003, 0.004, 0.001, 0.002, 0.007, 0, 0.031, 0.003, 0.001, 0.002, 0.005, 0.003, 0.003, 0.003, 0.002, 0, 0.002, 0.003, 0.001, 0.002, 0.002, 0.003];
var arson =  [0.027, 0.012, 0.01, 0.05, 0.055, 0.037, 0.068, 0.034, 0.087, 0.033, 0.024, 0.014, 0.021, 0.03, 0.037, 0.06, 0.015, 0.025, 0.024, 0.067, 0.023, 0.017, 0.033, 0.034, 0.008, 0.016, 0.038, 0.04, 0.059, 0.043];
// var distress = [10.7, 7.3, 7.3, 15.9, 14.9, 13.4, 15.0, 12.7, 15.3, 11.8, 11.6, 8.3, 13.2, 12.2, 10.8, 15.5, 10.1, 11.6, 13.2, 8.8, 10.4, 9.7, 8.5, 9.8, 15.0, 14.8, 10.7, 12.2, 10.0, 14.1];
var tweets = [];
var ctx = document.getElementById("myChart");

$(document).ready(function(){
  $.ajax({
    timeout : 6000,
    type:"post",
    async: false,
    url:"/wrath",
    data: { num: 123 },
    dataType:"json",
    success: function (data) {
      for(let i = 0; i < data.length; i++)
      {
        tweets.push(data[i][2]);
      }
      crimesData();
      console.log(data.length);
    }
  });
});

var config = {
  type: 'bar',
  data: {
      labels: areas,
      datasets: [
        {
          data: tweets,
          label: "Wrath tweets",
          borderColor: "#1DA1F2",
          fill: false,
          type: 'line'
        },
        { 
          data: assault,
          label: "Assault counts",
          backgroundColor: "#a91834",
          fill: false
        },
        { 
          data: homicide,
          label: "homicide counts",
          backgroundColor: "#8e5ea2",
          fill: false
        }, 
        {
          data: arson,
          label: "arson counts",
          backgroundColor: "#e8c3b9",
          fill: false
        }
      ]
  }
};
var myChart = new Chart(ctx, config);

function crimesData(){
  if (myChart) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, config);
  myChart.config = config;
  myChart.update();
}

// var distressConfig = {
//   type: 'line',
//   data: {
//       labels: areas,
//       datasets: [
//         {
//           data: tweets,
//           label: "tweets counts",
//           borderColor: "#1DA1F2",
//           fill: false
//         },
//         { 
//           data: distress,
//           label: "Distress counts",
//           backgroundColor: "#a91834",
//           fill: false,
//           type:'bar'
//         }
//       ]
//   }
// };

// function distressData(){
//   if (myChart) {
//     myChart.destroy();
//   }
//   myChart = new Chart(ctx, distressConfig);
//   myChart.config = distressConfig;
//   myChart.update();
// }

var assaultConfig = {
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
          suggestedMin: 0
       },
        scaleLabel: {
          display: true,
          labelString: 'Wrath Twitter / Area (%)'
        }
      }],
      xAxes: [{
        ticks: {
          suggestedMin: 0
          // beginAtZero: true
       },
        scaleLabel: {
          display: true,
          labelString: 'Assult'
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

function showAssultData() {
  if (myChart) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, assaultConfig);
  var myData = [];
  for(let i = 0; i < tweets.length; i++)
  {
    if (tweets[i] !== 0 && tweets[i] !== 100){
      myData.push (
        {
          x: assault[i],
          y: tweets[i]
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
          // beginAtZero: true,
          // max: 40
          suggestedMin: 0,
          max: 2
       },
        scaleLabel: {
          display: true,
          labelString: 'Wrath Twitter / Area (%)'
        }
      }],
      xAxes: [{
        ticks: {
          suggestedMin: 32,
          max: 42
          // beginAtZero: true
       },
        scaleLabel: {
          display: true,
          labelString: 'OverWeight',
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

function showOverWeight() {
  if (myChart) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, overWeightConfig);
  var myData = [];
  for(let i = 0; i < tweets.length; i++)
  {
    if (tweets[i] !== 0 && tweets[i] !== 100){
      myData.push (
        {
          x: overWeight[i],
          y: tweets[i]
        }
      );
    };
  };
  myChart.config.data.datasets[0].data = myData;
  myChart.update();
}

function showMap() {
  location.href='wrath-map.html';
}

