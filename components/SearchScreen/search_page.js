/* eslint-disable react/jsx-filename-extension */
import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Rating} from 'react-native-elements';
import { Card, Text, Button, Layout, Input, Select, SelectItem, IndexPath,} from '@ui-kitten/components';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DropDownPicker from 'react-native-dropdown-picker'
import RNPickerSelect from 'react-native-picker-select'
import styles from './styles.js'


function filter(){
    const [query, setQuery] = useState('');
    const [overallQ, setOverallQ] = useState('');
    const [priceQ, setPriceQ] = useState('');
    const [qualityQ, setQualityQ] = useState('');
    const [clenlinessQ, setClenlinessQ] = useState('');
    const [searchinQ, setSearchInQ] = useState('');
    const [limitQ, setLimitQ] = useState('');
    const [offsetQ, setOffsetQ] = useState('');

    const navigation = useNavigation();
    

    return(
        <Layout>
            <Text>
            Filter by string:
            </Text>
            <Input onChangeText = {text => setQuery('q=' + text + '&')} />

            <Text>
            Filter by overall rating:
            </Text>
            <Input  onChangeText = {text => setOverallQ('overall_rating=' + text + '&')}/>

            <Text>
            Filter by price rating:
            </Text>
            <Input  onChangeText = {text => setPriceQ('price_rating=' + text + '&')}/>

            <Text>
            Filter by quality rating:
            </Text>
            <Input  onChangeText = {text => setQualityQ('quality_rating=' + text + '&')}/>

            <Text>
            Filter by clenliness rating:
            </Text>
            <Input  onChangeText = {text => setClenlinessQ('clenliness_rating=' + text + '&')}/>
            <Text>
            Filter by category:
            </Text>
            <DropDownPicker
                items={[
                    {label: 'none', value: ' '},
                    {label: 'favourite', value: 'search_in=favourite'},
                    {label: 'reviewed', value: 'search_in=reviewed'},
                ]}
                defaultValue={' '}
                containerStyle={{height:40}}
                //onChangeItem ={item => setSearchInQ(item.value)}
                onChangeItem={item => setSearchInQ(item.value)}
            />
            {/* Attempted to use UI kittens own dropdown menu called Select, however ran into a variety of issues relating to the 
            values, and I was unable to fix in time */}

            <Text>
            Limit Results:
            </Text>
            <Input  onChangeText = {text => setLimitQ('&limit=' + text + '&')}/>

            <Text>
            Offset Results:
            </Text>
            <Input  onChangeText = {text => setOffsetQ('offset=' + text + '&')}/>

            <Button style={styles.button} onPress={() => navigation.navigate("Search Results",  {
        query: query,
        overallQ: overallQ,
        priceQ: priceQ,
        qualityQ: qualityQ,
        clenlinessQ: clenlinessQ,
        searchinQ: searchinQ,
        limitQ: limitQ,
        offsetQ: offsetQ,
        //url: `http://10.0.2.2:3333/api/1.0.0/find?${query}${overallQ}${priceQ}${qualityQ}${clenlinessQ}${searchinQ}${limitQ}${offsetQ}`
        })}>
                Search
            </Button>

        

        </Layout>
    )

}

export default filter