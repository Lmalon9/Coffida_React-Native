/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { ToastAndroid, Image } from 'react-native';
import {
  Card,
  Text,
  Button,
  Layout,
} from '@ui-kitten/components';
import { Rating } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './styles';

const UserReviewObject = ({ review }) => {
  const navigation = useNavigation();

  const send_delete_review = async () => {
    const idlog = JSON.parse(await AsyncStorage.getItem('@session_token')).id;
    const tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
    fetch(`http://10.0.2.2:3333/api/1.0.0/location/${review.location.location_id}/review/${review.review.review_id}`,
      {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': tokenlog,
        },
      })
      .then((res) => {
        if (res.status === 200)
        {
          ToastAndroid.showWithGravity("Delete Successful", ToastAndroid.SHORT, ToastAndroid.CENTER);
          console.log(res);
          navigation.navigate("CoffeeList");
          return;
        } else {
            ToastAndroid.showWithGravity("Delete Unsuccessful", ToastAndroid.SHORT, ToastAndroid.CENTER);
            throw 'failed';
        };
      })
      .catch((message) => { console.log("ERROR" + message)})
  };

  const Header = (props) => (
    <Layout style={styles.objectContainer}>

      <Button style={styles.button} size="small" onPress={() => navigation.navigate("Update User Review" , { 
                                                                        review_ID: review.review.review_id, 
                                                                        review_Location: review.location.location_id,
                                                                        overall_rating: review.review.overall_rating,
                                                                        review_body: review.review.review_body,
                                                                        price_rating: review.review.price_rating,
                                                                        clenliness_rating: review.review.clenliness_rating,
                                                                        quality_rating: review.review.quality_rating,
                                                                        })}>
    Update
    </Button>

    <Button style = {styles.objectButton} size = 'small' onPress = {send_delete_review}>
      Delete
    </Button>

    </Layout>
  );

  const Footer = (props) => (
    <Layout {...props} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      <Text>
        Overall Rating:
      </Text>
      <Rating
        startingValue={review.overall_rating}
        imageSize={15}
        ratingCount={5}
        readonly
      />
      <Text>
        Price Rating:
      </Text>
      <Rating
        startingValue={review.price_rating}
        imageSize={15}
        ratingCount={5}
        readonly
      />
      <Text style={{ flexWrap: 'wrap' }}>
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
    </Layout>
  );

  return (
    <Layout>
      <Card header={Header} footer={Footer}>
        <Text>
          {review.review.review_body}
        </Text>
      </Card>
    </Layout>
  );
};

export default UserReviewObject;
