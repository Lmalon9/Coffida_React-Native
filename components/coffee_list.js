import 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import {ToastAndroid, StyleSheet, StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Card, Text, Button, Layout, List, Divider } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage'
import CoffeeObject from'./CoffeeObject/CoffeeObject.js'


function CoffeeList (props) {
    
    const [locations, setLocations] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.addListener('focus', () => {
            getAllCoffeeLoc();
            //checkFavs();
          }
          )
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
            
            })
            .catch( (message) => { console.log("ERROR" + message)})
          
        }

    //}
        }, []);

    //}

          return (

            <Layout style = {{flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
              <Button
              title="Home Screen" 
              onPress={() => navigation.navigate("Home")}
              />
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
          width: 10
                }
      });
      export default CoffeeList