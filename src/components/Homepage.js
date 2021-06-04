import './homepage.scss';
import { useEffect, useRef, useState } from 'react'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
import { firestore } from './base';
const GOOGLE_API_KEY = 'AIzaSyDD1bL9fKZ3r1YsNSBNd7kWwVyW3F4FkV4';
const ulaanbaatar = { lat: 47.919067, lng: 106.917538 };

const Homepage = ({ user }) => {
  const mapElementRef = useRef();
  const mapRef = useRef();
  const [markers, setMarkers] = useState([]);
  const markerRef = useRef();
  // const trackingRef = useRef();


  useEffect(() => {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`
    // googleMapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAQcS4ur98dkqmSk33_1T2ybAE1Dxel8-o&callback=initMap'
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener('load', onGoogleMapLoad)
  }, [])

  const onGoogleMapLoad = async () => {
    mapRef.current = new window.google.maps.Map(mapElementRef.current, {
        center: ulaanbaatar,
        zoom: 3,
        // styles: [
        //   { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        //   { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        //   { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        //   {
        //     featureType: "administrative.locality",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#d59563" }],
        //   },
        //   {
        //     featureType: "poi",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#d59563" }],
        //   },
        //   {
        //     featureType: "poi.park",
        //     elementType: "geometry",
        //     stylers: [{ color: "#263c3f" }],
        //   },
        //   {
        //     featureType: "poi.park",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#6b9a76" }],
        //   },
        //   {
        //     featureType: "road",
        //     elementType: "geometry",
        //     stylers: [{ color: "#38414e" }],
        //   },
        //   {
        //     featureType: "road",
        //     elementType: "geometry.stroke",
        //     stylers: [{ color: "#212a37" }],
        //   },
        //   {
        //     featureType: "road",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#9ca5b3" }],
        //   },
        //   {
        //     featureType: "road.highway",
        //     elementType: "geometry",
        //     stylers: [{ color: "#746855" }],
        //   },
        //   {
        //     featureType: "road.highway",
        //     elementType: "geometry.stroke",
        //     stylers: [{ color: "#1f2835" }],
        //   },
        //   {
        //     featureType: "road.highway",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#f3d19c" }],
        //   },
        //   {
        //     featureType: "transit",
        //     elementType: "geometry",
        //     stylers: [{ color: "#2f3948" }],
        //   },
        //   {
        //     featureType: "transit.station",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#d59563" }],
        //   },
        //   {
        //     featureType: "water",
        //     elementType: "geometry",
        //     stylers: [{ color: "#17263c" }],
        //   },
        //   {
        //     featureType: "water",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#515c6d" }],
        //   },
        //   {
        //     featureType: "water",
        //     elementType: "labels.text.stroke",
        //     stylers: [{ color: "#17263c" }],
        //   },
        // ],
    });

    firestore.collection('tracking').onSnapshot((querySnapshot) => {
      const markerList = [];
      querySnapshot.forEach((doc) => {
        markerList.push(doc.data())
      })
      setMarkers(markerList);  
    })
  }

  useEffect(() => {
    let markerObj = [];
   
    if(mapRef.current){
      markerObj = markers.map((item) => 
        new window.google.maps.Marker({
          icon: {
            url: item.image || 'https://developers.google.com/maps/images/maps-icon.svg',
            scaledSize: {
              width: 30,
              height: 40,
            }
          },
          label: item.username,
          position: { lat: item.position.lat, lng: item.position.lng },
          map: mapRef.current,
        }));
    }
    
    return () => {
      markerObj.forEach((item) => {
        item.setMap(null)
      })
    }
    

  },[markers]) 
    
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(position => {
      const { latitude, longitude } = position.coords;

        firestore.doc(`tracking/${user.uid}`).set({
          userId: user.uid,
          username: user.username,
          position: { lat: latitude, lng: longitude },
          image: user.image,
        })
    })    

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  },[])


  return (
    <div className='container map-container'>
      <header className='header'> <h4>ZENLY</h4> </header>
      <div ref={mapElementRef} className='map'></div>
      <div className='button-container'>
        <Link to='/friendreq' className="btn-floating btn-large waves-effect waves-light white"><i className="material-icons indigo-text">chat</i></Link>
        <Link to='/' className="btn-floating btn-large waves-effect waves-light white"><i className="material-icons indigo-text">center_focus_weak</i></Link>
        <Link to='/profile' className="btn-floating btn-large waves-effect waves-light white"><i className="material-icons indigo-text">account_circle</i></Link>
      </div>
    </div>
  );
}
export default Homepage;