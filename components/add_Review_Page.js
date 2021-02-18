import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Rating} from 'react-native-elements';
import { Card, Text, Button, Layout, Input } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'


function ReviewPost({ route }){
  const [ovr_rating, setOvr_rating] = useState(0); // initialize state
  const [ovr_price, setOvr_Price] = useState(0); // initialize state
  const [quality_rating, setQuality_rating] = useState(0); // initialize state
  const [clean_rating, setClean_rating] = useState(0); // initialize state
  const [review_body, setReview_body] = useState(''); // initialize state
  const navigation = useNavigation()

  const sendReview = async () => {
    var tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
    fetch(`http://10.0.2.2:3333/api/1.0.0/location/${route.params.id}/review`,
    {
      method: 'post',
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
      if (res.status == 201)
      {
        return res.json();
        
      }
      else{
        throw 'failed';
      };

    })
    .then (async (data) => {

      console.log(data);

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
          startingValue= {0}
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
          startingValue= {0}
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
          startingValue= {0}
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
          startingValue= {0}
          imageSize={30}
          ratingCount={5}
          onFinishRating={setClean_rating}
          />
          {/* <Input placeholder = 'Clenliness Rating'
          onChangeText ={integer => setClean_rating(parseInt(integer))}
          /> */}
          <Input placeholder = 'Review Body'
          multiline = {true}
          textStyle={{ minHeight: 64 }}
          onChangeText = {text => setReview_body(text)} 
          />
          <TouchableOpacity on style={styles.button}>
          <Button
          size = 'small'
          onPress = {sendReview}
          >
          Add Review
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
      backgroundColor: '#F7F9FC',
      justifyContent: 'center'

    },
    rating: {
      backgroundColor: '#F7F9FC'
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
      marginTop: 10,

      backgroundColor: '#151A30',
      borderColor: '#151A30',
    }
  });

  
  export default ReviewPost;
