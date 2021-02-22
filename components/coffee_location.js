import 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import {Rating} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Card, Text, Button, Layout, List, Divider, Icon, ListItem} from '@ui-kitten/components';
import CoffeeLocationObject from './CoffeeObject/CoffeeLocationObject.js'


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

            //console.log(JSON.stringify(data, null, 4));

            setLocations(data)
        })
          }
        
        });

        const Header = (props) => (
          <Layout {...props} >
          <Text category = 'h3'>
          {locations.location_name}
          </Text>
          <Text category = 's1'>
          {locations.location_town}
          </Text>
          <Text category = 'p1'>
          {locations.longitude}, {locations.latitude}
          </Text>
          </Layout>
      )
    
        const Footer = (props) => (
          <Layout {...props} style = {{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text>
          Overall Rating:
          </Text>
          <Rating 
           startingValue={locations.avg_overall_rating}
           imageSize={15}
           ratingCount={5}
           readonly
          />
          <Text>
          Price Rating:
          </Text>
          <Rating 
           startingValue={locations.avg_price_rating}
           imageSize={15}
           ratingCount={5}
           readonly
          />
          <Text>
          Clenliness Rating:
          </Text>
          <Rating 
           startingValue={locations.avg_clenliness_rating}
           imageSize={15}
           ratingCount={5}
           readonly
          />
          <Text>
          Quality Rating:
          </Text>
          <Rating 
           startingValue={locations.avg_quality_rating}
           imageSize={15}
           ratingCount={5}
           readonly
          />
          </Layout>
      )
     

    return (
      <Layout style = {{flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
        <Layout>
          <Card header = {Header} footer = {Footer}>


          </Card>
        </Layout>

        <Button style={styles.button} onPress={() => navigation.navigate("AddReview",  {id: locations.location_id})}>
        Add A Review
        </Button>

        <List 
        style = {styles.container}
        data={locations.location_reviews}
        keyExtractor={item => item.review_id.toString()}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => (
        <CoffeeLocationObject review = {item} location = {locations}/>
        )}/>

      </Layout>
        // <View style = {{flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
        //     <Text>
        //             {locations.location_name}
        //             {locations.location_town}
        //             {locations.avg_overall_rating}
        //             {locations.avg_clenliness_rating}
        //             {locations.avg_price_rating}
        //             {locations.avg_quality_rating}

        //             </Text>
        // </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',

  },
  button:{
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#151A30',
      borderColor: '#151A30',

  },
});    
export default coffeeLocation