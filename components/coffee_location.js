import 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'


function coffeeLocation ({ route }) {
    const [locations, setLocations] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.addListener('focus', () => {
            getCoffeeLoc();
          }
          )
          async function getCoffeeLoc(){
            var tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
            // for (id = 1; id < 9; id++)
            // {
            fetch(`http://10.0.2.2:3333/api/1.0.0/location/${route.params.id}`,
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

            console.log(JSON.stringify(data, null, 4));

            setLocations(data)
        })
          }
        });

    return (
        <View style = {{flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
            <Text>
                    {locations.location_name}
                    {locations.location_town}
                    {locations.avg_overall_rating}
                    {locations.avg_clenliness_rating}
                    {locations.avg_price_rating}
                    {locations.avg_quality_rating}

                    </Text>
        </View>

    )
}
    
export default coffeeLocation