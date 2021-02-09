import 'react-native-gesture-handler';
import React, { Component, useState, useEffect } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';
import {Icon} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Login from './login_screen';


function Landing({ navigation }){
//const navigation = useNavigation()
const [loggedin, setLoggedin] = useState(true);
const [id, setId] = useState('')

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
    setId(JSON.parse(await AsyncStorage.getItem('@session_token')).id);
    setLoggedin(true);
    //console.log("landing page ", id);

  }
  }
  catch (error){

  }
  } 
  } 
  , []); 

  if (loggedin == false){
  return (
    <View style={styles.container}>
      <View style={styles.flexbox}>
         <Text style={styles.text}>
         Welcome To Coffida 
         </Text>
          
          <Button
          title = 'Login'
          
          onPress={() => navigation.navigate("Login")} 
         />
          
     </View>
     </View>
  );
}

else{
  return(
  <View style={styles.container}>
    <View style={styles.flexbox}>
      <Text style={styles.text}>
      Welcome To Coffida
      </Text>
    </View>
    <View style= {{ height: 200}}>
      <Button title = 'Account'
      onPress={() => navigation.navigate("Account", {userId: id})}
      />
      <Button title = 'List' 
      onPress={() => navigation.navigate("CoffeeList")}
      />
    </View>
  </View>
    )
}
}



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column', 
      alignItems: 'stretch',
      justifyContent: 'center'

      // width: '100%',
      // height: '100%',
      // marginTop: StatusBar.currentHeight || 0,
      //marginTop: Constants.statusBarHeight,
    },
    flexbox:{
      height: 200, 
      backgroundColor: 'skyblue', 
      //border:2,
      borderColor: 'blue',
      borderRadius:10
    },
    text: {
      fontSize: 25,
      textAlign: 'center',
      fontWeight: 'bold',
      alignContent: 'center',
      alignItems: 'center',
      textAlign:'center'
     
    },
    button:{
      marginTop: 10,
    }
  });

export default Landing