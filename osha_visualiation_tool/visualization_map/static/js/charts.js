

let select = document.querySelector('#chartType');
// $("#allCharts").hide();
$("#lineChart").hide();
$("#barChart").hide();
$("#radarChart").hide();

select.addEventListener('change', showHide);

function showHide() {
  // concat Chart for the canvas ID
  let chart = this.options[select.selectedIndex].value + 'Chart';
    document.querySelectorAll('canvas')
    .forEach(c => {
      c.style.display = (c.id === chart) ? 'inherit' : 'none';
    })
}

 
// // Beginning of Charts
var linedata = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [ {
      label: 'Reported Hospitalizations',
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(225,0,0,0.4)",
      borderColor: "red", // The main line color
      borderCapStyle: 'square',
      borderDash: [], // try [5, 15] for instance
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "black",
      pointBackgroundColor: "white",
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "yellow",
      pointHoverBorderColor: "brown",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      // notice the gap in the data and the spanGaps: true
      data: ['8.55', '7.45', '8.69', '7.49', '8.31', '9.05','9.55','9.27','7.83','8.52','7.45','7.85'],
      spanGaps: true,
    },{
      label: 'Reported Amputation',
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgb(179, 209, 255)",
      borderColor: "blue", // The main line color
      borderCapStyle: 'square',
      borderDash: [], // try [5, 15] for instance
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "black",
      pointBackgroundColor: "white",
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "yellow",
      pointHoverBorderColor: "brown",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      // notice the gap in the data and the spanGaps: true
      data: ['6.21', '7.88', '8.34', '7.91', '7.95', '9.12','9.51','9.40','8.55','9.86','7.70','7.59'],
      spanGaps: true,

      //steppedLine:"false"

    }]
};

var ctx = document.getElementById("lineChart");
var lineChart = new Chart(ctx, {
  type: 'line',
  data: linedata, //end of data
  options: {
    title: {
      display: true,
      text: "Percent of Amputations & Hospitalizations for 2017",
      fontSize: 20,
      fontColor: "rgba(20,20,20,1)"
    },
    legend: {
      display: true,
      position: 'right',
      labels: {
        fontColor: '#000'
      },
    },
    elements: {
      line: {
        tension: 0, //disables bezier curves
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function(value, index, values) {
            return value + " %"
          }
        }
      }]
    },
    /*animation: {
        duration:0, // general animation time
    },*/
    hover: {
      animationDuration: 0, // duration of animations when hovering an item
    },
    responsiveAnimationDuration: 0, // animation duration after a resize
  }
});





// Radar
Chart.defaults.scale.ticks.beginAtZero = true;
var ctx = document.getElementById("radarChart");
var fatalitiesData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June','July','August','September','October','November','December'],
  datasets: [{
    data: [8.43, 3.88, 6.91, 8.43,8.81,10.51,8.52,9.75,10.13,9.75,7.86,7.01],
    backgroundColor: [
      "rgba(173,216,230)",
      "rgba(30,144,255)",
      "rgba(144,238,144)",
      "rgba(50,205,50)",
      'rgba(34,139,34)',
      'rgba(255,127,80)',
      'rgba(255,99,71)',
      'rgba(255,0,0)',
      'rgba(255,215,0)',
      'rgba(218,165,32)',
      'rgba(184,134,11)',
      'rgba(135,206,235)'
    ]
  }]
};
 
var chartOptions = {
  title: {
      display: true,
      text: "Percent of Fatalities Per Month in 2017",
      fontSize: 20
      // fontColor: "rgba(20,20,20,1)"
    },
  scale: {
    ticks: {
      beginAtZero: true,
      min: 0,
      max: 12,
      stepSize: 1
    },
    pointLabels: {
      fontSize: 15
    }
  },
  legend: {
    position: 'left'
  }
};

var RadarChart = new Chart(ctx, {
  type: 'polarArea',
  data: fatalitiesData,
  options: chartOptions
});


//// // // Body Part Count
var ctx = document.getElementById("barChart");
var BarChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Nonclassifiable", "Legs", "Feet", "Hands", "Body","Back","Torso","Arms","Head & Neck"],
    datasets: [{
      label: "Injuries on the body",
      data: [411, 1609, 463, 3739, 1229,289,1187,532,985],
      backgroundColor: [
        'rgba(255,99,132,0.5)',
        'rgba(155,130,32,0.5)',
        'rgba(105,9,132,0.5)',
        'rgba(15,130,202,0.5)',
        'rgba(15,250,252,0.5)',
        'rgba(205,100,32,0.5)',
        'rgba(0,205,0,0.5)',
        'rgba(55,15,52,0.5)',
        'rgba(255,0,0,0.5)',
        'rgba(25,59,52,0.5)',
        'rgba(0,100,55,0.5)',
        'rgba(200,111,199,0.5)',
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(155,130,32,1)',
        'rgba(105,9,132,1)',
        'rgba(15,130,202,1)',
        'rgba(15,250,252,1)',
        'rgba(205,100,32,0.5)',
        'rgba(0,205,0,1)',
        'rgba(55,15,52,1)',
        'rgba(255,0,0,1)',
        'rgba(25,59,52,1)',
        'rgba(0,100,55,1)',
        'rgba(200,111,199,1)',
      ],
      borderWidth: "1",
      pointHoverBackgroundColor: "#fff",
      hoverBorderColor: "#fff",
    }]
  },
  options: {
    title: {
      display: true,
      text: "Body Part Injuries",
      fontSize: 20,
      fontColor: "rgba(10,0,20,0.9)"
    },
    legend: {
      display: true,
      position: 'right',
      labels: {
        fontColor: '#000'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function(value, index, values) {
            return value + ""
          }
        }
      }]
    }
  },
});

