/* eslint-disable react/jsx-filename-extension */
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {ToastAndroid, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import {  Layout, List, Divider } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserReviewObject from './UserReviewObject';
import styles from './styles';


function UserReviewList (props) {
  const [reviews, setReviews] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener('focus', () => {
      getAllUSRreview();
      // checkFavs();
    },
    []);

    async function getAllUSRreview() {
      const Id = JSON.parse(await AsyncStorage.getItem('@session_token')).id;
      const tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
      fetch(`http://10.0.2.2:3333/api/1.0.0/user/${Id}`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': tokenlog,
          },
        })
        .then((res) => {
          if (res.status === 200)
          {
            return res.json();
          } else {
            throw 'failed';
          };
        })
        .then((data) => {
          setReviews(data.reviews);
          console.log(JSON.stringify(data, null, 4));
        })
        .catch( (message) => { console.log("ERROR" + message)})
    }
  });

  return (

    <Layout style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch' }}>
      <List
        style={styles.container}
        data={reviews}
        keyExtractor={item => item.review.review_id.toString()}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => (
          <UserReviewObject review={item} />
        )}
      />
    </Layout>
  );
}

export default UserReviewList;
