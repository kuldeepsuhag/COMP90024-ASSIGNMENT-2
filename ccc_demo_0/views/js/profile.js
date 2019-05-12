var colors = ['#007bff','#28a745','#444444','#c3e6cb','#dc3545','#6c757d'];
var areas = ['Banyule', 'Bayside ', 'Boroondara ', 'Brimbank ', 'Casey ', 'Darebin ', 'Frankston ', 'Hobsons Bay ', 'Hume ', 'Kingston ', 'Knox ', 'Manningham ', 'Maribyrnong ', 'Maroondah ', 'Melbourne ', 'Melton ', 'Monash ', 'Moonee Valley ', 'Moreland ', 'Nillumbik ', 'Port Phillip ', 'Queenscliffe ', 'Stonnington ', 'Whitehorse ', 'Whittlesea ', 'Wyndham ', 'Yarra ', 'Yarra Ranges ', 'Glen Eira ', 'Greater Geelong '];
var sins = ["Gluttony", "Sloth", "Wrath"];
var twittersCount = [];
var ctx = document.getElementById("profileChart");

$(document).ready(function(){
    $.ajax({
      timeout : 6000,
      type:"post",
      async: false,
      url:"/banyule_count",
      data: { num: 123 },
      dataType:"json",
      success: function (data) {
        for(let i = 0; i < data.length; i++)
        {
            twittersCount.push(data[i]);
        }
        console.log(data.length);
      }
    });
  });

options = {
    scale: {
        // Hides the scale
        display: true
    }
};
var config = {
    type: "radar",
    data: {
        labels: sins,
        datasets: [{
            data: twittersCount
        }],
        option: options
    }
};
var profileChart = new Chart(ctx, config);

function showBanyule() {
    $.ajax({
        timeout : 6000,
        type:"post",
        async: false,
        url:"/banyule_count",
        data: { num: 123 },
        dataType:"json",
        success: function (data) {
          for(let i = 0; i < data.length; i++)
          {
              twittersCount.push(data[i]);
          }
          profileChart.datasets.data = twittersCount;
          console.log(data.length);
        }
      });
    console.log("Banyule");
  }

  function showBayside() {
    $.ajax({
        timeout : 6000,
        type:"post",
        async: false,
        url:"/bayside_count",
        data: { num: 123 },
        dataType:"json",
        success: function (data) {
          for(let i = 0; i < data.length; i++)
          {
              twittersCount.push(data[i]);
          }
          profileChart.datasets.data = twittersCount;
          console.log(data.length);
        }
      });
    console.log("Banyule");
  }