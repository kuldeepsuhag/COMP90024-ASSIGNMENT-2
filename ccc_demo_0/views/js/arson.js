var colors = ['#007bff','#28a745','#444444','#c3e6cb','#dc3545','#6c757d'];
// x-axis
var areas = ['Banyule ', 'Bayside ', 'Boroondara ', 'Brimbank ', 'Casey ', 'Darebin ', 'Frankston ', 'Hobsons Bay ', 'Hume ', 'Kingston ', 'Knox ', 'Manningham ', 'Maribyrnong ', 'Maroondah ', 'Melbourne ', 'Melton ', 'Monash ', 'Moonee Valley ', 'Moreland ', 'Nillumbik ', 'Port Phillip ', 'Queenscliffe ', 'Stonnington ', 'Whitehorse ', 'Whittlesea ', 'Wyndham ', 'Yarra ', 'Yarra Ranges ', 'Glen Eira ', 'Greater Geelong '];
// y-axis
var aurin = [];
var tweets = [];
var neutral_tweets = [];
var ctx = document.getElementById("myChart");

$(document).ready(function(){
  $.ajax({
    timeout : 6000,
    type:"post",
    async: false,
    url:"/arson",
    data: { num: 123 },
    dataType:"json",
    success: function (data) {
      for(let i = 0; i < data.length; i++)
      {
        tweets.push(data[i][2]);
      }
      showData();
      console.log(data.length);
    }
  });

  $.ajax({
    timeout : 6000,
    type:"post",
    async: false,
    url:"/aurin_arson",
    data: { num: 123 },
    dataType:"json",
    success: function (data) {
      for (let i = 0; i < data.length; i++){
        aurin.push(data[i]);
      }
      showData();
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
            label: "tweet counts",
            backgroundColor: colors[0],
            fill: false
          },
          { 
            data: aurin,
            label: "aurin counts",
            backgroundColor: colors[1],
            fill: false
          }
          // { 
          //   data: neutral_tweets,
          //   label: "Neutral counts",
          //   backgroundColor: colors[2],
          //   fill: false
          // }
        ]
    }
  };

var myChart = new Chart(ctx, config);

function showData(){
  myChart.config = config;
  myChart.update();
}

function showMap() {
  location.href='wrath-map.html';
}

