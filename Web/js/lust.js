// Our labels along the x-axis
var areas = ['Banyule ', 'Bayside ', 'Boroondara ', 'Brimbank ', 'Casey ', 'Darebin ', 'Frankston ', 'Hobsons Bay ', 'Hume ', 'Kingston ', 'Knox ', 'Manningham ', 'Maribyrnong ', 'Maroondah ', 'Melbourne ', 'Melton ', 'Monash ', 'Moonee Valley ', 'Moreland ', 'Nillumbik ', 'Port Phillip ', 'Queenscliffe ', 'Stonnington ', 'Whitehorse ', 'Whittlesea ', 'Wyndham ', 'Yarra ', 'Yarra Ranges ', 'Glen Eira ', 'Greater Geelong '];
// For drawing the lines
var sexualOffences = [249, 211, 188, 370, 756, 257, 371, 123, 463, 275, 288, 103, 130, 172, 724, 260, 215, 145, 275, 86, 245, 2, 180, 253, 270, 298, 171, 494, 219, 739];
var stalk = [246, 98, 204, 329, 650, 225, 336, 192, 568, 199, 197, 106, 117, 207, 526, 343, 216, 167, 258, 71, 178, 2, 135, 179, 503, 369, 187, 209, 144, 416];

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: areas,
    datasets: [
      { 
        data: sexualOffences,
        label: "Sexual Offences counts",
        borderColor: "#3e95cd",
        fill: false
      },
      { 
        data: stalk,
        label: "Stalk counts",
        borderColor: "#8e5ea2",
        fill: false
      }
    ]
  }
});

function showMap() {
  location.href='lust-map.html';
  // show google map
}
