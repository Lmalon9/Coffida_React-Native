import 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import { Text, ToastAndroid, View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, TouchableHighlight, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native'
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

            <View style = {{flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
              <Button
              title="Home Screen" 
              onPress={() => navigation.navigate("Home")}
              />
                <FlatList style = {styles.container}
                data={locations}
                keyExtractor={item => item.location_id.toString()}
                renderItem={({ item }) => (
                  <CoffeeObject location = {item} />
                  )}/>

            </View>
          )
                };

      const styles = StyleSheet.create({
        container: {
          width: '100%',
          height: '100%',
          marginTop: StatusBar.currentHeight || 0,
          //marginTop: Constants.statusBarHeight,
        },
        text: {
          fontSize: 30,
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: 10,
        },
        textboxUser: {
          borderWidth: 0.5,
          borderColor: 'black',
          width: '70%'
          
        },
        textboxPass: {
          
          borderWidth: 0.5,
          borderColor: 'black',
          width: '70%'
        },
        button:{
          width:'25%',
          marginTop: 10,
        }
      });
      export default CoffeeList