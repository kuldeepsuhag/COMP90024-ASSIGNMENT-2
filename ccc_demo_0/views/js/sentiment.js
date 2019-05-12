var colors = ['#007bff','#28a745','#444444','#c3e6cb','#dc3545','#6c757d'];
// x-axis
var areas = ['Banyule ', 'Bayside ', 'Boroondara ', 'Brimbank ', 'Casey ', 'Darebin ', 'Frankston ', 'Hobsons Bay ', 'Hume ', 'Kingston ', 'Knox ', 'Manningham ', 'Maribyrnong ', 'Maroondah ', 'Melbourne ', 'Melton ', 'Monash ', 'Moonee Valley ', 'Moreland ', 'Nillumbik ', 'Port Phillip ', 'Queenscliffe ', 'Stonnington ', 'Whitehorse ', 'Whittlesea ', 'Wyndham ', 'Yarra ', 'Yarra Ranges ', 'Glen Eira ', 'Greater Geelong '];
// y-axis
var negative_tweets = [];
var positive_tweets = [];
var neutral_tweets = [];
var ctx = document.getElementById("myChart");

$(document).ready(function(){
  $.ajax({
    timeout : 6000,
    type:"post",
    async: false,
    url:"/sentiment_positive",
    data: { num: 123 },
    dataType:"json",
    success: function (data) {
      for(let i = 0; i < data.length; i++)
      {
        positive_tweets.push(data[i][1]);
      }
      showData();
      console.log(data.length);
    }
  });

  $.ajax({
    timeout : 6000,
    type:"post",
    async: false,
    url:"/sentiment_neutral",
    data: { num: 123 },
    dataType:"json",
    success: function (data) {
      for(let i = 0; i < data.length; i++)
      {
        neutral_tweets.push(data[i][1]);
      }
      showData();
      console.log(data.length);
    }
  });

  $.ajax({
    timeout : 6000,
    type:"post",
    async: false,
    url:"/sentiment_negative",
    data: { num: 123 },
    dataType:"json",
    success: function (data) {
      for(let i = 0; i < data.length; i++)
      {
        negative_tweets.push(data[i][1]);
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
            data: positive_tweets,
            label: "Positive counts",
            backgroundColor: colors[0],
            fill: false
          },
          { 
            data: negative_tweets,
            label: "Negative counts",
            backgroundColor: colors[1],
            fill: false
          },
          { 
            data: neutral_tweets,
            label: "Neutral counts",
            backgroundColor: colors[2],
            fill: false
          }
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

