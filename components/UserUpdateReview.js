import 'react-native-gesture-handler';
import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Rating} from 'react-native-elements';
import { Card, Text, Button, Layout, Input } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'


function ReviewUpdate({ route }){
  const [ovr_rating, setOvr_rating] = useState(route.params.overall_rating); // initialize state
  const [ovr_price, setOvr_Price] = useState(route.params.price_rating); // initialize state
  const [quality_rating, setQuality_rating] = useState(route.params.quality_rating); // initialize state
  const [clean_rating, setClean_rating] = useState(route.params.clenliness_rating); // initialize state
  const [review_body, setReview_body] = useState(route.params.review_body); // initialize state

  //const [review_ID, setReview_ID] = useState({review: review.params.review.review.review_id})
  const navigation = useNavigation()

  useEffect(() => {
    navigation.addListener('focus', () => {
        console.log(route.params.review_Location)
        console.log(route.params.review_ID)
    }
    )
});
    

  const updateReview = async () => {
    var tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
    fetch(`http://10.0.2.2:3333/api/1.0.0/location/${route.params.review_Location}/review/${route.params.review_ID}`,
    {
      method: 'patch',
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": tokenlog,
      },
      body: JSON.stringify( {
        overall_rating: ovr_rating,
        price_rating: ovr_price,
        quality_rating: quality_rating,
        clenliness_rating: clean_rating,
        review_body: review_body.replace(/tea|cakes|cake|pastry|pastries/gi, '***'),
      }),
    })

    .then ((res) => {
      if (res.status == 200)
      {
        return;
        
      }
      else{
        throw 'failed';
      };

    })

    .catch( (message) => { console.log("ERROR" + message)})
  }

    return (
      <Layout style={styles.container}>
          <Text style={styles.text}>
          Overall
          </Text>
          <Rating style ={styles.rating}
          showRating 
          fractions={0} 
          startingValue= {ovr_rating}
          imageSize={30}
          ratingCount={5}
          onFinishRating={setOvr_rating}
          />
          {/* <Input placeholder = 'Overall Rating'
          onChangeText ={integer => setOvr_rating(parseInt(integer))}
          /> */}
          <Text style={styles.text}>
          Price
          </Text>
          <Rating
          showRating 
          fractions={0} 
          startingValue= {ovr_price}
          imageSize={30}
          ratingCount={5}
          onFinishRating={setOvr_Price}
          />
          {/* <Input placeholder = 'Price Rating'
          onChangeText ={integer => setOvr_Price(parseInt(integer))}
          />   */}
          <Text style={styles.text}>
          Quality
          </Text>
          <Rating
          showRating 
          fractions={0} 
          startingValue= {quality_rating}
          imageSize={30}
          ratingCount={5}
          onFinishRating={setQuality_rating}
          />
          {/* <Input placeholder = 'Quality Rating'
          onChangeText ={integer => setQuality_rating(parseInt(integer))}
          /> */}
          <Text style={styles.text}>
          Clenliness
          </Text>
          <Rating
          showRating 
          fractions={0} 
          startingValue = {clean_rating}
          imageSize={30}
          ratingCount={5}
          onFinishRating={setClean_rating}
          />
          {/* <Input placeholder = 'Clenliness Rating'
          onChangeText ={integer => setClean_rating(parseInt(integer))}
          /> */}
          <Input 
          value = {review_body}
          multiline = {true}
          textStyle={{ minHeight: 64 }}
          onChangeText = {text => setReview_body(text)} 
          />
          <TouchableOpacity on style={styles.button}>
          <Button
          size = 'small'
          onPress = {updateReview}
          >
          Update Review
          </Button>
          </TouchableOpacity>
      </Layout>

    );
  }

  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center'

    },
    rating: {
      //backgroundColor: '#F7F9FC'
    },
    text: {
      fontSize: 16,
      marginTop: '5%',
    
    },
    textSignUp: {
      fontSize: 16,
      marginTop: '5%',
      marginHorizontal: '12%'
    
    },
    textbox: {
      width: '70%'
      
    },
    button:{
    flexDirection: 'column',
    marginTop: 10,
    backgroundColor: '#151A30',
    borderColor: '#151A30',
    }
  });

  
  export default ReviewUpdate;
