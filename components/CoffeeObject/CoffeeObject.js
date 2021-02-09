import 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import { Text, ToastAndroid, View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, TouchableHighlight, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CoffeeObject = ({ location }) => {
    const [favourite, setFavourite] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        //console.log(location)
        checkFavs()
    }, []);

    const checkFavs = async() => {
        var token= JSON.parse(await AsyncStorage.getItem('@session_token')).token;
        var id= JSON.parse(await AsyncStorage.getItem('@session_token')).id;

        fetch(`http://10.0.2.2:3333/api/1.0.0/user/${id}`, {
           method:"get",
           headers: {
             'Content-Type': "application/json",
             'X-Authorization': token
           },
          })
          .then( (res) => {
            if (res.status ==200) {
              return res.json();

            }
            else {
              throw 'failed'
            }
          })
          .then ((data) =>{
          ///const favs = data.favourite_locations;
          console.log(JSON.stringify(favs, null, 4));
          const currentFavourites = (data.favourite_locations.filter
            (fav => fav.location_id === location.location_id).length) > 0;
         setFavourite(currentFavourites);
          })
          .catch ((message) => {console.log("error" + message)})

        }
    

        async function fav_location(id){
            var tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
            fetch(`http://10.0.2.2:3333/api/1.0.0/location/${id}/favourite`,
              {
                method: favourite ? 'delete':'post',
                headers: {
                  //"Content-Type": "application/json",
                  "X-Authorization": tokenlog,
                },
              })
              .then ((res) => {
                if (res.status === 200)
                {
                  ToastAndroid.showWithGravity(favourite ? "UnFav" :"Favourited",  ToastAndroid.SHORT, ToastAndroid.CENTER);
                  setFavourite(!favourite);
                  return;
                }
                else{
                  throw 'failed';
                };
          
              })
  
              .catch( (message) => { console.log("ERROR" + message)})
            
          }

          return (
            <TouchableHighlight onPress={() => navigation.navigate("CoffeeLocation",  {id: location.location_id})}>
            <View style = {{height: 250, backgroundColor: 'skyblue', borderColor: 'blue', borderWidth: 2, elevation: 1, marginTop:1, borderRadius:10}}>
              <Text>
              {location.location_name}
              {location.location_town}
              {location.avg_overall_rating}
              {location.avg_clenliness_rating}
              {location.avg_price_rating}
              {location.avg_quality_rating}




              </Text>
              <Button title = 'Fav' onPress={() => fav_location(location.location_id)}>

              </Button>

            </View>
            </TouchableHighlight>
          )
}
export default CoffeeObject