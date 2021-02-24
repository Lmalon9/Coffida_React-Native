import 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import {ToastAndroid, StyleSheet, Image} from 'react-native';
import {Rating} from 'react-native-elements';
import { Card, Text, Button, Layout, List, Divider, Icon} from '@ui-kitten/components';
//import {CheckReviewObject} from './ReviewObject'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './styles.js'

const CoffeeLocationObject = ({ review, location }) => {

    const [like, setLike] = useState(false);
    const [imageData, setImageData] = useState('')
    const navigation = useNavigation();

    useEffect(() => {
        console.log(location)
        console.log(review)
        checkLikes()
        review_photo(location.location_id, review.review_id)
    }, [])


    const checkLikes = async() => {
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
        //console.log(JSON.stringify(data.liked_reviews, null, 4));
        const currentLikes = (data.liked_reviews.filter(like => like.review.review_id === review.review_id).length)> 0;
        setLike(currentLikes);
        //console.log(currentLikes)
          })
          .catch ((message) => {console.log("error" + message)})

        }
    

        async function like_review(location_id, review_id){
            var tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
            fetch(`http://10.0.2.2:3333/api/1.0.0/location/${location.location_id}/review/${review.review_id}/like`,
              {
                method: like ? 'delete':'post',
                headers: {
                  //"Content-Type": "application/json",
                  "X-Authorization": tokenlog,
                },
              })
              .then ((res) => {
                if (res.status === 200)
                {
                  ToastAndroid.showWithGravity(like ? "Un Liked" :"Liked",  ToastAndroid.SHORT, ToastAndroid.CENTER);
                  setLike(!like);
                  return;
                }
                else{
                  throw 'failed';
                };
          
              })
  
              .catch( (message) => { console.log("ERROR" + message)})
            
          }
        
        const review_photo = async(location_id, review_id) => {
            fetch(`http://10.0.2.2:3333/api/1.0.0/location/${location_id}/review/${review_id}/photo`,
            {
                method: 'get',
                headers: {
                    "Content-Type": "image/png",
                },
            })
        .then ((res) => {
            if (res.status === 200)
            {
                //console.log(res);
                return res;
            }
            else
            {
                throw 'failed';
            };

        })
        .then ((data) => {
            setImageData(data, "?time" + new Date());
            console.log(data);
            return;
        })
        .catch( (message) => { console.log("ERROR" + message)})

        }
    

    const Header = (props) => (
        <Layout {...props}>
            
            <Button style={styles.button} >
            Like
            </Button>
        </Layout>
    )


    const Footer = (props) => (
        <Layout {...props} style = {{flex: 2, flexDirection: 'row', flexWrap: 'wrap'}}>
        <Text>
        Overall Rating:
        </Text>
        <Rating 
           startingValue={review.overall_rating}
           imageSize={15}
           ratingCount={5}
           readonly
        />
         <Text >
        Price Rating:
        </Text>
        <Rating 
           startingValue={review.price_rating}
           imageSize={15}
           ratingCount={5}
           readonly
        />
         <Text style = {{flexWrap: 'wrap'}} >
        Clenliness Rating:
        </Text>
        <Rating 
           startingValue={review.clenliness_rating}
           imageSize={15}
           ratingCount={5}
           readonly
        />
         <Text>
        Quality Rating:
        </Text>
        <Rating 
           startingValue={review.quality_rating}
           imageSize={15}
           ratingCount={5}
           readonly
        />




        {/* <Text category = 'c1'>
        Overall Rating: {review.overall_rating}, 
        Average Price Rating:{review.price_rating},  
        Average Clenliness Rating: {review.clenliness_rating}, 
        Average Quality Rating: {review.quality_rating}
        </Text> */}
        
        </Layout>
        

    )
    const heartIcon = (props) => (
        <Icon {...props} name='heart-outline'/>
      );

    return (

        <Layout>

        <Card footer = {Footer}>
        {/* <Image source={{uri:"data:image/png;base64," + review_photo(location.location_id, review.review_id).uri}}
                style = {{width: 150, height: 150}}/> */}
        <Image
            source={{uri: imageData.url + '?' + new Date()}}
            style={{ width: 150, height: 200, alignSelf: 'center'}}
          />
        <Text>
            {review.review_body}
        </Text>   
        <Button style={styles.buttonLike} appearance='ghost' accessoryLeft={heartIcon} size = 'medium' onPress ={() => like_review(location.location_id, review.review_id)}>
        
        </Button>     
        </Card>
        </Layout>
    )
}
// const styles = StyleSheet.create({
//     button:{
//         alignContent: 'center',
//         alignItems: 'center',
//         width: 50 ,
//         justifyContent: 'center',
//         color: '#ff0000'
//         //backgroundColor: '#151A30',
//         //borderColor: '#151A30',
  
//     },
// });
export default CoffeeLocationObject
