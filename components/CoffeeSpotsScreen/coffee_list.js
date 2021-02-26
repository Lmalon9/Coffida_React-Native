/* eslint-disable react/jsx-filename-extension */
import 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import {ToastAndroid, StyleSheet, StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Button, Layout, List, Divider } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage'
import CoffeeObject from'./CoffeeObject.js'
import styles from './styles.js'

function CoffeeList (props) {
  const [locations, setLocations] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener('focus', () => {
      checkLoggedIn();
      // getAllCoffeeLoc();
      // checkFavs();
    });
    async function checkLoggedIn() {
      try {
        const value = await AsyncStorage.getItem('@session_token');
        if (value == null) {
          navigation.navigate('Login')
        } else {
          // navigation.navigate("Account")
          getAllCoffeeLoc();
        }
      }
      catch (error){

      }
    }

    async function getAllCoffeeLoc() {
      const tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
      fetch('http://10.0.2.2:3333/api/1.0.0/find/',
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': tokenlog,
          },
        })
        .then((res) => {
          if (res.status === 200)
          {
            return res.json();
          } else {
            throw 'failed';
          };
        })
        .then((data) => {
          setLocations(data)
          console.log(locations.location_photopath)
        })
        .catch((message) => ToastAndroid.showWithGravity(`ERROR ${message}`));
    }
  }, []);

  return (
    <Layout style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch' }}>
      <Button style={styles.button} onPress={() => navigation.navigate('Search')}>
        Search
      </Button>
      <Button style={styles.button} onPress={() => navigation.navigate('UsersReviews')}>
        Edit Your Reviews
      </Button>
      <List
        style={styles.container}
        data={locations}
        keyExtractor={(item) => item.location_id.toString()}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => (
          <CoffeeObject location={item} />
        )}
      />
    </Layout>
  );
}

export default CoffeeList;
