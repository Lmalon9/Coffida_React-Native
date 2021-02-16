import 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import {ToastAndroid, StyleSheet, Image} from 'react-native';
import { Card, Text, Button, Layout, List, Divider, Icon} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ReviewObject = ({ review }) => {


  const Footer = (props) => (
      <Layout {...props} >
      <Text category = 'c1'>
      Overall Rating: {review.review.overall_rating}, 
      Average Price Rating:{review.review.price_rating},  
      Average Clenliness Rating: {review.review.clenliness_rating}, 
      Average Quality Rating: {review.review.quality_rating}
      </Text>
      
      </Layout>
      

  )

  return (

      <Layout>

      <Card footer = {Footer}>

      <Text>
          {review.review.review_body}
      </Text>        
      </Card>
      </Layout>
  )
}
const styles = StyleSheet.create({
  button:{
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#151A30',

  },
});
export default ReviewObject
