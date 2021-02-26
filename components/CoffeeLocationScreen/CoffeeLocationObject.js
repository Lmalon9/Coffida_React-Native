/* eslint-disable react/jsx-filename-extension */
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { ToastAndroid, Image } from 'react-native';
import { Rating } from 'react-native-elements';
import {
  Card,
  Text,
  Button,
  Layout,
  Icon,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const CoffeeLocationObject = ({ review, location }) => {
  const [like, setLike] = useState(false);
  const [imageData, setImageData] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    console.log(location)
    console.log(review)
    checkLikes()
    review_photo(location.location_id, review.review_id)
  }, []);

  const checkLikes = async () => {
    const token = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
    const id = JSON.parse(await AsyncStorage.getItem('@session_token')).id;

    fetch(`http://10.0.2.2:3333/api/1.0.0/user/${id}`, {
      method:"get",
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw 'failed'
        }
      })
      .then((data) => {
        // console.log(JSON.stringify(data.liked_reviews, null, 4));
        const currentLikes = (data.liked_reviews.filter(like => like.review.review_id === review.review_id).length)> 0;
        setLike(currentLikes);
        // console.log(currentLikes)
      })
      .catch((message) => { console.log("error" + message); });
  };

  async function like_review(location_id, review_id) {
    const tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
    fetch(`http://10.0.2.2:3333/api/1.0.0/location/${location.location_id}/review/${review.review_id}/like`,
      {
        method: like ? 'delete':'post',
        headers: {
          // "Content-Type": "application/json",
          "X-Authorization": tokenlog,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          ToastAndroid.showWithGravity(like ? "Un Liked" :"Liked",  ToastAndroid.SHORT, ToastAndroid.CENTER);
          like ? review.likes=review.likes -1 : review.likes=review.likes +1;
          setLike(!like);
          return;
        } else {
          throw 'failed';
        };
      })
      .catch((message) => { console.log("ERROR" + message); });
  }

  const review_photo = async(location_id, review_id) => {
    fetch(`http://10.0.2.2:3333/api/1.0.0/location/${location_id}/review/${review_id}/photo`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'image/png',
        },
      })
      .then((res) => {
        if (res.status === 200)
        {
          // console.log(res);
          return res;
        } else {
        throw 'failed';
      };
      })
      .then((data) => {
        setImageData(data, "?time" + new Date());
        console.log(data);
      })
      .catch((message) => { console.log("ERROR" + message); });
  }

  const Header = (props) => (
    <Layout {...props}>
      <Button style={styles.button} >
        Like
      </Button>
    </Layout>
  );

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

  const heartIcon = (props) => (
    <Icon {...props} name='heart-outline'/>
  );
  return (
    <Layout>
      <Card footer={Footer}>
        <Image
          source={{ uri: imageData.url + '?' + new Date() }}
          style={{ width: 150, height: 200, alignSelf: 'center' }}
        />
        <Text>
          {review.review_body}
        </Text>
        <Button
          style={styles.buttonLike}
          appearance='ghost'
          accessoryLeft={heartIcon}
          size='medium'
          onPress={() => like_review(location.location_id, review.review_id)}>
        </Button>
        <Text style={{ flexDirection: 'column' }}>
          Likes: {review.likes}
        </Text>
      </Card>
    </Layout>
  );
};

export default CoffeeLocationObject;
