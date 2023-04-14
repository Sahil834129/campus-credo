import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import {
  StandaloneSearchBox
} from "react-google-maps/lib/components/places/StandaloneSearchBox";

const MapAddress = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBMP95aNz-7G4CiRf5-6msK1pn7YkQQOsQ&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        place: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const place = refs.searchBox.getPlaces();
          const lat = place[0].geometry.location.lat();
          const lng = place[0].geometry.location.lng();
          this.props.setDefaultLatLng({
            lat,
            lng
          });
          this.setState({
            place,
          });
        }
      });
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <>
    <div data-standalone-searchbox="">
      <StandaloneSearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Customized your placeholder"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`
          }}
        />
      </StandaloneSearchBox>
    </div>
    <div>
      <GoogleMap
        defaultZoom={14}
        center={{ lat: props.lat, lng: props.lng }}
      >
        {props.isMarkerShown && (
          <Marker
            position={{ lat: props.lat, lng: props.lng }}
            draggable={true}
            onDragEnd={e => props.drag(e)}
          />
        )}
      </GoogleMap>
    </div>
  </>
));

export default MapAddress;