/* eslint-disable react/jsx-filename-extension */
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import { Layout, List, Divider } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeObject from'../CoffeeSpotsScreen/CoffeeObject';
import styles from './styles';

function SearchResults ({ route }) {
    console.log(route.params.searchInQ)
    const [query, setQuery] = useState(route.params.query);
    const [overallQ, setOverallQ] = useState(route.params.overallQ);
    const [priceQ, setPriceQ] = useState(route.params.priceQ);
    const [qualityQ, setQualityQ] = useState(route.params.qualityQ);
    const [clenlinessQ, setClenlinessQ] = useState(route.params.clenlinessQ);
    const [searchinQ, setSearchInQ] = useState(route.params.searchinQ);
    const [limitQ, setLimitQ] = useState(route.params.limitQ);
    const [offsetQ, setOffsetQ] = useState(route.params.offsetQ);

    const [location, setLocations] = useState([]);
    //const {location} = route.params;
    //console.log(JSON.stringify(location))
    useEffect(() => {
        //console.log(location)
        searchLocations()
    }, []);

    async function searchLocations(){
        var tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
        // for (id = 1; id < 9; id++)
        // {
        fetch(`http://10.0.2.2:3333/api/1.0.0/find?${query}${overallQ}${priceQ}${qualityQ}${clenlinessQ}${searchinQ}${limitQ}${offsetQ}`,
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
        console.log(`http://10.0.2.2:3333/api/1.0.0/find?${query}${overallQ}${priceQ}${qualityQ}${clenlinessQ}${searchinQ}${limitQ}${offsetQ}`)
        console.log(JSON.stringify(data, null, 4));
        setLocations(data)
        // navigation.navigate("Search Results", {locations}
        // {location : {
        //     location_id: locations.location_id,
        //     location_name: locations.location_name,
        //     location_town: locations.location_town,
        //     avg_overall_rating: locations.avg_overall_rating,
        // }}
        // )
        
        })
        .catch( (message) => { console.log("ERROR" + message)})
      
    }

    return (

        <Layout style = {{flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
            
            <List style = {styles.container}
            data={location}
            keyExtractor={item => item.location_id.toString()}
            ItemSeparatorComponent={Divider}
            renderItem={({ item }) => (
                <CoffeeObject location = {item} />
              )}/>

        </Layout>
      )
            };

  export default SearchResults
