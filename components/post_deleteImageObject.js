import React, { Component, useEffect, useState } from 'react';
import {ToastAndroid, StyleSheet, Image} from 'react-native';
import { Card, Text, Button, Layout, List, Divider, Icon} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import UserReviewList from './users_reviews.js'

export default send_photo = async ({ route }) => {
    //console.log(route.params.location_id)
    //console.log(route.params.review_ID)
    //console.log(route.params.fileURI)
    console.log(route.params.fileURI)
    console.log(location_id)


    var idlog = JSON.parse(await AsyncStorage.getItem('@session_token')).id;
    var tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
    console.log(idlog)
    fetch(`http://10.0.2.2:3333/api/1.0.0/location/${route.params.location_id}/review/${route.params.review_ID}/photo`,
    {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": tokenlog,
      
      },
      body:{
          image: route.params.fileURI
      }
  })

  .then ((res) => {
    if (res.status == 200)
    {
      ToastAndroid.showWithGravity("Sent Successful", ToastAndroid.SHORT, ToastAndroid.CENTER)
      console.log(res);
      return;
      
    }
    else{
      ToastAndroid.showWithGravity("Sent Unsuccessful", ToastAndroid.SHORT, ToastAndroid.CENTER)
      throw 'failed';

    };

  })
  .catch( (message) => { console.log("ERROR" + message)})
}