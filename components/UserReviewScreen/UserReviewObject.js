import React, { Component, useEffect, useState } from 'react';
import {ToastAndroid, StyleSheet, Image} from 'react-native';
import { Card, Text, Button, Layout, List, Divider, Icon} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const UserReviewObject = ({ review }) => {
  const navigation = useNavigation()

  const send_delete_review = async () => {
    var idlog = JSON.parse(await AsyncStorage.getItem('@session_token')).id;
    var tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
    console.log(idlog)
    fetch(`http://10.0.2.2:3333/api/1.0.0/location/${review.location.location_id}/review/${review.review.review_id}`,
    {
      method: 'delete',
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": tokenlog,
      
      },
  })

  .then ((res) => {
    if (res.status == 200)
    {
      ToastAndroid.showWithGravity("Delete Successful", ToastAndroid.SHORT, ToastAndroid.CENTER)
      console.log(res);
      navigation.navigate("CoffeeList")
      return;
      
    }
    else{
      ToastAndroid.showWithGravity("Delete Unsuccessful", ToastAndroid.SHORT, ToastAndroid.CENTER)
      throw 'failed';

    };

  })
  .catch( (message) => { console.log("ERROR" + message)})
}
  const Header = (props) => (
    <Layout style={styles.container}>

    <Button style = {styles.button} size = 'small' onPress={() => navigation.navigate("Update User Review" ,  { 
                                                                        review_ID: review.review.review_id, 
                                                                        review_Location: review.location.location_id,
                                                                        overall_rating: review.review.overall_rating,
                                                                        review_body: review.review.review_body,
                                                                        price_rating: review.review.price_rating,
                                                                        clenliness_rating: review.review.clenliness_rating,
                                                                        quality_rating: review.review.quality_rating,
                                                                        })}>
    Update
    </Button>

    <Button style = {styles.button} size = 'small' onPress = {send_delete_review}>
    Delete
    </Button>

    </Layout>
  )

  const Footer = (props) => (
      <Layout {...props} >
      <Text category = 'c2'>
      Overall Rating: {review.review.overall_rating}, 
      Average Price Rating:{review.review.price_rating},  
      Average Clenliness Rating: {review.review.clenliness_rating}, 
      Average Quality Rating: {review.review.quality_rating}
      </Text>
      </Layout>
      

  )

  return (

      <Layout>

      <Card header = {Header} footer = {Footer}>

      <Text>
          {review.review.review_body}
      </Text>  

      </Card>
      </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center'

  },
  button:{
    
      alignContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      width: 100,
      justifyContent: 'center',
      borderColor: '#151A30',

  },
});

export default UserReviewObject
