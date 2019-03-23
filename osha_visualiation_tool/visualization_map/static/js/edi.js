var geocoder = new google.maps.Geocoder();

var EDI = EDI || {};
var EDI = {

    // EDI config
    map: null,
    info: null,

    areas: [], // Array of GeoJSON features
    layers: { // GeoJSON layers to display on the map
        'zip': {},
        'tract': {},
        'school': {},
    },
    legend: null, // Map legend
    searchMarker: null,

    overlayDistribution: {}, // Distribution of overlay scores (for binning)
    domainDistribution: {}, // Distribution of domain scores

    domainRanges: {  // Nationally-recognized ranges for EDI domains
        'communication_general_knowledge': [0, 0.05, 0.09, 0.13, 0.17],
        'emotional_maturity': [0, 0.06, 0.10, 0.15, 0.19],
        'language_cognitive_development': [0, 0.05, 0.09, 0.14, 0.18],
        'physical_health_wellbeing': [0, 0.07, 0.12, 0.16, 0.21],
        'social_competence': [0, 0.05, 0.09, 0.13, 0.17],
        'vulnerable_on_one_or_more': [0, 0.2, 0.26, 0.33, 0.39],
    },

    // Default styles
    googleStyles: [
        {
            stylers: [
                { saturation: -100 },
                { lightness: 40 }
            ]
        },  
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [
                  { visibility: "off" }
            ]
        }
    ],

    layerStyle: {
        'color': '#2b8cbe',
        'weight': 0.5,
        'opacity': 0.7,
        'fillColor': '#2b8cbe',
        'fillOpacity': 0.7
    },

    // EDI domains
    domains: [
        'communication_general_knowledge',
        'emotional_maturity',
        'language_cognitive_development',
        'physical_health_wellbeing',
        'social_competence'
    ],

    verboseDomains: {
        'communication_general_knowledge': 'Communication and General Knowledge',
        'emotional_maturity': 'Emotional Maturity',
        'language_cognitive_development': 'Language and Cognitive Development',
        'physical_health_wellbeing': 'Physical Health and Wellbeing',
        'social_competence': 'Social Competence'
    },

    selectedDomain: { // Initialize the map with this domain
        'key': 'vulnerable_on_one_or_more',
        'name': 'Vulnerable on One or More Domains',
        'field': 'vulnerable',
        'verboseField': 'vulnerable'
    },

    resourceLayers: {}, // Visible resource layers
    overlayLayer: {}, // Overlay

    initializeMap: function() {
        /*
         * Initialize a Leaflet map on the page.
         */
        if (!EDI.map) {
            EDI.map = L.map('map', {
                center: [41.9, -88],
                zoom: 9,
                dragging: true,
                touchZoom: true,
                zoomControl: !L.Browser.mobile,
                tap: true,
                scrollWheelZoom: false
            });
        }

        // Add streets to the map
        EDI.streets = new L.Google('ROADMAP', {mapOptions: {styles: EDI.googleStyles}});
        EDI.map.addLayer(EDI.streets);
    },

    addMapControls: function() {
        /*
         * Add control layers onto the map.
         */

        // Create the community infobox and define its interactivity
        EDI.info = L.control({position: 'topright'});

        EDI.info.onAdd = function() {
            this._infoDiv = L.DomUtil.create('div', 'info hover hidden-xs');
            this.update();
            return this._infoDiv;
        };

        baseHtml = '<p class="hidden-xs"><i class="fa fa-fw fa-mouse-pointer"></i>Hover over a neighborhood<br/>to see its name</p>';

        EDI.info.update = function(props) {
            var text = baseHtml;
            if (props) {
                text = '';
                if (props.neighborhood_name) {
                    text += '<h4>' + props.neighborhood_name + '</h4>';
                }
            }
            this._infoDiv.innerHTML = text;
        };

        EDI.info.clear = function() {
            this._infoDiv.innerHTML = baseHtml;
        };

        EDI.info.addTo(EDI.map);

        // Hide the infobox when popups are opened
        EDI.map.on('popupopen', function() {
            $('.info.hover').hide();
        }).on('popupclose', function() {
            $('.info.hover').show();
        });

        // Create the legend
        EDI.legend = L.control({position: 'bottomleft'});

        function getLegendBody(color, breaks) {
            var html = '<div class="key-container">';

            if (typeof(breaks) === 'undefined') {
                breaks = [0.0, 0.1, 0.2, 0.3];
            }

            if (typeof(scale) === 'undefined') {
                scale = 'percentage';
            }

            // Start with the square for "no data"
            breakWidth = Math.floor(100/(breaks.length + 1)) + '%';
            html += '<div class="key-wrap" style="width:' + breakWidth + '">' +
                        '<i style="background:' + EDI.getColor() + ';opacity:0.7"></i>' +
                        '<br />' +
                        'No&nbsp;data' +
                    '</div>';

            for (var i=0; i<breaks.length; i++) {
                var grade = breaks[i];

                html += '<div class="key-wrap" style="width:' + breakWidth + '">' +
                            '<i style="background:' + EDI.getColor(color, grade, breaks) + ';opacity:0.7;"></i>' +
                            '<br />';

                var formattedGrade = Math.round(grade * 100);
                var nextGrade = Math.round(breaks[i+1] * 100) - 1 + '%';

                if (i < breaks.length - 1) {
                    formattedGrade += '-' + nextGrade;
                } else if (i === breaks.length - 1) {
                    formattedGrade += '%+';
                }

                html += formattedGrade +
                    '</div>';
            }

            html += '</div>'

            return html;
        }

        EDI.legend.onAdd = function() {
            this.legendDiv = L.DomUtil.create('div', 'info legend');
            this.legendDiv.innerHTML = '<h4 class="text-center">Percent of children not on track</h4>';

            this.legendDiv.innerHTML += getLegendBody('default');

            return this.legendDiv;
        }

        EDI.legend.update = function(title, color, breaks, scale) {
            this.legendDiv.innerHTML = '<h4 class="text-center hidden-xs" style="clear:both">' + title + '</h4>' +
                                       '<p class="text-center visible-xs" style="clear:both">' + title + '</p>';

            this.legendDiv.innerHTML += getLegendBody(color, breaks, scale);

            return this.legendDiv;
        }

        EDI.legend.append = function(title, subtitle, distribution, scale) {
            // Add another scale to the legend (used for adding overlays)
            var origHTML = this.legendDiv.innerHTML;

            this.legendDiv.innerHTML = '<h4 class="text-center hidden-xs">' + title + '</h4>' +
                                       '<p class="text-center visible-xs">' + title + '</p>';

            // Add optional subtitle
            if (typeof subtitle !== 'undefined' && subtitle !== '') {
                this.legendDiv.innerHTML += '<h3 class="text-center hidden-xs"><small>' + subtitle + '</small></h4>' +
                                            '<p class="text-center visible-xs">(' + subtitle + ')</p>';
            }

            // Add bubbles for scale
            var breaks = [0.2, 0.4, 0.6, 0.8];

            if (typeof distribution !== 'undefined' && scale !== 'percentage') {
                var max = Math.max.apply(Math, distribution);
                breaks = breaks.map(function(a) { return a * max });
            }

            var breakWidth = Math.floor(100/(breaks.length + 1)) + '%';

            for (var i=0; i<breaks.length; i++) {
                var grade = breaks[i];
                var radius = EDI.getRadius(grade, distribution, scale);

                var formattedGrade = grade;
                if (scale === 'percentage') {
                    formattedGrade = (grade * 100) + '%';
                }
                else if (grade > 1000) {
                    // for large numbers, round to thousands for spacing
                    formattedGrade = Math.round(grade / 1000) + "K";
                }
                else {
                    // Assure there are at most two decimal points for a count
                    formattedGrade = grade.toFixed(2);
                }

                // Give a little breathing room to the legend
                var initialDiv = '';
                if (i === 0) {
                    initialDiv += '<div class="key-wrap overlay-key first">';
                } else {
                    initialDiv += '<div class="key-wrap overlay-key">';
                }

                this.legendDiv.innerHTML += initialDiv +
                                                '<div class="overlay-circle" ' +
                                                      'style="margin-top:4px;width:' + radius + 'px;height:' + radius + 'px;">' +
                                                '</div>' +
                                                formattedGrade +
                                            '</div>';
            }

            this.legendDiv.innerHTML += origHTML;

            return this.legendDiv;
        }

        EDI.legend.addTo(EDI.map);
    },

    initializeSidebar: function() {
        /*
         * Initialize sidebar interactive events.
         */
        $('.selectable').on('click', function(e) {
            // Event to allow the user to select a domain
            e.preventDefault();

            // Clear existing selection
            $('.selectable').removeClass('selected');
            $(this).addClass('selected');

            // Close any open popups and remove any visible overlay layers
            EDI.map.closePopup();

            if (EDI.overlayLayer !== null) {
                EDI.map.removeLayer(EDI.overlayLayer);
                EDI.overlayLayer = null;
            }

            var currentCollapsible = '',
                type = '',
                field = '',
                verboseField = '',
                geotype = '',
                color = '',
                key = '',
                title = '',
                subtitle;

            var overlayKey = '',
                overlayField = '',
                overlayTitle = '',
                overlaySubtitle = '';

            var scale = $(this).attr('data-scale');

            // Change the manner in which we update the map based on the type
            // of selectable
            if ($(this).hasClass('edi-domain-select')) {

                key = $(this).attr('data-key');
                type = 'domain';
                currentCollapsible = $(this).attr('href');
                field = 'vulnerable';
                verboseField = 'vulnerable';
                geotype = 'tract';
                color = $(this).attr('data-color');

                var name = $(this).attr('data-verbose-name');
                if (name === 'Vulnerable on One or More Domains') {
                    title = 'Percent of children '
                } else {
                    title = 'Percent of children vulnerable in '
                }
                title += '<strong>' + name + '</strong>';

            } else if ($(this).hasClass('edi-subdomain-select')) {
                // Make sure parent stays selected
                $(this).parent('.panel-collapse').siblings('.edi-domain-select').addClass('selected');

                // Flesh out the rest of the variables
                key = $(this).attr('data-key');
                type = 'subdomain';
                currentCollapsible = '#' + $(this).parent('.panel-collapse').attr('id');
                field = 'not_ready';
                verboseField = 'not ready';
                geotype = 'tract';
                color = $(this).attr('data-color');

                var name = $(this).attr('data-verbose-name');
                title = 'Percent of children not ready in ' + '<strong>' + name + '</strong>';

            } else if ($(this).hasClass('overlay-select')) {

                // Always show overlays on top of vulnerable on one or more
                key = 'vulnerable_on_one_or_more';
                field = 'vulnerable';
                verboseField = 'vulnerable';
                title = 'Percent of children <strong>Vulnerable on One or More Domains</strong>';

                overlayKey = $(this).attr('data-key');
                type = 'overlay';
                currentCollapsible = $(this).attr('href');
                overlayTitle = $(this).attr('data-verbose-name');
                geotype = $(this).attr('data-geotype');
                color = 'default';

                // Choose the first field
                schemaSelect = $(this).siblings('.fieldnames').find('.schema-select').first();
                $(schemaSelect).addClass('selected');
                overlayField = $(schemaSelect).attr('data-field');

                // Only update the subtitle if there is more than one option
                if (!$(this).hasClass('one-field')) {
                    overlaySubtitle = $(schemaSelect).attr('data-verbose-name');
                    overlaySubtitle = overlaySubtitle.charAt(0).toUpperCase() + overlaySubtitle.slice(1);
                }

            } else if ($(this).hasClass('schema-select')) {
                // Make sure parent stays selected
                var overlay = $(this).parent('.fieldnames').siblings('.overlay-select');
                $(overlay).addClass('selected');

                // Always show overlays on top of vulnerable on one or more
                key = 'vulnerable_on_one_or_more';
                field = 'vulnerable';
                verboseField = 'vulnerable'
                title = 'Percent of children <strong>Vulnerable on One or More Domains</strong>';

                // Flesh out the rest of the variables
                overlayKey = $(overlay).attr('data-key');
                overlayField = $(this).attr('data-field');
                type = 'overlay';
                currentCollapsible = '#' + $(this).parent('.panel-collapse').attr('id');
                color = 'default';
                geotype = $(this).attr('data-geotype');
                overlayTitle = $(this).attr('data-parent-verbose-name');

                overlaySubtitle = $(this).attr('data-verbose-name');
                overlaySubtitle = overlaySubtitle.charAt(0).toUpperCase() + overlaySubtitle.slice(1);
            }

            // Collapse any other visible accordion panels and make sure
            // this one is visible
            var visiblePanels = $('#edi-domain-accordion,#overlay-accordion').find('.panel-collapse.in').not(currentCollapsible);
            visiblePanels.collapse('hide');
            $(currentCollapsible).collapse('show');

            // Determine which layer group to use based on the geotype and display it
            var layers = EDI.layers[geotype];
            layers.addTo(EDI.map);

            // Hide any other layer groups
            for (var layer in EDI.layers) {
                if (EDI.layers.hasOwnProperty(layer)) {
                    // If the layer group is initialized and is not selected, hide it
                    var grp = EDI.layers[layer];
                    if (layer !== geotype && grp._layers) {
                        grp.remove();
                    }
                }
            }

            // Get values for the distribution of scores
            var distribution = [],
                overlayDistribution = [],
                propertyType = '';

            // Get the right data source based on the data type
            switch (type) {
                case 'domain':
                    propertyType = 'domains'
                    distribution = EDI.domainDistribution[key][field];
                    break;
                case 'overlay':
                    propertyType = 'domains'
                    distribution = EDI.domainDistribution[key][field];
                    overlayDistribution = EDI.overlayDistribution[overlayKey][overlayField];
                    var overlayMax = Math.max.apply(Math, overlayDistribution);
                    break;
                case 'subdomain':
                    propertyType = 'domains'
                    distribution = EDI.subdomainDistribution[key][field];
                    break;
            }

            var cutoffs;
            if (type === 'domain' || type === 'overlay') {
                // The five main EDI domains have a set of
                // nationally-recognized ranges; use these for the cutoffs
                cutoffs = EDI.domainRanges[key];
            } else {
                // Generate ranges to use as cutoffs for for the subdomain
                // based on the quintiles of its distribution
                var distributionHasValues = distribution.some(function(elem, idx, arr) {
                    // Check if there are any values in the distribution at all
                    // (if not, the natural breaks algorithm won't work)
                    return typeof(elem) === 'string';
                });
                if (distributionHasValues) {
                    if (distribution.length > 10) {
                        cutoffs = EDI.getQuintiles(distribution);
                        // Check to see that the quintiles make sense; if not,
                        // default to natural breaks
                        var numNullBreaks = cutoffs.filter(function(x){return x === null || parseFloat(x) === 0}).length;
                        if (numNullBreaks > 1) {
                            cutoffs = EDI.getBreaks(distribution, 4);
                        }
                    } else {
                        cutoffs = EDI.getBreaks(distribution, 2);
                    }
                }
            }

            // Update the legend (`cutoffs` should be the same for all layers,
            // so we can use the last value left over from the loop)
            EDI.legend.update(title, color, cutoffs, scale);

            if (type === 'overlay') {
                // Add the overlay to the legend
                EDI.legend.append(overlayTitle, overlaySubtitle, overlayDistribution, scale);
            }

            // Update global variables storing the current selection
            EDI.selectedDomain = {
                'key': key,
                'name': title,
                'field': field,
                'verboseField': verboseField,
            };

            EDI.selectedOverlay = null;
            if (type === 'overlay') {
                EDI.selectedOverlay = {
                    'key': overlayKey,
                    'name': overlayTitle,
                    'subtitle': overlaySubtitle,
                    'field': overlayField,
                    'scale': scale
                }
            }

            // Update the choropleth
            var markers = [];
            layers.eachLayer(function(group) {
                // Iterate the layers to update colors
                group.eachLayer(function(layer) {

                    var score = layer.feature.properties[propertyType][key][field];
                    var style = EDI.getStyle(color, score, cutoffs);

                    // Update the layer on the map
                    layer.setStyle(style);

                    if (type === 'overlay') {
                        // Add the overlay to the map
                        var overlayScore = layer.feature.properties.overlays[overlayKey][overlayField];

                        overlayScore = EDI.getRadius(overlayScore, overlayDistribution, scale);

                        // TODO: get a better centroid here
                        var centroid = layer.getBounds().getCenter();

                        var icon = L.divIcon({
                            'className': 'overlay-icon-container',
                            'html': '<div class="overlay-circle" ' +
                                         'style="margin-top:4px;' +
                                                'width:' + overlayScore + 'px;' +
                                                'height:' + overlayScore + 'px;' +
                                                'margin-left:-' + (overlayScore / 2) + 'px;' +
                                                'margin-top:-' + (overlayScore / 2) + 'px">' +
                                    '</div>',
                        });

                        var markerOpts = {
                            'riseOnHover': false,
                            'clickable': false,
                            'icon': icon
                        };

                        var popup = EDI.getPopup(layer);

                        var popupOpts = ($(window).width() < 768) ? {maxWidth: $('#map').width() - 60} : {};
                        var marker = L.marker(centroid, markerOpts).bindPopup(popup, popupOpts);

                        // Marker events should match the layer events
                        var props = layer.feature.properties;
                        marker.on('mouseover', function(e) {
                            // Highlight the layer
                            layer.setStyle({
                                color: 'black',
                                weight: 5,
                                opacity: 0.6,
                            });
                            // Update the infobox
                            EDI.info.update(props);
                        }).on('mouseout', function(e) {
                            // Reset layer highlight
                            layer.setStyle(style);
                            // Clear infobox
                            EDI.info.clear();
                        });

                        markers.push(marker);
                    }

                    // Redo the event listeners to use new styles
                    layer.off('mouseout');
                    layer.on('mouseout', function(e) {
                        e.target.setStyle(style);
                        EDI.info.clear();
                    });
                });
            });

            if (markers.length > 0) {
                // Create a layer group using the markers and add it to the map
                EDI.overlayLayer = L.layerGroup(markers);
                EDI.map.addLayer(EDI.overlayLayer);
            }

        });

        // Toggle carets when showing/hiding EDI subdomains
        $('.collapse').on('show.bs.collapse', function() {
            $(this).parent().find('.fa-caret-down').attr('data-icon', 'caret-up');
        }).on('hide.bs.collapse', function() {
            $(this).parent().find('.fa-caret-up').attr('data-icon', 'caret-down');
        });

        $('.resource-select').change(function(e) {
            //Event to allow the user to select a resource layer

            // Close any open popups
            EDI.map.closePopup();

            var isChecked = typeof $(this).attr('checked') != 'undefined';
            var resourceId = $(this).attr('id');

            var layer = EDI.resourceLayers[resourceId];

            if (isChecked) {
                // Resource layer was already displayed; toggle it off
                EDI.map.removeLayer(layer);

                // Uncheck the input box
                $(this).removeAttr('checked');

            } else {
                // Resource layer was hidden; toggle it on
                EDI.map.addLayer(layer);

                // Check the input box
                $(this).attr('checked', 'checked');
            }
        });
    },

    addResourceLayer: function(resource) {
        /*
         * Add a resource layer (cluster of markers) onto the map
         */
        var resourceId = resource.slug;
        var resourceData = resource.assets;
        var icon = resource.icon;

        // Make some markers based on the resource data
        var markers = []
        for (var i = 0; i < resourceData.length; i++) {
            var place = resourceData[i];
            var popup = '<strong>' + place.name + '</strong>';

            if (place.address) {
                popup += '<br/>' + place.address;
            }

            // Skip places that don't have coordinates
            if (place.coordinates.length) {
                // Leaflet needs (lng, lat) not (lat, lng)
                var coords = [place.coordinates[1], place.coordinates[0]];

                var markerOpts = {
                    'riseOnHover': true,
                    'riseOffset': 1000,
                    'clickable': true,
                };

                if (icon) {
                    var resourceIcon = L.divIcon({
                        'className': 'resource-icon-container',
                        'html': '<div class="resource-icon">' +
                                    '<h4 style="margin:0"><i class="fa fa-fw fa-' + icon + '" style="margin-top:4px"></i></h4>' +
                                '</div>',
                    });
                    markerOpts['icon'] = resourceIcon;
                }

                var popupOpts = ($(window).width() < 768) ? {maxWidth: $('#map').width() - 60} : {};
                var marker = L.marker(coords, markerOpts).bindPopup(popup, popupOpts);
                markers.push(marker);
            }
        }

        // Create a layer group using the markers and add it to the map
        var markerGroup = L.layerGroup(markers);

        // Add the layer group to the global object
        EDI.resourceLayers[resource.key] = markerGroup;
    },

    onEachFeature: function(feature, layer) {
        /*
         * General callback function that defines highlighting behavior for
         * layers. Arguments are handled by Leaflet.
         *
         */
        var highlightFeature = function(e) {
            // Different behavior based on the input
            var layer;
            if (e.target) {
                layer = e.target;
            } else {
                layer = e;
            }

            layer.setStyle({
                color: 'black',
                weight: 5,
                opacity: 0.6,
            });

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }
        };

        var resetHighlight = function(e) {
            // Different behavior based on the input
            var layer;
            if (e.target) {
                layer = e.target;
            } else {
                layer = e;
            }

            layer.setStyle(EDI.layerStyle);
        };

        var props = feature.properties;

        var popupOpts = ($(window).width() < 768) ? {maxWidth: $('#map').width() - 60} : {};
        layer.bindPopup(EDI.getPopup, popupOpts);

        // Bind hover events
        layer.on('mouseover', function(e) {
            highlightFeature(e);
            EDI.info.update(props);
        });
        layer.on('mouseout', function(e) {
            resetHighlight(e);
            EDI.info.clear();
        });
    },

    getPopup: function(layer) {
        /*
         * Given a map layer, return a popup to display the name of the
         * neighborhood on click.
         *
         * This is primarily a placeholder function; in map.html, we override
         * it with some more complicated templating.
         */
        var props = layer.feature.properties;
        return '<h4>' + props.neighborhood_name + '</h4>'
    },

    addLayerGroup: function(layers, style, interactivity) {
        /*
         * Add new GeoJSON layers to the map, returning the group that
         * comprises the layers.
         *
         * Args:
         *  - `layers` (array):      Array of GeoJSON objects
         *  - `style` (object):      Optional style object following the same spec
         *                           as EDI.layerStyle
         * - `interactivity` (bool): Optional flag for whether or not this
         *                           layer should have interactive events
         */
        // Define optional args
        style = style || EDI.layerStyle;
        if (typeof(interactivity) === 'undefined') {
            interactivity = true;
        }

        var group = L.featureGroup();

        var layerOpts = {
            style: style,
        };

        if (interactivity) {
            layerOpts['onEachFeature'] = EDI.onEachFeature;
        }

        for (var i = 0; i < layers.length; i++) {
            var layer = L.geoJson(layers[i], layerOpts);
            group.addLayer(layer);
        }

        group.addTo(EDI.map);
        EDI.map.fitBounds(group.getBounds());

        return group;
    },

    getStyle: function(color, score, cutoffs) {
        /*
         * Get the style for a layer based on its score in a relevant domain
         * and the cutoffs (or breaks) that should bin scores.
         */
        return {
            color: 'black',
            weight: 0.5,
            opacity: 0.5,
            fillColor: EDI.getColor(color, score, cutoffs),
            fillOpacity: 0.7,
        };
    },

    getColor: function(color, value, cutoffs){
        /*
         * Return the proper color for a score, given a set of cutoffs (bins)
         */
        if (value != null && color != null && color != '') {

            var colors;
            switch (color) {
                case 'red':
                    colors = [ "#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15" ];
                    break;
                case 'yellow':
                    colors = [ "#ffffd4", "#fed98e", "#fe9929", "#d95f0e", "#993404" ];
                    break;
                case 'green':
                    colors = [ "#edf8e9", "#bae4b3", "#74c476", "#31a354", "#006d2c" ];
                    break;
                case 'blue':
                    colors = [ "#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c" ];
                    break;
                case 'purple':
                    colors = [ "#f2f0f7", "#cbc9e2", "#9e9ac8", "#756bb1", "#54278f" ];
                    break;
                default:
                    colors = [ "#f1eef6", "#bdc9e1", "#74a9cf", "#2b8cbe", "#045a8d" ];
            }

            // Match the value to the right color, making sure that we always
            // use the darkest colors for contrast
            var colorCounter = colors.length;
            for (var i=cutoffs.length; i>0; i--) {
                if (value >= cutoffs[i]) {
                    return colors[colorCounter];
                } else {
                    colorCounter -= 1;
                }
            }

            // As a fallback, return the lightest color if the value isn't
            // greater than any of the cutoffs
            return colors[0];

        } else {
            // If there's no data, return grey
            return '#A8A8A8';
        }
    },

    getQuintiles: function(data) {
        /*
         * Using `data` as a distribution, get quintile breaks
         */
        var dist = data.slice().sort(function(a,b){return a-b});

        var length = dist.length;

        var quintiles = [0.2, 0.4, 0.6, 0.8];

        return [0].concat(quintiles.map(function(quint){return dist[Math.floor(length * quint) - 1]}));
    },

    getBreaks: function(data, n_classes) {
        /*
         * Jenks natural breaks optimization algorithm -- sourced from:
         * https://gist.github.com/tmcw/4977508
         * Thanks @tmcw!
         */
        // Compute the matrices required for Jenks breaks. These matrices
        // can be used for any classing of data with `classes <= n_classes`
        function getMatrices(data, n_classes) {

            // in the original implementation, these matrices are referred to
            // as `LC` and `OP`
            //
            // * lower_class_limits (LC): optimal lower class limits
            // * variance_combinations (OP): optimal variance combinations for all classes
            var lower_class_limits = [],
                variance_combinations = [],
                // loop counters
                i, j,
                // the variance, as computed at each step in the calculation
                variance = 0;

            // Initialize and fill each matrix with zeroes
            for (i = 0; i < data.length + 1; i++) {
                var tmp1 = [], tmp2 = [];
                for (j = 0; j < n_classes + 1; j++) {
                    tmp1.push(0);
                    tmp2.push(0);
                }
                lower_class_limits.push(tmp1);
                variance_combinations.push(tmp2);
            }

            for (i = 1; i < n_classes + 1; i++) {
                lower_class_limits[1][i] = 1;
                variance_combinations[1][i] = 0;
                // in the original implementation, 9999999 is used but
                // since Javascript has `Infinity`, we use that.
                for (j = 2; j < data.length + 1; j++) {
                    variance_combinations[j][i] = Infinity;
                }
            }

            for (var l = 2; l < data.length + 1; l++) {

                // `SZ` originally. this is the sum of the values seen thus
                // far when calculating variance.
                var sum = 0,
                    // `ZSQ` originally. the sum of squares of values seen
                    // thus far
                    sum_squares = 0,
                    // `WT` originally. This is the number of
                    w = 0,
                    // `IV` originally
                    i4 = 0;

                // in several instances, you could say `Math.pow(x, 2)`
                // instead of `x * x`, but this is slower in some browsers
                // introduces an unnecessary concept.
                for (var m = 1; m < l + 1; m++) {

                    // `III` originally
                    var lower_class_limit = l - m + 1,
                        val = data[lower_class_limit - 1];

                    // here we're estimating variance for each potential classing
                    // of the data, for each potential number of classes. `w`
                    // is the number of data points considered so far.
                    w++;

                    // increase the current sum and sum-of-squares
                    sum += val;
                    sum_squares += val * val;

                    // the variance at this point in the sequence is the difference
                    // between the sum of squares and the total x 2, over the number
                    // of samples.
                    variance = sum_squares - (sum * sum) / w;

                    i4 = lower_class_limit - 1;

                    if (i4 !== 0) {
                        for (j = 2; j < n_classes + 1; j++) {
                            // if adding this element to an existing class
                            // will increase its variance beyond the limit, break
                            // the class at this point, setting the lower_class_limit
                            // at this point.
                            if (variance_combinations[l][j] >=
                                (variance + variance_combinations[i4][j - 1])) {
                                lower_class_limits[l][j] = lower_class_limit;
                                variance_combinations[l][j] = variance +
                                    variance_combinations[i4][j - 1];
                            }
                        }
                    }
                }

                lower_class_limits[l][1] = 1;
                variance_combinations[l][1] = variance;
            }

            // return the two matrices. for just providing breaks, only
            // `lower_class_limits` is needed, but variances can be useful to
            // evaluage goodness of fit.
            return {
                lower_class_limits: lower_class_limits,
                variance_combinations: variance_combinations
            };
        }

        // the second part of the jenks recipe: take the calculated matrices
        // and derive an array of n breaks.
        function breaks(data, lower_class_limits, n_classes) {

            var k = data.length - 1,
                kclass = [],
                countNum = n_classes;

            // the calculation of classes will never include the upper and
            // lower bounds, so we need to explicitly set them
            kclass[n_classes] = data[data.length - 1];
            kclass[0] = data[0];

            // the lower_class_limits matrix is used as indexes into itself
            // here: the `k` variable is reused in each iteration.
            while (countNum > 1) {
                kclass[countNum - 1] = data[lower_class_limits[k][countNum] - 2];
                k = lower_class_limits[k][countNum] - 1;
                countNum--;
            }

            return kclass;
        }

        if (n_classes > data.length) return null;

        // sort data in numerical order, since this is expected
        // by the matrices function
        data = data.slice().sort(function (a, b) { return a - b; });

        // get our basic matrices
        var matrices = getMatrices(data, n_classes),
            // we only need lower class limits here
            lower_class_limits = matrices.lower_class_limits;

        // extract n_classes out of the computed matrices
        var rawBreaks = breaks(data, lower_class_limits, n_classes);

        // Final formatting
        var breaksNoNulls = rawBreaks.filter(function(elem) { return elem; });
        return breaksNoNulls.filter(function(elem, idx) { return elem !== breaksNoNulls[idx-1]; });
    },

    addressSearch: function(e) {
        /*
         * Search for an address, and display it as a marker on the map.
         */
        if (e) {
            e.preventDefault();
        }
        var searchAddress = $("#search-address").val();
        if (searchAddress !== '') {
            geocoder.geocode({'address': searchAddress}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var searchCoords = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];

                    var searchZoom = EDI.map.getZoom();
                    EDI.map.setView(searchCoords, searchZoom);

                    if (EDI.searchMarker) {
                        EDI.map.removeLayer(EDI.searchMarker);
                    }

                    var markerOpts = {
                        riseOnHover: true
                    };

                    var popup = '<a class="remove-marker" role="button" href="#">' +
                                    '<i class="fa fa-fw fa-times"></i>' +
                                    ' Remove this search' +
                                '</a>';

                    EDI.searchMarker = L.marker(searchCoords, markerOpts).addTo(EDI.map).bindPopup(popup);

                    EDI.searchMarker.on('popupopen', function() {
                        $('.remove-marker').click(function(e) {
                            e.preventDefault();

                            EDI.map.removeLayer(EDI.searchMarker);
                            $('#search-address').val('');
                        });
                    });
                }
                else {
                    alert("We could not find that address: " + status);
                }
            });
        }
    },

    getRadius: function(score, distribution, scale) {
        /*
         * Return the radius of an overlay circle given a score, its distribution, and
         * the scale (count or percentage) of the overlay.
         * */
        var overlayScore = 0;
        if (score !== null) {
            overlayScore = parseFloat(score);
        }

        if (scale !== 'percentage') {
            overlayScore /= Math.max.apply(Math, distribution);
        }

        // Set the maximum and minimum size of the radius in pixels
        var maxScore = 60;
        var minScore = 5;

        var scaledScore = overlayScore * maxScore;

        var radius = scaledScore < minScore ? minScore : scaledScore;

        return radius;
    }
}
  
































































// https://redash.alanrossmachinery.com/queries/96





/* Custom CSS*/
/*
.legend {
color: #555;
padding: 6px 8px;
font: 12px Arial, Helvetica, sans-serif;
font-weight: bold;
background: white;
box-shadow: 0 0 15px rgba(0,0,0,0.2);
border-radius: 5px;
}
.legend ul {
list-style-type: none;
padding: 0;
margin: 0;
clear: both;
}
.legend li {
display: inline-block;
width: 30px;
height: 22px;
opacity: 0.7;
}
.legend .min {
float: left;
padding-bottom: 5px;
}
.legend .max {
float: right;
}
*/
var map = L.map("map");

map.setView([40.3,-96.6], 5);

L.hash(map);

L.control.scale().addTo(map);

var layerControl = new L.control.layers(null, null).addTo(map);

/*Easily add basemaps or baselayers with L.tileLayer wms layers can also be added with L.tileLayer.wms */

var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
}).addTo(map);

layerControl.addBaseLayer(OpenStreetMap_HOT, "Streets");

var url = "/gis-tutorials/tutorial-data/counties.topojson";

var counties = L.geoJson(null, {
  filter: function(feature) {
    if (feature.properties.state == 39) {
      return true
    }
  },
  style: function(feature) {
    switch (feature.properties.winner) {
      case "Trump":
        return {
          fillColor: "red",
          color: 'white',
          fillOpacity: 0.7
        }
      default:
        return {
          fillColor: "blue",
          color: 'white',
          fillOpacity: 0.7
        }
    }
  },
  onEachFeature: function(feature, county) {
    var info = county.feature.properties.NAME +
      '<' + 'br' + '>' + county.feature.properties.winner;
    county.bindPopup(info);
  }
}).addTo(map);

/*can put html inside here, this is one way you could add a legend*/
layerControl.addOverlay(counties, "Counties");

var cData = omnivore.topojson(url, null, counties);

cData.on('ready', function() {
  map.fitBounds(counties.getBounds())
});

// Search

cData.on("ready", function() {

    var searchControl = new L.Control.Search({
        layer: counties,
        propertyName: 'NAME',
    }).addTo(map);

});




// Choropleth MAP
cData.on("ready", function() {
  
  map.removeLayer(counties);
  
  choropleth = L.choropleth(cData.toGeoJSON(), {
    filter: function(feature) {
      if (feature.properties.state == 39) {
        return true
      }
      // end of filter function 
    },
    

    valueProperty: "POP_SQMI", // which property in the features to use
    scale: ["white", "#006d2c"], // chroma.js scale - include as many as you like
    steps: 7, // number of breaks or steps in range
    mode: "q", // q for quantile, e for equidistant, k for k-means
    style: {
      color: "#fff", // border color
      weight: 1,
      fillOpacity: 0.9
    },
    onEachFeature: function(feature, layer) {
      layer.bindTooltip(feature.properties.NAME + '<' + 'br' + '>' + +feature.properties.POPULATION)
    }
  }).addTo(map);

  // end of onEachFeature 



  layerControl.addOverlay(choropleth, "Choropleth");

  /*Legend Custom Leaflet Control*/
  var legend = L.control({ position: 'bottomright' });
  
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend')
    var colors = choropleth.options.colors
    var labels = []

    /* Add min & max*/
    div.innerHTML = '<div><h3 style="font-weight:bolder;font-size:larger;">Population Density</h3><br></div><div class="labels"><div class="min">Low</div> \
  <div class="max">High</div></div>'

  for (i = 1; i < colors.length; i++) {
      labels.push('<li style="background-color: ' + colors[i] + '"></li>')
    }

    div.innerHTML += '<ul style="list-style-type:none;display:flex">' + labels.join('') + '</ul>'
    return div
  }

  legend.addTo(map);
});









L.choropleth(geojsonData, {
    valueProperty: 'incidents', // which property in the features to use
    scale: ['white', 'red'], // chroma.js scale - include as many as you like
    steps: 5, // number of breaks or steps in range
    mode: 'q', // q for quantile, e for equidistant, k for k-means
    style: {
        color: '#fff', // border color
        weight: 2,
        fillOpacity: 0.8
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.value)
    }
}).addTo(map)





































