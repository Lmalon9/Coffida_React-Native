/* eslint-disable react/jsx-filename-extension */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { Rating } from 'react-native-elements';
import {
  Text,
  Button,
  Layout,
  Input,
} from '@ui-kitten/components';
import * as ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';

const ReviewPost = ({ route }) => {
  const [ovrRating, setOvrRating] = useState(0); // initialize state
  const [ovrPrice, setOvrPrice] = useState(0); // initialize state
  const [qualityRating, setQualityRating] = useState(0); // initialize state
  const [cleanRating, setCleanRating] = useState(0); // initialize state
  const [reviewBody, setReviewBody] = useState(''); // initialize state
  const navigation = useNavigation();
  const [filedata, setfiledata] = useState('https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png');
  const [fileURI, setfileURI] = useState('https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png');

  const addPhoto = async (reviewId) => {
    const tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
    fetch(`http://10.0.2.2:3333/api/1.0.0/location/${route.params.id}/review/${reviewId}/photo`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'image/png',
          'X-Authorization': tokenlog,
        },
        body: filedata,
      })

      .then((res) => {
        if (res.status === 200) {
          ToastAndroid.showWithGravity('Review Created', ToastAndroid.SHORT, ToastAndroid.CENTER);
          navigation.navigate('CoffeeLocation', { id: route.params.id });
        } else {
          ToastAndroid.showWithGravity('Review Created, without image', ToastAndroid.SHORT, ToastAndroid.CENTER);
          navigation.navigate('CoffeeLocation', { id: route.params.id });
        }
      })
      .catch((message) => ToastAndroid.showWithGravity(`ERROR ${message}`));
  };

  const getAllReviews = async () => {
    const Id = JSON.parse(await AsyncStorage.getItem('@session_token')).id;
    const tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
    // for (id = 1; id < 9; id++)
    // {
    fetch(`http://10.0.2.2:3333/api/1.0.0/user/${Id}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': tokenlog,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        if (data === null) {
          ToastAndroid.showWithGravity('Error', ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else {
        // setReview(data)
        // setLastReview(data.reviews[data.reviews.length - 1]);
        // console.log(data.reviews[data.reviews.length -1])
          addPhoto(data.reviews[data.reviews.length - 1].review.review_id);
        }
      })
      .catch((message) => ToastAndroid.showWithGravity(`ERROR ${message}`));
  };

  const sendReview = async () => {
    const tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
    fetch(`http://10.0.2.2:3333/api/1.0.0/location/${route.params.id}/review`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': tokenlog,
        },
        body: JSON.stringify({
          overall_rating: ovrRating,
          price_rating: ovrPrice,
          quality_rating: qualityRating,
          clenliness_rating: cleanRating,
          review_body: reviewBody.replace(/tea|cakes|cake|pastry|pastries/gi, '***'),
        }),
      })
      .then((res) => {
        if (res.status === 201) {
          if (filedata === 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png') {
            ToastAndroid.showWithGravity('Review Created', ToastAndroid.SHORT, ToastAndroid.CENTER);
            navigation.navigate('CoffeeLocation', { id: route.params.id });
          } else {
            getAllReviews();
          }
        }
      })
      .catch((message) => ToastAndroid.showWithGravity(`ERROR ${message}`));
  };

  const cameraLaunch = async () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        includeBase64: true,
        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, (response) => {
      // console.log(response);
      if (response.didCancel) {
        ToastAndroid.showWithGravity('canceled');
      } else if (response.error) {
        ToastAndroid.showWithGravity(`${response.error}`);
      } else {
        // console.log(JSON.stringify(response));
        setfiledata(response);
        // console.log(filedata);
        setfileURI(response.uri);
        const data = new FormData();
        data.append('filedata', {
          name: filedata.fileName,
          type: filedata.type,
          // eslint-disable-next-line no-undef
          uri: Platform.OS === 'android' ? filedata.uri : filedata.uri.replace('file://","'),
        });
        // appends the filedata file, this seemed to fix an image rendering issue i was having
        // on this page

        // console.log(data)
        // console.log(filedata)
      }
    });
  };

  return (
    <ScrollView>
      <Layout style={styles.container}>
        <Text style={styles.text}>
          Overall
        </Text>
        <Rating
          style={styles.rating}
          showRating
          fractions={0}
          startingValue={0}
          imageSize={30}
          ratingCount={5}
          onFinishRating={setOvrRating}
        />
        <Text style={styles.text}>
          Price
        </Text>
        <Rating
          showRating
          fractions={0}
          startingValue={0}
          imageSize={30}
          ratingCount={5}
          onFinishRating={setOvrPrice}
        />
        <Text style={styles.text}>
          Quality
        </Text>
        <Rating
          showRating
          fractions={0}
          startingValue={0}
          imageSize={30}
          ratingCount={5}
          onFinishRating={setQualityRating}
        />
        <Text style={styles.text}>
          Clenliness
        </Text>
        <Rating
          showRating
          fractions={0}
          startingValue={0}
          imageSize={30}
          ratingCount={5}
          onFinishRating={setCleanRating}
        />
        <Input
          placeholder="Review Body"
          multiline={true}
          textStyle={{ minHeight: 64 }}
          onChangeText={(text) => setReviewBody(text)}
        />
        <Image
          source={{ uri: fileURI || '' }}
          style={{ width: 150, height: 150 }}
        />
        <TouchableOpacity>
          <Button
            style={styles.button}
            size="small"
            onPress={cameraLaunch}
          >
            Take an Image
          </Button>
        </TouchableOpacity>
        <TouchableOpacity>
          <Button
            style={styles.button}
            size="small"
            onPress={sendReview}
          >
            Add Review
          </Button>
        </TouchableOpacity>
      </Layout>
    </ScrollView>
  );
};
ReviewPost.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default ReviewPost;
