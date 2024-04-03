import React, { useContext, useState,useRef } from 'react';
import { View, StyleSheet,Image } from 'react-native';
import { HStack, Center, ScrollView, Box, Text, Pressable } from "@gluestack-ui/themed";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewStyle from '../json/MapViewStyle.json'
import { UserLocation } from '../components/UserLocation'
import { Marker } from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from '../components/SearchBar';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP_API_KEY } from "../Api";

const WishListScreen = () => {

    const { location, setLocation } = useContext(UserLocation);
    const[placeList,setPlaceList]=useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null); // 新增 selectedLocation 狀態來存儲選擇的位置

    const mapRef=useRef(null);

    async function moveToLocation(latitude,longitude){
            mapRef.current.animateToRegion({
                latitude,
                longitude,
                latitudeDelta:0.015,
                longitudeDelta:0.0121,
            },
            2000,
            );
            setSelectedLocation({ latitude, longitude });
    }

    return location?.latitude && (
        <Box alignItems='center' style={{ flex: 1 }} >
            <Box mt={60} w="80%" position='absolute' zIndex={10}>
            <GooglePlacesAutocomplete
                placeholder='Search your memory'
                fetchDetails={true}
                onPress={(data, details = null) => {
                    console.log(JSON.stringify(details?.geometry?.location));
                    moveToLocation(details?.geometry?.location.lat,details?.geometry?.location.lng);
                }}
                query={{
                    key: GOOGLE_MAP_API_KEY,
                    language: 'en',
                }}
                styles={{
                    container:{
                        borderRadius:20
                    },
                    textInputContainer: {
                        borderRadius: 20, // 設置文字輸入框容器的邊緣半徑為20像素，使邊緣變圓
                    },
                    textInput: {
                        borderRadius: 20, // 設置文字輸入框的邊緣半徑為20像素，使邊緣變圓
                    },
                }}
            />
            </Box>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                customMapStyle={MapViewStyle}
                showsUserLocation={true}
                region={{
                    latitude: location?.latitude,
                    longitude: location?.longitude,
                    latitudeDelta: 2,
                    longitudeDelta: 2
                }} > 
                
                <Marker
                    coordinate={{
                        latitude: location?.latitude,
                        longitude: location?.longitude
                    }}
                    title={'I am here'}
                    description={'哈摟哈'}
                >
                    <MaterialCommunityIcons name="star" color="#FFD306" size={20}/>
                </Marker>
                {selectedLocation && ( // 檢查 selectedLocation 是否存在，如果存在則顯示標記
                    <Marker
                        coordinate={{
                            latitude: selectedLocation.latitude,
                            longitude: selectedLocation.longitude
                        }}
                        title={'Selected Location'}
                        description={'Description of selected location'}
                    >
                        <MaterialCommunityIcons name="star" color="#131313" size={40}/>
                    </Marker>
                )}
                
            </MapView>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default WishListScreen;