/* eslint-disable react/jsx-filename-extension */
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoggedIn from './LoggedIn.js'
import NotLoggedIn from './NotLoggedIn.js'

function Landing() {
  const navigation = useNavigation();
  const [loggedin, setLoggedin] = useState(true);
  const [id, setId] = useState('');

  useEffect(() => {
    navigation.addListener('focus', () => {
      checkLoggedIn();
    });

async function checkLoggedIn() {
      try {
        const value = await AsyncStorage.getItem('@session_token');
        if (value == null) {
          setLoggedin(false);
        } else {
          setId(JSON.parse(await AsyncStorage.getItem('@session_token')).id);
          setLoggedin(true);
          // console.log("landing page ", id);
        }
      } catch (error) {

      }
    }
  }, []);


  if (loggedin === false) {
    return (
      <NotLoggedIn />
    );
  } else {
    return(
      <LoggedIn id = {id} />
    );
  }
}

export default Landing;
