/* eslint-disable react/jsx-filename-extension */
import 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { Rating } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Card,
  Text,
  Button,
  Layout,
  List,
  Divider,
} from '@ui-kitten/components';
import CoffeeLocationObject from './CoffeeLocationObject';
import styles from './styles';

function coffeeLocation({ route }) {
  const [locations, setLocations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('focus', () => {
      getCoffeeLoc();
    });

    async function getCoffeeLoc() {
      const tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
      fetch(`http://10.0.2.2:3333/api/1.0.0/location/${route.params.id}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': tokenlog,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw 'failed';
          };
        })
        .then((data) => {
          setLocations(data);
        });
    }
  }, []);

  const Header = (props) => (
    <Layout {...props}>
      <Text category="h3">
        {locations.location_name}
      </Text>
      <Text category="s1">
        {locations.location_town}
      </Text>
      <Text category="p1">
        {locations.longitude}, {locations.latitude}
      </Text>
    </Layout>
  );

  const Footer = (props) => (
    <Layout>
      <Layout {...props} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <Text>
          Overall Rating:
        </Text>
        <Rating
          startingValue={locations.avg_overall_rating}
          imageSize={15}
          ratingCount={5}
          readonly
        />
        <Text>
          Price Rating:
        </Text>
        <Rating
          startingValue={locations.avg_price_rating}
          imageSize={15}
          ratingCount={5}
          readonly
        />
      </Layout>
      <Layout style={{ flexDirection: 'row', flexWrap: 'nowrap' }}>
        <Text>
          Clenliness Rating:
        </Text>
        <Rating
          startingValue={locations.avg_clenliness_rating}
          imageSize={15}
          ratingCount={5}
          readonly
        />
        <Text>
          Quality Rating:
        </Text>
        <Rating
          startingValue={locations.avg_quality_rating}
          imageSize={15}
          ratingCount={5}
          readonly
        />
      </Layout>
    </Layout>
  );

  return (
    <Layout
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <Layout>
        <Card header={Header} footer={Footer}>

        </Card>
      </Layout>

      <Button style={styles.button} onPress={() => navigation.navigate('AddReview', { id: locations.location_id })}>
        Add A Review
      </Button>

      <List
        style={styles.container}
        data={locations.location_reviews}
        keyExtractor={(item) => item.review_id.toString()}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => (
          <CoffeeLocationObject review={item} location={locations} />
        )}
      />
    </Layout>
  );
}

coffeeLocation.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default coffeeLocation;
