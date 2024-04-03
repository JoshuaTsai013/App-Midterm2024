import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Box, Center } from '@gluestack-ui/themed';
import * as Location from 'expo-location';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import metroJson from "../json/MemoryPlace.json";
import ActionButton from '../components/ActionButton';

export default function MapScreen() {
   const [msg, setMsg] = useState("Waiting...");
   const [onCurrentLocation, setOnCurrentLocation] = useState(false);
   const [metro, setMetro] = useState(metroJson);
   const [ubike, setUbike] = useState([]);
   const [zoomRatio, setZoomRatio] = useState(1);

   const [region, setRegion] = useState({
      longitude: 121.6,
      latitude: 25.05,
      longitudeDelta: 0.1,
      latitudeDelta: 0.2,
   })
   const [marker, setMarker] = useState({
      coord: {
         longitude: 121.544637,
         latitude: 25.024624,
      },
   });

   const setRegionAndMarker = (location) => {
      setRegion({
         ...region,
         longitude: location.coords.longitude,
         latitude: location.coords.latitude,
      });
      setMarker({
         ...marker,
         coord: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
         },
      });
   };

   const onRegionChangeComplete = (rgn) => {
      if (rgn.longitudeDelta > 0.02)
         setZoomRatio(0.02 / rgn.longitudeDelta);
      else
         setZoomRatio(1);
   }

   const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
         setMsg('Permission to access location was denied');
         return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setRegionAndMarker(location);
      setOnCurrentLocation(true);
   }
   useEffect(() => {
      getLocation();
   }, []);

   return (
      <Box flex={1}>
         <MapView
            initialRegion={region}
            style={{ flex: 1 }}
            showsTraffic
            onRegionChangeComplete={onRegionChangeComplete}
         >
            {(zoomRatio > 0.14) && metro.map((site) => (
               <Marker
                  coordinate={{ latitude: site.latitude, longitude: site.longitude }}
                  key={`${site.id}${site.line}`}
                  title={site.name}
                  description={site.address}
               >
                <ActionButton zoomRatio={zoomRatio} site={site}/>

               </Marker>
            ))}
         </MapView>
      </Box>
   );
}