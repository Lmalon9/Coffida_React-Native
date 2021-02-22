import 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import {ToastAndroid, StyleSheet, StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Card, Text, Button, Layout, List, Divider, Icon } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage'
import UserReviewObject from './UserReviewObject.js'


function UserReviewList (props) {
    
    const [reviews, setReviews] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.addListener('focus', () => {
            getAllUSRreview();
            //checkFavs();
          },[]
          )
          async function getAllUSRreview(){
            var Id = JSON.parse(await AsyncStorage.getItem('@session_token')).id;
            var tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
            // for (id = 1; id < 9; id++)
            // {
            fetch(`http://10.0.2.2:3333/api/1.0.0/user/${Id}`,
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

            setReviews(data.reviews)
            console.log(JSON.stringify(data, null, 4));

            })
            .catch( (message) => { console.log("ERROR" + message)})
          
        }

    //}
        });

    //}

          return (

            <Layout style = {{flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
                <List style = {styles.container}
                data={reviews}
                keyExtractor={item => item.review.review_id.toString()}
                ItemSeparatorComponent={Divider}
                renderItem={({ item }) => (
                
                  <UserReviewObject review = {item} 
                  />
                  )}
                  />

            </Layout>
          )
                };

      const styles = StyleSheet.create({
        container: {
          flexDirection: 'column',

        },
        card:{
          backgroundColor: '#EDF1F7',

        },
        text: {
          fontSize: 30,
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: 10,
        },
        button:{
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#151A30',
          borderColor: '#151A30',
    
      },
      });
export default UserReviewList