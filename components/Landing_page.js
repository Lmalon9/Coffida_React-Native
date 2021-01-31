import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';
import {Icon} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'

function Landing(){

  const navigation = useNavigation()
  
  return (

      <View>
          <Text style={styles.text}>
          Welcome To Coffida 
          </Text>
          <TouchableOpacity style={styles.button}>
              <Icon
              icon="camera"
              color={Colors.red500}
              size={20}
              //title="Account" 
              onPress={() => navigation.navigate('Login')}
              />
            </TouchableOpacity>
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
      width:'25%',
      marginTop: 10,
    }
  });
  
export default Landing