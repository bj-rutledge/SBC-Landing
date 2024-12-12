import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import InfoCard from './InfoCard';
// import './css/Map.css';

type Location = {
  address: string;
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  funFacts: string;
  imageUrl: string;
  content: string;
};

type Locations = {
  washington: Location[];
  hawaii: Location[];
};

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

  const locations: Locations = {
    washington: [
      {
        address: '521 S. Weller Seattle WA 98104',
        title: 'Job Location 1',
        subtitle: 'Project Alpha',
        phone: '123-456-7890',
        email: 'info@joblocation1.com',
        funFacts: 'This location was completed in 2020 and features sustainable building materials.',
        imageUrl: 'https://www.certifymeonline.net/wp-content/uploads/2021/09/shutterstock_1247187910-e1632964983297.jpg',
        content: 'Some Content!'
      },
      {
        address: '456 Another St, Seattle, WA 98102',
        title: 'Job Location 2',
        subtitle: 'Project Beta',
        phone: '987-654-3210',
        email: 'info@joblocation2.com',
        funFacts: 'This project won the best architecture award in 2019.',
        imageUrl: 'https://www.canam-construction.com/wp-content/uploads/2021/06/img1415.jpg',
        content: ''
      }
    ],
    hawaii: [
      {
        address: 'Example St, Honolulu, HI 96813',
        title: 'Hawaii Job 1',
        subtitle: 'Project Aloha',
        phone: '808-123-4567',
        email: 'info@hawaiijob1.com',
        funFacts: 'This job features breathtaking ocean views.',
        imageUrl: 'https://www.canam-construction.com/wp-content/uploads/2021/06/img1415.jpg',
        content: ''
      },
      {
        address: 'Another St, Maui, HI 96793',
        title: 'Hawaii Job 2',
        subtitle: 'Project Paradise',
        phone: '808-987-6543',
        email: 'info@hawaiijob2.com',
        funFacts: 'This project includes eco-friendly construction methods.',
        imageUrl: 'https://www.goconstruct.org/media/ec0pubko/hbf-construction-work-on-a-redrow-site-min.jpg?anchor=center&mode=crop&width=455&height=295&rnd=132659746009270000',
        content: ''
      }
    ]
  };

useEffect(() => {
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
  
  useEffect(() => {
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
		<div id="map" ></div>
		</div>
	</div>
  );
};

export default Map;
