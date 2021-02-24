import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Rating} from 'react-native-elements';
import { Card, Text, Button, Layout, Input } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'react-native-image-picker';
import styles from './styles'
import { Platform } from 'react-native';



function ReviewUpdate({ route }){
  const [ovr_rating, setOvr_rating] = useState(route.params.overall_rating); // initialize state
  const [ovr_price, setOvr_Price] = useState(route.params.price_rating); // initialize state
  const [quality_rating, setQuality_rating] = useState(route.params.quality_rating); // initialize state
  const [clean_rating, setClean_rating] = useState(route.params.clenliness_rating); // initialize state
  const [review_body, setReview_body] = useState(route.params.review_body); // initialize state

  const [filedata, setfiledata] = useState('');
  const [fileURI, setfileURI] = useState('https://media3.s-nbcnews.com/j/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p_67dfb6820f7d3898b5486975903c2e51.fit-760w.jpg');

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
  const send_photo = async () => {
    var tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
    fetch(`http://10.0.2.2:3333/api/1.0.0/location/${route.params.review_Location}/review/${route.params.review_ID}/photo`,
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
      console.log(res);
      return ;
      
    }
    else{
      //ToastAndroid.showWithGravity("Sent Unsuccessful", ToastAndroid.SHORT, ToastAndroid.CENTER)
      throw 'failed';

    };

  })
  .catch( (message) => { console.log("ERROR" + message)})
}

const del_photo = async () => {
  var tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
  fetch(`http://10.0.2.2:3333/api/1.0.0/location/${route.params.review_Location}/review/${route.params.review_ID}/photo`,
  {
    method: 'delete',
    headers: {
      "Content-Type": "image/png",
      "X-Authorization": tokenlog,
    },
})

.then ((res) => {
  if (res.status == 200)
  {
    //ToastAndroid.showWithGravity("Sent Successful", ToastAndroid.SHORT, ToastAndroid.CENTER)
    console.log(res);
    return ;
    
  }
  else{
    //ToastAndroid.showWithGravity("Sent Unsuccessful", ToastAndroid.SHORT, ToastAndroid.CENTER)
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

        // send_photo({fileURI: response.uri,
        //             location_id: route.params.review_Location,
        //             review_ID: route.params.review_ID,
        // })
      }})
  };

    return (
      <ScrollView>
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
          <Image
            source={{uri: fileURI}}
            style={{ width: 200, height: 200, }}
          />
          <Button
          size = 'small'
          onPress = {cameraLaunch}
          >
          Take A Photo
          </Button>
          <Button
          size = 'small'
          onPress = {send_photo}
          >
          Add the Photo to the review
          </Button>
          <Button
          size = 'small'
          onPress = {del_photo}
          >
          Delete photo from review
          </Button>
          <TouchableOpacity on style={styles.button}>
          <Button
          size = 'small'
          onPress = {updateReview}
          >
          Update Review
          </Button>
          </TouchableOpacity>
      </Layout>
      </ScrollView>


    );
  }
  
  export default ReviewUpdate;
