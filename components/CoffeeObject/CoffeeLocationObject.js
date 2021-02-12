import 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import {ToastAndroid, StyleSheet, Image} from 'react-native';
import { Card, Text, Button, Layout, List, Divider, Icon} from '@ui-kitten/components';

import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CoffeeLocationObject = ({ review }) => {


    const Footer = (props) => (
        <Layout {...props} >
        <Text category = 'c1'>
        Overall Rating: {review.overall_rating}, 
        Average Price Rating:{review.price_rating},  
        Average Clenliness Rating: {review.clenliness_rating}, 
        Average Quality Rating: {review.quality_rating}
        </Text>
        </Layout>
        

    )

    return (

        <Layout>

        <Card footer = {Footer}>

        <Text>
            {review.review_body}
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
        backgroundColor: '#151A30',
        borderColor: '#151A30',
  
    },
});
export default CoffeeLocationObject
