/**
 * Created by BJ Rutledge
 * Date:2024-12-12
 **/
import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import InfoCard from './InfoCard';
import { Location } from './helpers/types/Location';
import locations from './helpers/locations';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

declare global {
  interface Window {
    google: typeof google;
    initMap: () => void;
  }
}

const Map: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<'washington' | 'hawaii'>('washington');
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  useIsomorphicLayoutEffect(() => {
    const loadScript = () => {
      if (!document.getElementById('google-maps-script')) {
        const script = document.createElement('script');
        script.id = 'google-maps-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBcES1hGuygyYXwZswFCQP4yC6iSqvmCU8&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    };

    window.initMap = () => {
      const mapInstance = new window.google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 47.6062, lng: -122.3321 },
        zoom: 10
      });
      setMap(mapInstance);
      setGeocoder(new window.google.maps.Geocoder());
    };

    loadScript();
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (map && geocoder) {
      loadLocations(selectedRegion);
    }
  }, [map, geocoder, selectedRegion]);

  const loadLocations = (region: 'washington' | 'hawaii') => {
    if (map) {
      // Remove existing markers from the map
      markers.forEach(marker => marker.setMap(null));
      setMarkers([]);

      const bounds = new window.google.maps.LatLngBounds();
      locations[region].forEach(location => {
        geocodeAddress(location, bounds);
      });
    }
  };

  const geocodeAddress = (location: Location, bounds: google.maps.LatLngBounds) => {
    if (geocoder && map) {
      geocoder.geocode({ address: location.address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {

          const marker = new window.google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            title: location.title
          });

          bounds.extend(results[0].geometry.location);
          map.fitBounds(bounds);

          const contentString = ReactDOMServer.renderToString(
            <InfoCard
              imageUrl={location.imageUrl}
              title={location.title}
              subtitle={location.subtitle}
              address={location.address}
              phone={location.phone}
              email={location.email}
              funFacts={location.funFacts}
            />
          );

          const infoWindow = new window.google.maps.InfoWindow({
            content: contentString
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          // Add marker to state for future removal
          setMarkers(prevMarkers => [...prevMarkers, marker]);
        } else {
          console.error(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    }
  };

  return (
    <div>
      <h1>Our Job Locations</h1>
      <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value as 'washington' | 'hawaii')}>
        <option value="washington">Washington</option>
        <option value="hawaii">Hawaii</option>
      </select>
      <div className="map-container">
        <div id="map"></div>
      </div>
    </div>
  );
};

export default Map;