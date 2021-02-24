import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Rating} from 'react-native-elements';
import { Card, Text, Button, Layout, Input } from '@ui-kitten/components';
import * as ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import styles from './styles.js'


function ReviewPost({ route }){
  const [ovr_rating, setOvr_rating] = useState(0); // initialize state
  const [ovr_price, setOvr_Price] = useState(0); // initialize state
  const [quality_rating, setQuality_rating] = useState(0); // initialize state
  const [clean_rating, setClean_rating] = useState(0); // initialize state
  const [review_body, setReview_body] = useState(''); // initialize state
  const navigation = useNavigation();
  const [source, setsource] = useState('');
  const [filedata, setfiledata] = useState('');
  const [fileURI, setfileURI] = useState('');
  const [review, setReview] = useState([])
  const [lastreview, setLastReview] = useState([])


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
        console.log(res.json())

        if (filedata == ''){
          navigation.navigate("CoffeeLocation",  {id: route.params.id});
  
        }
        else{
          getAllReviews();
        }
      }
      else{
        throw 'failed';
      };

    })
    .catch( (message) => { console.log("ERROR" + message)})
  }

  const cameraLaunch = async() => {
    let options = {
    storageOptions: {
      skipBackup:true,
      includeBase64: true,
      path: 'images',
    },
  };

  ImagePicker.launchCamera(options, (response) => {
    console.log(response);
    
    if (response.didCancel){
      console.log('canceled')
    }
    else if (response.error){
      console.log(response.error)
    }
    else{
      //setsource(response.uri);
      console.log(JSON.stringify(response));
      setfiledata(response);
      console.log(filedata)
      setfileURI(response.uri);

      const data = new FormData();
      data.append("filedata",{
        name: filedata.fileName,
        type: filedata.type,
        uri: Platform.OS === "android" ? filedata.uri : filedata.uri.replace("file://","")
      });
      console.log(data)
      console.log(filedata)
    }
  })
}

  const getAllReviews = async () =>{
    var Id = JSON.parse(await AsyncStorage.getItem('@session_token')).id;
    var tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
    // for (id = 1; id < 9; id++)
    // {
    fetch(`http://10.0.2.2:3333/api/1.0.0/user/${Id}`,
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
    setReview(data)
    setLastReview(data.reviews[data.reviews.length -1])
    console.log(lastreview)
    addPhoto();


    })
    .catch( (message) => { console.log("ERROR" + message)});
  
};

const addPhoto = async () => {
  var tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
  fetch(`http://10.0.2.2:3333/api/1.0.0/location/${route.params.id}/review/${lastreview.review_id}/photo`,
  {
    method: 'post',
    headers: {
      "Content-Type": "image/png",
      "X-Authorization": tokenlog,
    },
    body: filedata,

})

.then ((res) => {
  if (res.status == 200)
  {
    //ToastAndroid.showWithGravity("Sent Successful", ToastAndroid.SHORT, ToastAndroid.CENTER)
    console.log(success);
    navigation.navigate("CoffeeLocation",  {id: route.params.id});          
  }
  else{
    //ToastAndroid.showWithGravity("Sent Unsuccessful", ToastAndroid.SHORT, ToastAndroid.CENTER)
    throw 'failed';

  };

})
.catch( (message) => { console.log("ERROR" + message)})
}


  

    return (
      <ScrollView>
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
          {/* <Layout>
            {renderFileUri()}
          </Layout> */}
          
          <Image
            source={{uri: fileURI || ''}}
            style={{ width: 100, height: 100 }}
          />
         
          <TouchableOpacity on style={styles.button}>
          <Button
          size = 'small'
          onPress = {cameraLaunch}
          >
          Take an Image
          </Button>
          </TouchableOpacity>
          <TouchableOpacity>
          <Button style={styles.button}
          size = 'small'
          onPress = {sendReview}
          >
          Add Review
          </Button>
          </TouchableOpacity>
      </Layout>
      </ScrollView>

    );
  }
  
  export default ReviewPost;
