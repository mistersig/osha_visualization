// global variable never change use const
// initial function that starts the map and displays it 
function initialization() {
  const mymap = L.map('mapid').setView([38.700860, -94.783775], 4); //38.724066, -99.262098 //
  getData(mymap);

}; //end of initialization


$(document).ready(initialization);

// get data and build map
function getData(mymap){
  // baselayer
  var baselayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
  }).addTo(mymap);
  //basemap
  const baseMaps = {
    "Basemap": baselayer
  }; 


// Map layers for SIDEBARS

// var severeZipLayer =choroplethMap(severe_zip_data,mymap)
var severeStateLayer =choroplethMap(severe_state_data,mymap)

const severeMaps = {
  "Severe Injuries by State": severeStateLayer
  // "Severe Injuries by Zipcode": severeZipLayer
};

var fatalitiesStateLayer =choroplethMap(fatalities_states_data,mymap)
// var fatalitiesZipLayer =choroplethMap(fatalities_zip_data,mymap)

const fatalMaps = {
  "Fatalities by State": fatalitiesStateLayer
  // "Fatalities by Zipcode": fatalitiesZipLayer
};


// // ORIGINALS SAVE
// get model data from script in index
// the Django way
var accidentLayer = choroplethMap(accident_data,mymap);
var complaintLayer = choroplethMap(complaint_data,mymap);
var fatCatLayer = choroplethMap(fat_cat_data,mymap);
var followUpLayer = choroplethMap(follow_up_data,mymap);
var monitoringLayer = choroplethMap(monitoring_data,mymap);
var varianceLayer = choroplethMap(variance_data,mymap);
var referralsLayer = choroplethMap(referrals_data,mymap);
var plannedLayer = choroplethMap(planned_data,mymap);


const inspectionsMaps = {
  "Accidents Inspected": accidentLayer,
  "Complaints Inspected": complaintLayer,
  "Fatalities & Catastrophes Inspected": fatCatLayer,
  "Follow Up Inpections": followUpLayer,
  "Monitoring Inspections": monitoringLayer,
  "Variances Inspected": varianceLayer,
  "Referrals Inspected": referralsLayer,
  "Planned Inspections": plannedLayer
};

//calls function to add layer controls to menu 
layerControlMenuFatalities(baseMaps, fatalMaps,'collapseTwo1',mymap);

layerControlMenuInjury(baseMaps, severeMaps, 'collapseTwo21',mymap);

layerControlMenu(baseMaps, inspectionsMaps, 'collapseThree31',mymap);



// control that shows state info on hover
  var info = L.control({position: 'topright'});

  info.onAdd = function(map) {
    this._div = L.DomUtil.create("div", "info");
    this.update();
    return this._div;
  };
  baseHtml = '<p class="hidden-xs"><i class="fa fa-fw fa-mouse-pointer"></i>Select a layer<br/>to see its data</p>';
  info.update = function(props) {
    // console.log(props)
    var text = baseHtml;
    console.log(props)
    if (props) {
      text = '';
      if (props.state_name) {
        text += '<h4>' + props.code+ ' : ' + props.score +"%" +'</h4>';
      }
    }
    this._div.innerHTML = text;
  };
  info.clear = function() {
    this._div.innerHTML = baseHtml;
  };
  info.addTo(mymap);
  // MAP highlight
  function highlightFeature(e) {
      var layer = e.target;
      layer.setStyle({
        weight: 5,
        color: "#5b5b5b",
        dashArray: "",
        fillOpacity: 0.7
      });
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      // console.log(layer.feature)
      info.update(layer.feature.properties);
    }
    // end of highlightFeature

function resetHighlight(e) {
  var layer = e.target;

        layer.setStyle({
        "weight": 2,
        "opacity": 0.8,
        "color": '#3a3a3a'
        });
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
        info.clear();
        // info.update(layer.feature.properties);
    };

function zoomToFeature(e) {
  mymap.fitBounds(e.target.getBounds());
}
// end on zoomToFeature
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}
// end of onEahcFeatures


function choroplethMap(feature,map){
  // console.log(feature)

  console.log(feature.features[0].properties.insp_type)

  if( feature.features[0].properties.insp_type == "accident            "){
      var choroplethLayer = L.choropleth(feature, {
    valueProperty: 'score',
    scale: ['#eff3ff', '#08519c'],
    steps: 4,
    mode: 'e', // q for quantile, e for equidistant, k for k-means
    style: {
      color: '#000',
      weight: 2,
      fillOpacity: 0.8
    },
    onEachFeature:onEachFeature
  })


  return choroplethLayer

  }
  else if( feature.features[0].properties.insp_type == "complaint            "){
      var choroplethLayer = L.choropleth(feature, {
    valueProperty: 'score',
    scale: ['#eff3ff', '#08519c'],
    steps: 4,
    mode: 'e', // q for quantile, e for equidistant, k for k-means
    style: {
      color: '#000',
      weight: 2,
      fillOpacity: 0.8
    },
    onEachFeature:onEachFeature
  })


  return choroplethLayer

  }
  else if( feature.features[0].properties.insp_type == "fatality_catastrophe            "){
      var choroplethLayer = L.choropleth(feature, {
    valueProperty: 'score',
    scale: ['#eff3ff', '#08519c'],
    steps: 4,
    mode: 'e', // q for quantile, e for equidistant, k for k-means
    style: {
      color: '#000',
      weight: 2,
      fillOpacity: 0.8
    },
    onEachFeature:onEachFeature
  })


  return choroplethLayer

  }

  else if( feature.features[0].properties.insp_type == "follow_up            "){
      var choroplethLayer = L.choropleth(feature, {
    valueProperty: 'score',
    scale: ['#eff3ff', '#08519c'],
    steps: 4,
    mode: 'e', // q for quantile, e for equidistant, k for k-means
    style: {
      color: '#000',
      weight: 2,
      fillOpacity: 0.8
    },
    onEachFeature:onEachFeature
  })


  return choroplethLayer

  }
  else if( feature.features[0].properties.insp_type == "monitoring            "){
      var choroplethLayer = L.choropleth(feature, {
    valueProperty: 'score',
    scale: ['#eff3ff', '#08519c'],
    steps: 4,
    mode: 'e', // q for quantile, e for equidistant, k for k-means
    style: {
      color: '#000',
      weight: 2,
      fillOpacity: 0.8
    },
    onEachFeature:onEachFeature
  })


  return choroplethLayer

  }
    else if( feature.features[0].properties.insp_type == "variance            "){
      var choroplethLayer = L.choropleth(feature, {
    valueProperty: 'score',
    scale: ['#eff3ff', '#08519c'],
    steps: 4,
    mode: 'e', // q for quantile, e for equidistant, k for k-means
    style: {
      color: '#000',
      weight: 2,
      fillOpacity: 0.8
    },
    onEachFeature:onEachFeature
  })


  return choroplethLayer

  }
  else if( feature.features[0].properties.insp_type == "referral            "){
      var choroplethLayer = L.choropleth(feature, {
    valueProperty: 'score',
    scale: ['#eff3ff', '#08519c'],
    steps: 4,
    mode: 'e', // q for quantile, e for equidistant, k for k-means
    style: {
      color: '#000',
      weight: 2,
      fillOpacity: 0.8
    },
    onEachFeature:onEachFeature
  })


  return choroplethLayer

  }
  else if( feature.features[0].properties.insp_type == "planned            "){
      var choroplethLayer = L.choropleth(feature, {
    valueProperty: 'score',
    scale: ['#eff3ff', '#08519c'],
    steps: 4,
    mode: 'e', // q for quantile, e for equidistant, k for k-means
    style: {
      color: '#000',
      weight: 2,
      fillOpacity: 0.8
    },
    onEachFeature:onEachFeature
  })


  return choroplethLayer

  }


  else {
      var choroplethLayer = L.choropleth(feature, {
    valueProperty: 'score',
    scale: ['white', 'red'],
    steps: 5,
    mode: 'q', // q for quantile, e for equidistant, k for k-means
    style: {
      color: '#000',
      weight: 2,
      fillOpacity: 0.8
    },
    onEachFeature:onEachFeature
  })


  return choroplethLayer

  }
}; //end of choropleth



}; // end of getData

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////// MENU IN SIDE BAR /////////
////Puts the control in the sidebar and out of Leaflet

// https://stackoverflow.com/questions/42908826/leaflet-removing-updating-a-legend
function layerControlMenu(baseMaps, map_data,menu,map){
  // console.log(map_data);
  var layerControl = L.control.layers(null, map_data,{
    collapsed: false
  });
  layerControl.addTo(map);
  layerControl._container.remove();
  document.getElementById(menu).appendChild(layerControl.onAdd(map));


  map.on('overlayadd', function (eventLayer) {
    console.log(eventLayer.name);
    // //Switch to the Permafrost legend...
    if (eventLayer.name === 'Accidents Inspected') {
      var layerLegend = legendMap(eventLayer.layer,map); 
      layerLegend.addTo(map);

      map.on('overlayremove', function(eventLayer){
        if (eventLayer.name === 'Accidents Inspected'){
          map.removeControl(layerLegend);
        } 
      }); //layer removal
    } 
    else if (eventLayer.name === 'Fatalities & Catastrophes Inspected') {
      var layerLegend = legendMap(eventLayer.layer,map); 
      layerLegend.addTo(map);

      map.on('overlayremove', function(eventLayer){
        if (eventLayer.name === 'Fatalities & Catastrophes Inspected'){
          map.removeControl(layerLegend);
        } 
      }); //layer removal
     } 

    else if (eventLayer.name === 'Complaints Inspected') {
      var layerLegend = legendMap(eventLayer.layer,map); 
      layerLegend.addTo(map);

      map.on('overlayremove', function(eventLayer){
        if (eventLayer.name === 'Complaints Inspected'){
          map.removeControl(layerLegend);
        } 
      }); //layer removal
     } 
    else if (eventLayer.name === 'Follow Up Inpections') {
      var layerLegend = legendMap(eventLayer.layer,map); 
      layerLegend.addTo(map);

      map.on('overlayremove', function(eventLayer){
        if (eventLayer.name === 'Follow Up Inpections'){
          map.removeControl(layerLegend);
        } 
      }); //layer removal
     }      
    else if (eventLayer.name === 'Monitoring Inspections') {
      var layerLegend = legendMap(eventLayer.layer,map); 
      layerLegend.addTo(map);

      map.on('overlayremove', function(eventLayer){
        if (eventLayer.name === 'Monitoring Inspections'){
          map.removeControl(layerLegend);
        } 
      }); //layer removal
     } 
    else if (eventLayer.name === 'Variances Inspected') {
      var layerLegend = legendMap(eventLayer.layer,map); 
      layerLegend.addTo(map);

      map.on('overlayremove', function(eventLayer){
        if (eventLayer.name === 'Variances Inspected'){
          map.removeControl(layerLegend);
        } 
      }); //layer removal
     } 
    else if (eventLayer.name === 'Referrals Inspected') {
      var layerLegend = legendMap(eventLayer.layer,map); 
      layerLegend.addTo(map);

      map.on('overlayremove', function(eventLayer){
        if (eventLayer.name === 'Referrals Inspected'){
          map.removeControl(layerLegend);
        } 
      }); //layer removal
     } 
    else if (eventLayer.name === 'Planned Inspections') {
      var layerLegend = legendMap(eventLayer.layer,map); 
      layerLegend.addTo(map);

      map.on('overlayremove', function(eventLayer){
        if (eventLayer.name === 'Planned Inspections'){
          map.removeControl(layerLegend);
        } 
      }); //layer removal
     } 

});


}; //end of layerControlMenu

function layerControlMenuFatalities(baseMaps, map_data,menu,map){
  // console.log(map_data);
  var layerControl = L.control.layers(null, map_data,{
    collapsed: false
  });
  layerControl.addTo(map);
  layerControl._container.remove();
  document.getElementById(menu).appendChild(layerControl.onAdd(map));




  map.on('overlayadd', function (eventLayer) {
    console.log(eventLayer.name);
    // //Switch to the Permafrost legend...
    if (eventLayer.name === 'Fatalities by State') {
      
      var layerLegend = legendMapFatalities(eventLayer.layer,map); 
      layerLegend.addTo(map);

      map.on('overlayremove', function(eventLayer){
        if (eventLayer.name === 'Fatalities by State'){
          map.removeControl(layerLegend);
        } 
      }); //layer removal
     } 
});


}; //end of layerControlMenu


function layerControlMenuInjury(baseMaps, map_data,menu,map){
  // console.log(map_data);
  var layerControl = L.control.layers(null, map_data,{
    collapsed: false
  });
  layerControl.addTo(map);
  layerControl._container.remove();
  document.getElementById(menu).appendChild(layerControl.onAdd(map));


  map.on('overlayadd', function (eventLayer) {
    console.log(eventLayer.name);
    // //Switch to the Permafrost legend...
    if (eventLayer.name === 'Severe Injuries by State') {
      var layerLegend = legendMapInjuries(eventLayer.layer,map); 
      layerLegend.addTo(map);

      map.on('overlayremove', function(eventLayer){
        if (eventLayer.name === 'Severe Injuries by State'){
          map.removeControl(layerLegend);
        } 
      }); //layer removal
     }      


});


}; //end of layerControlMenu






function legendMap(choroplethLayer,map){
  console.log(choroplethLayer)


  // Add legend (don't forget to add the CSS from index.html)
  var legend = L.control({ position: 'bottomleft' })
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = choroplethLayer.options.limits
    var colors = choroplethLayer.options.colors
    var labels = []
    console.log(limits);



div.innerHTML = '<div><h3 style="font-weight:bolder;font-size:larger;">Inspections</h3><br></div><div class="labels"><div class="min">Low</div> \
  <div class="max">High</div></div>'

labels.push('<li style="background-color: ' + colors[0] + '"></li>')
for (i = 1; i < colors.length; i++) {
      labels.push('<li style="background-color: ' + colors[i] + '"></li>')
    }

    div.innerHTML += '<ul style="list-style-type:none;display:flex">' + labels.join('') + '</ul>'
    return div


  }
  return legend
   // legend.addTo(map)

};






function legendMapFatalities(choroplethLayer,map){
  console.log(choroplethLayer)


  // Add legend (don't forget to add the CSS from index.html)
  var legend = L.control({ position: 'bottomleft' })
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = choroplethLayer.options.limits
    var colors = choroplethLayer.options.colors
    var labels = []
    console.log(limits);



div.innerHTML = '<div><h3 style="font-weight:bolder;font-size:larger;">Fatalities</h3><br></div><div class="labels"><div class="min">Low</div> \
  <div class="max">High</div></div>'

labels.push('<li style="background-color: ' + colors[0] + '"></li>')
for (i = 1; i < colors.length; i++) {
      labels.push('<li style="background-color: ' + colors[i] + '"></li>')
    }

    div.innerHTML += '<ul style="list-style-type:none;display:flex">' + labels.join('') + '</ul>'
    return div


  }
  return legend
   // legend.addTo(map)

};

function legendMapInjuries(choroplethLayer,map){
  console.log(choroplethLayer)


  // Add legend (don't forget to add the CSS from index.html)
  var legend = L.control({ position: 'bottomleft' })
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = choroplethLayer.options.limits
    var colors = choroplethLayer.options.colors
    var labels = []
    console.log(limits);



div.innerHTML = '<div><h3 style="font-weight:bolder;font-size:larger;">Severe Injuries</h3><br></div><div class="labels"><div class="min">Low</div> \
  <div class="max">High</div></div>'

labels.push('<li style="background-color: ' + colors[0] + '"></li>')
for (i = 1; i < colors.length; i++) {
      labels.push('<li style="background-color: ' + colors[i] + '"></li>')
    }

    div.innerHTML += '<ul style="list-style-type:none;display:flex">' + labels.join('') + '</ul>'
    return div


  }
  return legend
   // legend.addTo(map)

};

