var colors = ['#007bff','#28a745','#444444','#c3e6cb','#dc3545','#6c757d'];
var areas = ['Banyule', 'Bayside', 'Boroondara', 'Brimbank', 'Casey', 'Darebin', 'Frankston', 'Hobsons_Bay', 'Hume', 'Kingston', 'Knox', 'Manningham', 'Maribyrnong', 'Maroondah', 'Melbourne', 'Melton', 'Monash', 'Moonee_Valley', 'Moreland', 'Nillumbik', 'Port_Phillip', 'Queenscliffe', 'Stonnington', 'Whitehorse', 'Whittlesea', 'Wyndham', 'Yarra', 'Yarra_Ranges', 'Glen_Eira', 'Greater_Geelong'];
var sins = ["Wrath", "Sloth", "Gluttony"];
var ctx = document.getElementById("profileChart");

var options = {
    scale: {
        // Hides the scale
        display: false
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
};
var config = {
    type: "radar",
    data: {
        labels: sins,
        datasets: [{
            data: []
        }],
        option: options
    }
};
var profileChart = new Chart(ctx, config);

function showProfile(index) {
    var twittersCount = [];
    $.ajax({
        timeout : 6000,
        type:"post",
        async: false,
        url:"/" + areas[index] + "_count",
        data: { num: 123 },
        dataType:"json",
        success: function (data) {
          for(let i = 0; i < data.length; i++)
          {
              twittersCount.push(data[i]);
          }
          profileChart.config.data.datasets[0].label = areas[index];
          profileChart.config.data.datasets[0].borderColor = getRandomColor();
          profileChart.config.data.datasets[0].data = twittersCount;
          profileChart.update();
          console.log(data.length);
          console.log(index);
        }
      });
    console.log(areas[index]);
  }
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }