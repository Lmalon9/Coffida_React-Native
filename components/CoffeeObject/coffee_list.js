import 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import {ToastAndroid, StyleSheet, StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Card, Text, Button, Layout, List, Divider, Icon } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage'
import CoffeeObject from'./CoffeeObject.js'


function CoffeeList (props) {
    
    const [locations, setLocations] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.addListener('focus', () => {
            checkLoggedIn();
            //getAllCoffeeLoc();
            //checkFavs();
          }
          )

        async function checkLoggedIn(){
            try{
            const value = await AsyncStorage.getItem("@session_token");
            if (value == null){
              navigation.navigate("Login")
            }
            else{
              //navigation.navigate("Account")
              getAllCoffeeLoc();
              
            }
          }
          catch (error){
      
          }
          }
          async function getAllCoffeeLoc(){
            var id = 1;
            var tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
            // for (id = 1; id < 9; id++)
            // {
            fetch(`http://10.0.2.2:3333/api/1.0.0/find/`,
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

            //console.log(JSON.stringify(data, null, 4));
            setLocations(data)
            console.log(locations.location_photopath)
            
            })
            .catch( (message) => { console.log("ERROR" + message)})
          
        }

    //}
        }, []);

    //}

          return (

            <Layout style = {{flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
              <Button style={styles.button} onPress={() => navigation.navigate("Search")}>
              Search
              </Button>
              <Button style={styles.button} onPress={() => navigation.navigate("UsersReviews")}>
              Edit Your Reviews
              </Button>
                <List style = {styles.container}
                data={locations}
                keyExtractor={item => item.location_id.toString()}
                ItemSeparatorComponent={Divider}
                renderItem={({ item }) => (
                  <CoffeeObject location = {item} />
                  )}/>

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
      export default CoffeeList