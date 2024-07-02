const defaultLocation = { lat: 11.556573867797852, lng: 104.92828369140625 };

let data = [];
let markers = [];
let map, infoWindow;

document.addEventListener("DOMContentLoaded", () => {
  const key = document.getElementById("map").getAttribute("value");

  // Loader
  const loader = new google.maps.plugins.loader.Loader({
    apiKey: key,
    version: "weekly",
    libraries: ["marker", "places", "core"],
  });

  loader.load().then((google) => {
    map = new google.maps.Map(document.getElementById("map"), {
      center: defaultLocation,
      zoom: 14,
      gestureHandling: "cooperative",
      mapId: "DEMO_MAP_ID",
    });

    infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });

    // Create an array of alphabetical characters used to label the markers.
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // Add some markers to the map.
    markers = data.map((position, i) => {
      const label = labels[i % labels.length];
      const pinGlyph = new google.maps.marker.PinElement({
        glyph: label,
        glyphColor: "white",
      });
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: position.lat, lng: position.lng },
        content: pinGlyph.element,
        gmpClickable: true,
      });

      // markers can only be keyboard focusable when they have click listeners
      // open info window when marker is clicked
      marker.addListener("click", (domEvent, _latLng) => {
        const { target } = domEvent;

        map.setCenter(marker.position);
        map.setZoom(16);

        infoWindow.close();
        infoWindow.setContent(
          `<h1> ${position.title}</h1>` +
            `<h1> ${position.content}</h1>` +
            `<h1> ${position.address}</h1>`
        );
        infoWindow.open(map, marker);
      });

      return marker;
    });

    // Add a marker clusterer to manage the markers.
    new markerClusterer.MarkerClusterer({ markers, map });

    // Create the search box and link it to the UI element.
    const input = document.getElementById("search-input");
    const searchBox = new google.maps.places.SearchBox(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      changeToAdd();
      hideDeleteButton();
      const places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      clear();

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();

      places.forEach((place, i) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          title: place.name,
          position: place.geometry.location,
        });

        // Create a new marker for each place.
        markers.push(marker);

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }

        // Use the Places Details API to get place Id for more accurate search
        const service = new google.maps.places.PlacesService(map);
        service.getDetails({ placeId: place.place_id }, (details, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            marker.addListener("click", () => {
              setDocumentValues(
                place.place_id,
                place.geometry.location.lat(),
                place.geometry.location.lng(),
                details.name,
                details.formatted_address,
                details.url
              );

              map.setCenter(marker.position);
              map.setZoom(16);

              infoWindow.close();
              infoWindow.setContent(`<h1>${details.name}</h1>`);
              infoWindow.open(map, marker);
            });

            // Auto filled the form if the search result retrun 1 place
            if (places.length == 1) {
              setDocumentValues(
                place.place_id,
                place.geometry.location.lat(),
                place.geometry.location.lng(),
                details.name,
                details.formatted_address,
                details.url
              );
            }
          }
        });
      });

      map.fitBounds(bounds);
    });

    // Clear markers and search box when clear button is clicked
    document.getElementById("clear-search").addEventListener("click", () => {
      input.value = "";
      clearMarkers();
      clear();
      changeToAdd();
      hideDeleteButton();
    });

    // Clear markers and search box when input is cleared manually
    input.addEventListener("input", () => {
      if (!input.value) {
        clearMarkers();
        clear();
        changeToAdd();
        hideDeleteButton();
      }
    });
  });
});

const setDocumentValues = (
  place_id,
  lat,
  lng,
  name,
  formatted_address,
  url,
  label,
  showDelete
) => {
  if (showDelete == true) {
    showDeleteButton();
    changeToUpdate();
  }
  document.getElementById("form-place-id").value = place_id;
  document.getElementById("form-lat").value = lat;
  document.getElementById("form-lng").value = lng;
  document.getElementById("form-name").value = name;
  document.getElementById("form-address").value = formatted_address;
  const formLink = document.getElementById("form-link");
  formLink.textContent = url;
  formLink.setAttribute("href", url);
  if (label) document.getElementById("form-label").value = label;

  updateMarker({ lat: parseFloat(lat), lng: parseFloat(lng) }, name);
};

const clearMarkers = () => {
  markers.forEach((marker) => {
    marker.setMap(null);
  });
  markers = [];
};

const clear = () => {
  document.getElementById("form-label").value = "";
  document.getElementById("form-name").value = "";
  document.getElementById("form-address").value = "";
  const formLink = document.getElementById("form-link");
  formLink.textContent = "Link";
  formLink.setAttribute("href", "#");
};

const hideDeleteButton = () => {
  const deleteButton = document.getElementById("delete-button");
  deleteButton.classList.add("hidden");
};

const showDeleteButton = () => {
  const deleteButton = document.getElementById("delete-button");
  deleteButton.classList.remove("hidden");
};

const changeToUpdate = () => {
  const submitButton = document.getElementById("submit-button");
  submitButton.textContent = "Update";
  // submitButton.setAttribute("href", "#");
};

const changeToAdd = () => {
  const submitButton = document.getElementById("submit-button");
  submitButton.textContent = "Add";
};

const updateMarker = (position, title) => {
  // Clear existing markers
  clearMarkers();

  // Create a new marker
  const marker = new google.maps.marker.AdvancedMarkerElement({
    position,
    title,
    map,
  });

  markers.push(marker);

  map.setCenter(position);
  map.setZoom(16);

  infoWindow.close();
  infoWindow.setContent(`<h1>${title}</h1>`);
  infoWindow.open(map, marker);
};

// Helper function to update the marker when the address tile is clicked
const addressTileClickHandler = (address) => {
  setDocumentValues(
    address.place_id,
    address.lat,
    address.lng,
    address.name,
    address.address,
    address.link,
    address.label,
    true
  );
  updateMarker(
    { lat: parseFloat(address.lat), lng: parseFloat(address.lng) },
    address.name
  );
};
