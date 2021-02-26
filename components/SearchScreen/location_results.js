/* eslint-disable react/jsx-filename-extension */
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { ToastAndroid } from '@react-navigation/native'
import { Layout, Text, Button } from '@ui-kitten/components';
import Geolocation from 'react-native-geolocation-service';
// import RNLocation from 'react-native-location';
import styles from './styles';

function LocationDistance() {
  const [userLocation, setUserLocations] = useState([]);
  const permission = (false);

  async function findCordinates() {
    Geolocation.getCurrentPosition(
      (position) => {
        setUserLocations([position.coords.latitude, position.coords.longitude]);
      },
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
        },
        {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 100000,
        }
    );
  }

//   async function getAllCoffeeLoc() {
//     const tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
//     fetch(`http://10.0.2.2:3333/api/1.0.0/find/`,
//       {
//         method: 'get',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Authorization': tokenlog,
//         },
//       })
//       .then((res) => {
//         if (res.status === 200)
//         {
//           return res.json();
//         } else {
//           throw 'failed';
//         };
//       })
//       .then((data) => {
//         setLocations(data)
//         console.log(locations.location_photopath)
//       })
//       .catch((message) => ToastAndroid.showWithGravity(`ERROR ${message}`));
//   }


  return (
    <Layout>
      <Button onPress={findCordinates}>Request Location</Button>
      <Text>{`Location: ${userLocation}`}</Text>
    </Layout>
  );
}

export default LocationDistance;
