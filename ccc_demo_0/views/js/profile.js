var colors = ['#007bff','#28a745','#444444','#c3e6cb','#dc3545','#6c757d'];
var areas = ['Banyule', 'Bayside', 'Boroondara', 'Brimbank', 'Casey', 'Darebin', 'Frankston', 'Hobsons_Bay', 'Hume', 'Kingston', 'Knox', 'Manningham', 'Maribyrnong', 'Maroondah', 'Melbourne', 'Melton', 'Monash', 'Moonee_Valley', 'Moreland', 'Nillumbik', 'Port_Phillip', 'Queenscliffe', 'Stonnington', 'Whitehorse', 'Whittlesea', 'Wyndham', 'Yarra', 'Yarra_Ranges', 'Glen_Eira', 'Greater_Geelong'];
var sins = ["Wrath", "Sloth", "Gluttony"];
var ctx = document.getElementById("profileChart");

var config = {
    type: "radar",
    data: {
        labels: sins,
        datasets: [{
            data: []
        }],
        options: {
          scale: {
              ticks: {
                  beginAtZero: true,
                  min: 0,
                  userCallback: function(label, index, labels) {
                      // when the floored value is the same as the value we have a whole number
                      if (Math.floor(label) === label) {
                          return label;
                      }
                  },
              }
          }
      }
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
          var myData = {
            data: twittersCount,
            label: areas[index],
            borderColor: getRandomColor()
          };
          var isExisted = false;
          for(let i = 0; i < profileChart.config.data.datasets.length; i++)
          {
              if (profileChart.config.data.datasets[i].label ==areas[index]) {
                isExisted = true;
              };
          }
          if (isExisted) {
            isExisted = false;
          }else {
            profileChart.config.data.datasets.push(myData);
            profileChart.update();
          };
          console.log(data.length);
          console.log(index);
        }
      });
    console.log(areas[index]);
  }
  function removeData() {
    if (typeof profileChart.config.data.datasets !== 'undefined' && profileChart.config.data.datasets.length > 0) {
      profileChart.config.data.datasets.pop();
      profileChart.update();
    }
  };
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }