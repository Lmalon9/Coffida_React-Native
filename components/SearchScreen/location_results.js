/* eslint-disable react/jsx-filename-extension */
import 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import {ToastAndroid, StyleSheet, StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Card, Text, Button, Layout, List, Divider, Icon, Rating } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeObject from '../CoffeeSpotsScreen/CoffeeObject';
import styles from './styles';

function LocationDistance ({ route }) {
    const [location, setLocations] = useState([]);
    //const {location} = route.params;
    //console.log(JSON.stringify(location))
    useEffect(() => {
        //console.log(location)
        searchLocations()
    }, []);

    async function searchLocations(){
        const tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
        fetch(`http://10.0.2.2:3333/api/1.0.0/find`,
        {
          method: 'get',
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": tokenlog,
          },
        })
        .then ((res) => {
          if (res.status === 200)
          {
            return res.json();
          }
          else{
            throw 'failed';
          };
    
        })
        .then ( (data) => {
            setLocations(data)
        
        })
        .catch( (message) => { console.log("ERROR" + message)})
      
    }



    return (

        <Layout style = {{flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
            
            <List style = {styles.container}
            data={location}
            keyExtractor={item => item.location_id.toString()}
            ItemSeparatorComponent={Divider}
            renderItem={({ item }) => (
                <CoffeeObject location = {item} />
              )}/>

        </Layout>
      )
            };

  export default LocationDistance
