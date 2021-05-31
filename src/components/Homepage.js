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
  const trackingRef = useRef();


  useEffect(() => {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`
    // googleMapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAQcS4ur98dkqmSk33_1T2ybAE1Dxel8-o&callback=initMap'
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener('load', onGoogleMapLoad)
    trackMyLocation();
  }, [])

  const onGoogleMapLoad = async () => {
    mapRef.current = new window.google.maps.Map(mapElementRef.current, {
        center: ulaanbaatar,
        zoom: 15,
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
    if(mapRef.current){
      markers.forEach((item) => new window.google.maps.Marker({
        position: { lat: item.position.lat, lng: item.position.lng },
        map: mapRef.current,
      }));
    }
  },[markers]) 
    
  

  const trackMyLocation = async () => {
    trackingRef.current = navigator.geolocation.watchPosition(position => {
      const { latitude, longitude } = position.coords;

        firestore.doc(`tracking/${user.uid}`).set({
          userId: user.uid,
          username: user.username,
          position: { lat: latitude, lng: longitude }
        })
        
     },
      console.error,
      // { maximumAge: 6000 }
    )
  }



  return (
    <div className='container map-container'>
      <header className='header'> <h4>ULAANBAATAR</h4> </header>
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