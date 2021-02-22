import 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import {ToastAndroid, StyleSheet, Image} from 'react-native';
import {Rating} from 'react-native-elements';
import { Card, Text, Button, Layout, List, Divider, Icon} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CoffeeObject = ({ location }) => {
    const [favourite, setFavourite] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        //console.log(location)
        checkFavs()
        console.log(location)
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
          
          const Header = (props) => (
            <Layout {...props} style={[props.style, styles.header]} >
            <Text category = 'h2'>
            {location.location_name}
            </Text>
            <Text category = 's1'>
            {location.location_town}
            </Text>
            <Button style= {styles.button} appearance='ghost' accessoryLeft={starIcon} size = 'medium' onPress={() => fav_location(location.location_id)}>

            </Button>
            </Layout>
        )
      
          const Footer = (props) => (
            <Layout {...props} >
            <Text>
            Overall Rating {location.avg_overall_rating}
            </Text>
            <Rating
            startingValue={location.avg_overall_rating}
            imageSize={20}
            ratingCount={5}
            readonly
            />
            </Layout>
        )
        const starIcon = (props) => (
          <Icon {...props} name='star'/>
        );
      
          return (

            <Layout>

            <Card style={styles.card} header = {Header} footer = {Footer} onPress={() => navigation.navigate("CoffeeLocation",  {id: location.location_id})}>

            <Image
            style={{height: 200, width: 400, 
            alignContent: 'center', 
            justifyContent: 'center',   
            alignItems: 'center'
            }}
            resizeMode="contain"
            source={{uri: `${location.photo_path}`}} 
            />
            

            </Card>
            </Layout>
            // </View>
            // </TouchableHighlight>
          )
          
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',

  },
  header:{
    alignContent: 'stretch',
    alignItems: 'stretch'
  },
  card:{
    //backgroundColor: '#EDF1F7',
    alignItems: 'center',


  },
  button:{
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center'
  }
});
export default CoffeeObject