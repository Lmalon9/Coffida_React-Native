import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native'

function Landing(){

  const navigation = useNavigation()
  
  return (

      <View>
          <Text style={styles.text}>
          TESTING HOME PAGE
          </Text>
          <TouchableOpacity style={styles.button}>
              <Button
              title="Account" 
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
      fontSize: 14,
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
      width:'30%',
      marginTop: 100,
    }
  });
  
export default Landing