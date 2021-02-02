import 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'


function Account(){
    const [first_name, setFirstName] = useState('Test'); // initialize state
    const [last_name, setLastName] = useState(''); // initialize state
    const [email, setEmail] = useState(''); // initialize state
    const [password, setPassword] = useState(''); // initialize state
    const navigation = useNavigation();

    useEffect(() => {
       navigation.addListener('focus', () => {
          checkLoggedIn();
        }
        )
    async function checkLoggedIn(){
      try{
      const value = await AsyncStorage.getItem("@session_token");
      if (value == null){
        navigation.navigate("Login")
      }
      else{
        navigation.navigate("Account")
        
      }
    }
    catch (error){

    }
    }
  }
  ); 

  const sendlogout = async () => {
    token = await AsyncStorage.getItem('@session_token');
    console.log(token)
    await AsyncStorage.removeItem('@session_token');
    fetch("http://10.0.2.2:3333/api/1.0.0/user/logout",
    {
      method: 'post',
      headers: {
        "X-Authorization": token,
      },
    })

    .then ((res) => {
      if (res.status === 200)
      {
        return      
      }
      else{
        throw 'failed';
      };

    })
    .then (async (data) => {

      console.log(data);
      await AsyncStorage.removeItem('@session_token');
      navigation.navigate("Home")

    })
    .catch( (message) => { console.log("ERROR" + message)})
  }

    
  
  return (

      <View>
          <Text style={styles.text}>
          Hello + {first_name}
          </Text>
          <TouchableOpacity style={styles.button}>
              <Button
              title="Home Screen" 
              onPress={() => navigation.navigate("Home")}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Button
              title="Log Out" 
              onPress={sendlogout}
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
      fontSize: 30,
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
  
export default Account