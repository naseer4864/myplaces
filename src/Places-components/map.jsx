import React, { useRef, useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
// import { fromLonLat } from 'ol/proj';

const MyMap = ({ map = { location: { lng: 0, lat: 0 }, zoom: 0 } }) => {
  const mapRef = useRef();

  const { location, zoom } = map;

  useEffect(() => {
    new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        // location: fromLonLat([location.lng, location.lat]),
        zoom: zoom
      })
    });
  }, [location, zoom]);

  return <div ref={mapRef} className="map" />;
};

export default MyMap;
