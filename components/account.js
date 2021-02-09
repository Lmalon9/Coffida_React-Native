import 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'


function Account ({ route }) {
    
    const [first_name, setFirstName] = useState(''); // initialize state
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
        getAccount();
        
      }
    }
    catch (error){

    }
    }
  }
  ); 

  const getAccount = async () => {
    console.log("account check", route.params.userId)
    //const userId = route.params.userId
    var tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
    fetch(`http://10.0.2.2:3333/api/1.0.0/user/${route.params.userId}`,
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
      console.log(data);
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);

    })
    .catch( (message) => { console.log("ERROR" + message)})
  }



  
  const sendlogout = async () => {
    var tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
    console.log(tokenlog)
    await AsyncStorage.removeItem('@session_token');
    fetch("http://10.0.2.2:3333/api/1.0.0/user/logout",
    {
      method: 'post',
      headers: {
        "X-Authorization": tokenlog,
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

      <View style={styles.container}>
        <View style={{height:200, backgroundColor:'skyblue'}}>
          <Text style={styles.textHeader}>
          Hello {first_name}!
          </Text>
          <Text style={styles.text}>
          Users name: {first_name} {last_name}
          </Text>
          <Text style={styles.text}>
          Users Email address: {email}
          </Text>

          <TouchableOpacity style={styles.buttonUpdate}>
              <Button
              title="Update User" 
              onPress={() => navigation.navigate("AccountUpdate")}
              />
            </TouchableOpacity>

          <TouchableOpacity style={styles.buttonLogOut}>
              <Button style={{alignContent: 'center'}}
              title="Log Out" 
              onPress={sendlogout}
              />
            </TouchableOpacity>
        </View>

          <TouchableOpacity style={styles.button}>
              <Button
              title="Home Screen" 
              onPress={() => navigation.navigate("Home")}
              />
            </TouchableOpacity>
            
           
      </View>
  );
}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column', 
      alignItems: 'stretch',
      // width: '100%',
      // height: '100%',
      // marginTop: StatusBar.currentHeight || 0,
      //marginTop: Constants.statusBarHeight,
    },
    textHeader: {
      fontSize: 30,
      textAlign: 'center',
      fontWeight: 'bold',
      //marginTop: 10,
      borderRadius: 10
    },
    text: {
      fontSize: 15,
      textAlign: 'left',
      marginTop: 10,
    },

    button:{
      width:'25%',
      //marginTop: 15,
      alignContent: 'center'
    },
    buttonUpdate:{
      width:'55%',
      marginTop: 10,
      alignContent: 'center'
    },
    buttonLogOut:{
      width:'25%',
      marginTop: -35,
      marginLeft:300,
      alignContent: 'center'
    }
  });
  
export default Account