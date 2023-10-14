import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { CircularProgress,
  Box,
  Card, 
  Typography,
  Button} from '@mui/material';
  
  const containerStyle = {
    width: '400px',
    height: '400px'
  };
  



const SetTreasure = ({latitude,longitude}) => {


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_API_KEY
      })

      const center = {
        lat: latitude,
        lng: longitude
      };

      const mapClicked = ()=>{
        console.log("clicked")
      }
      
 
  function _onClick(obj){ console.log(obj.latLng.lat(),obj.latLng.lng())}
      
  const [map, setMap] = React.useState(null)
    
      const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])
    
      return isLoaded ? (
  
      <GoogleMap
            onClick={_onClick}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
        <></>
        </GoogleMap>
      
    
      ) : <></>
  
}

export default SetTreasure