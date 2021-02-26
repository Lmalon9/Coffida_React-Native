/* eslint-disable react/jsx-filename-extension */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { ToastAndroid, Image } from 'react-native';
import { Rating } from 'react-native-elements';
import { Card, Text, Button, Layout, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const CoffeeSpots = ({ location }) => {
  const [favourite, setFavourite] = useState(false);
  const navigation = useNavigation();

  const checkFavs = async () => {
    const token = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
    const id = JSON.parse(await AsyncStorage.getItem('@session_token')).id;
    fetch(`http://10.0.2.2:3333/api/1.0.0/user/${id}`, {
      method: 'get',
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
        const currentFavourites = (data.favourite_locations.filter(fav => fav.location_id === location.location_id).length) > 0;
        setFavourite(currentFavourites);
        // Filter check the id of the favs and all the location ids, too see if it
        // is present in the users list
      })
      .catch((message) => ToastAndroid.showWithGravity(`ERROR ${message}`));
  };

  useEffect(() => {
    checkFavs();
  }, []);

  async function fav_location(id) {
    const tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
    fetch(`http://10.0.2.2:3333/api/1.0.0/location/${id}/favourite`,
      {
        method: favourite ? 'delete':'post',
        headers: {
          //"Content-Type": "application/json",
          'X-Authorization': tokenlog,
        },
      })
      .then((res) => {
        if (res.status === 200)
        {
          ToastAndroid.showWithGravity(favourite ? "UnFav" :"Favourited",  ToastAndroid.SHORT, ToastAndroid.CENTER);
          setFavourite(!favourite);
          return;
        } else {
          throw 'failed';
        };
      })
      .catch((message) => ToastAndroid.showWithGravity(`ERROR ${message}`));
  }

  const Header = (props) => (
    <Layout {...props} style={[props.style, styles.header]} >
      <Text category = 'h2'>
        {location.location_name}
      </Text>
      <Text category = 's1'>
        {location.location_town}
      </Text>
      <Button
        style= {styles.buttonFav}
        appearance="ghost"
        accessoryLeft={starIcon}
        size="medium"
        onPress={() => fav_location(location.location_id)}>
      </Button>
    </Layout>
  );

  const Footer = (props) => (
    <Layout {...props}>
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
  );

  const starIcon = (props) => (
    <Icon {...props} name="star" />
  );
  return (
    <Layout>
      <Card style={styles.card} header = {Header} footer = {Footer} onPress={() => navigation.navigate('CoffeeLocation', { id: location.location_id })}>

        <Image
          style={{
            height: 200,
            width: 400,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          resizeMode="contain"
          source={{ uri: `${location.photo_path}` }}
        />

      </Card>
    </Layout>
  );
};

export default CoffeeSpots;
