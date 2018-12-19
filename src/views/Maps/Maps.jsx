import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const CustomSkinMap = withScriptjs(
  withGoogleMap(props => {
    console.log("LOCATION:");
    console.log(props.location);
    console.log(props.zoom);
    return (
      <GoogleMap
        defaultZoom={props.zoom}
        defaultCenter={{
          lat: parseFloat(props.location.longitude),
          lng: parseFloat(props.location.latitude)
        }}
        defaultOptions={{
          scrollwheel: false,
          zoomControl: true,
          styles: [
            {
              featureType: "water",
              stylers: [
                { saturation: 43 },
                { lightness: -11 },
                { hue: "#0088ff" }
              ]
            },
            {
              featureType: "road",
              elementType: "geometry.fill",
              stylers: [
                { hue: "#ff0000" },
                { saturation: -100 },
                { lightness: 99 }
              ]
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#808080" }, { lightness: 54 }]
            },
            {
              featureType: "landscape.man_made",
              elementType: "geometry.fill",
              stylers: [{ color: "#ece2d9" }]
            },
            {
              featureType: "poi.park",
              elementType: "geometry.fill",
              stylers: [{ color: "#ccdca1" }]
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#767676" }]
            },
            {
              featureType: "road",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#ffffff" }]
            },
            { featureType: "poi", stylers: [{ visibility: "off" }] },
            {
              featureType: "landscape.natural",
              elementType: "geometry.fill",
              stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
            },
            { featureType: "poi.park", stylers: [{ visibility: "on" }] },
            {
              featureType: "poi.sports_complex",
              stylers: [{ visibility: "on" }]
            },
            { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
            {
              featureType: "poi.business",
              stylers: [{ visibility: "simplified" }]
            }
          ]
        }}
      >
        {props.markers}
      </GoogleMap>
    );
  })
);

class Maps extends React.Component {
  state = {
    allMarkers: []
  };

  componentDidMount() {
    fetch("https://epicentereu.azurewebsites.net/api/timestamps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 200) return Promise.resolve(response.json());
        return Promise.reject(response.json());
      })
      .then(timestamps => {
        const markers = timestamps.map(timestamp => (
          <Marker
            position={{ lat: timestamp.latitude, lng: timestamp.longitude }}
            title={
              timestamp.missingModel.type === 0
                ? `${timestamp.missingModel.firstName} ${timestamp.missingModel
                    .lastName}`
                : timestamp.missingModel.message
            }
            description={timestamp.dateAndTime}
          />
        ));
        this.setState({ allMarkers: markers });
      })
      .catch(() => console.log("Timestamps fetch fail"));
  }

  render() {
    let pos = {
      coords: {
        longitude: "54.703369411923255",
        latitude: "25.316883711840937"
      }
    };
    const isSpecific = !isNaN(this.props.match.params.latitude) && !isNaN(this.props.match.params.longitude);
    console.log(isSpecific);
    return (
      <CustomSkinMap
      zoom={isSpecific ? 19 : 13}
        location={
          isSpecific ? this.props.match.params : {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude
          }
        }
        markers={this.state.allMarkers}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAuD_4MSfBdHkJQA0XsinH1j0IhfuDFLMc"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default Maps;
