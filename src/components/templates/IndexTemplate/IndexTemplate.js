import React from "react";
import PropTypes from "prop-types";

import GoogleMapReact from "google-map-react";

import { GOOGLE_API_KEY } from "../../../constants/envValues";
import Marker from "../../atoms/Marker";
import { DefaultCenter, DefaultZoom } from "../../../constants/mapConstants";
import LockerSetDetail from "../../organisms/LockerSetDetail";
import { MainDrawerState } from "../../../contexts/mainButtonContext";
import LockerSetList from "../../organisms/LockerSetList";
import BottomDrawer from "../../organisms/BottomDrawer";

IndexTemplate.propTypes = {
  lockerSets: PropTypes.array.isRequired,
  activeLockerSet: PropTypes.object,
  onMapChildClick: PropTypes.func.isRequired,
  drawerState: PropTypes.string.isRequired,
  onCloseDrawer: PropTypes.func.isRequired,
  center: PropTypes.object.isRequired,
  zoom: PropTypes.number.isRequired,
  handleMapChange: PropTypes.func.isRequired,
  onSelectLockerSet: PropTypes.func.isRequired
};
IndexTemplate.defaultProps = {
  lockerSets: [],
  activeLockerSet: null,
  onMapChildClick: () => {},
  drawerState: MainDrawerState.inactive,
  onCloseDrawer: () => {},
  center: DefaultCenter,
  zoom: DefaultZoom,
  handleMapChange: () => {},
  onSelectLockerSet: () => {}
};

function IndexTemplate(props) {
  const {
    lockerSets,
    activeLockerSet,
    onMapChildClick,
    drawerState,
    onCloseDrawer,
    center,
    zoom,
    handleMapChange,
    onSelectLockerSet
  } = props;

  return (
    <div style={{ position: "absolute", height: "100%", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        center={center}
        zoom={zoom}
        onChange={handleMapChange}
        onChildClick={onMapChildClick}
        options={{
          clickableIcons: false,
          fullscreenControl: false
        }}
      >
        {lockerSets.map(lockerSet => (
          <Marker
            key={lockerSet.sid}
            lat={lockerSet.latitude}
            lng={lockerSet.longitude}
            title={lockerSet.locationDisplay}
          />
        ))}
      </GoogleMapReact>

      {/* Drawer */}
      <BottomDrawer
        open={drawerState !== MainDrawerState.inactive}
        onClose={onCloseDrawer}
      >
        {drawerState === MainDrawerState.showList ? (
          <LockerSetList
            lockerSets={lockerSets}
            onSelectLockerSet={onSelectLockerSet}
          />
        ) : (
          <LockerSetDetail lockerSet={activeLockerSet} />
        )}
      </BottomDrawer>
    </div>
  );
}

export default IndexTemplate;
