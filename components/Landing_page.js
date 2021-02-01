import 'react-native-gesture-handler';
import React, { Component, useState, useEffect } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';
import {Icon} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'


function Landing(){
const navigation = useNavigation()


  return (

      <View>
          <Text style={styles.text}>
          Welcome To Coffida 
          </Text>
          
          <Button
          title = 'Account'
          
          onPress={() => navigation.navigate("Account")}
          />
          
      </View>
  );
}



  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      marginTop: StatusBar.currentHeight || 0,
      //marginTop: Constants.statusBarHeight,
    },
    text: {
      fontSize: 25,
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: 10,
    },
    textboxUser: {
      borderWidth: 0.5,
      borderColor: 'black',
      width: '70%'
      
    },
    textboxPass: {
      
      borderWidth: 0.5,
      borderColor: 'black',
      width: '70%'
    },
    button:{
      marginTop: 10,
    }
  });

export default Landing