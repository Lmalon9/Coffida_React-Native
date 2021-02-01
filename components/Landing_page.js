import 'react-native-gesture-handler';
import React, { Component, useState, useEffect } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';
import {Icon} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Login from './login_screen';


function Landing(){
const navigation = useNavigation()
const [loggedin, setLoggedin] = useState(true);

useEffect(() => {
  navigation.addListener('focus', () => {
     checkLoggedIn();
   }
   )
  async function checkLoggedIn(){
  try{
    const value = await AsyncStorage.getItem("@session_token");
  if (value == null){
    setLoggedin(false);
    }
  else{
    setLoggedin(true);
  }
  }
  catch (error){

  }
  }
  }
  ); 

  if (loggedin == false){
  return (
  
      <View>
         <Text style={styles.text}>
         Welcome To Coffida 
         </Text>
          
          <Button
          title = 'Login'
          
          onPress={() => navigation.navigate("Login")}
         />
          
     </View>
  );
}

else{
  return(
  <View>
    <Text style={styles.text}>
      test fail
    </Text>
    <Button
    title = 'Account'
    
    onPress={() => navigation.navigate("Account")}
    />
  </View>
    )
}
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