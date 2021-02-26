/* eslint-disable react/jsx-filename-extension */
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  Text,
  Button,
  Layout,
  Input,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './styles';

function filter() {
  const [query, setQuery] = useState('');
  const [overallQ, setOverallQ] = useState('');
  const [priceQ, setPriceQ] = useState('');
  const [qualityQ, setQualityQ] = useState('');
  const [clenlinessQ, setClenlinessQ] = useState('');
  const [searchinQ, setSearchInQ] = useState('');
  const [limitQ, setLimitQ] = useState('');
  const [offsetQ, setOffsetQ] = useState('');

  const navigation = useNavigation();
  return (
    <Layout style={{ alignContent: 'center', justifyContent: 'center' }}>
      <Text style={{ alignContent: 'center', textAlign: 'center', alignItems: 'center', marginTop: 10 }}>
        Filter by string:
      </Text>
      <Input onChangeText={(text) => setQuery('q=' + text + '&')} />
      <Text style={{ alignContent: 'center', textAlign: 'center', alignItems: 'center' }}>
        Filter by overall rating:
      </Text>
      <Input onChangeText={(text) => setOverallQ('overall_rating=' + text + '&')} />
      <Text style={{ alignContent: 'center', textAlign: 'center', alignItems: 'center' }}>
        Filter by price rating:
      </Text>
      <Input onChangeText={(text) => setPriceQ('price_rating=' + text + '&')} />
      <Text style={{ alignContent: 'center', textAlign: 'center', alignItems: 'center' }}>
        Filter by quality rating:
      </Text>
      <Input onChangeText={(text) => setQualityQ('quality_rating=' + text + '&')} />
      <Text style={{ alignContent: 'center', textAlign: 'center', alignItems: 'center' }}>
        Filter by clenliness rating:
      </Text>
      <Input onChangeText={(text) => setClenlinessQ('clenliness_rating=' + text + '&')} />
      <Text style={{ alignContent: 'center', textAlign: 'center', alignItems: 'center' }}>
        Filter by category:
      </Text>
      <DropDownPicker
        items={[
          { label: 'none', value: ' ' },
          { label: 'favourite', value: 'search_in=favourite' },
          { label: 'reviewed', value: 'search_in=reviewed' },
        ]}
        defaultValue={' '}
        containerStyle={{ height: 40 }}
        // onChangeItem ={item => setSearchInQ(item.value)}
        onChangeItem={(item) => setSearchInQ(item.value)}
      />
      {/* Attempted to use UI kittens own dropdown menu called Select, however ran into a variety of
      issues relating to the values, and I was unable to fix in time */}
      <Text style={{ alignContent: 'center', textAlign: 'center', alignItems: 'center' }}>
        Limit Results:
      </Text>
      <Input onChangeText={(text) => setLimitQ('&limit=' + text + '&')} />
      <Text style={{ alignContent: 'center', textAlign: 'center', alignItems: 'center' }}>
        Offset Results:
      </Text>
      <Input onChangeText={(text) => setOffsetQ('offset=' + text + '&')} />
      <Button
        style={styles.button}
        onPress={() => navigation.navigate('Search Results', {
          query: query,
          overallQ: overallQ,
          priceQ: priceQ,
          qualityQ: qualityQ, 
          clenlinessQ: clenlinessQ,
          searchinQ: searchinQ,
          limitQ: limitQ,
          offsetQ: offsetQ,
        })}
      >
        Search
      </Button>
      <Button style={styles.button} onPress={() => navigation.navigate('Location Results')}>
        Sort By Location
      </Button>
    </Layout>
  );
}

export default filter;
