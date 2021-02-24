import 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Alert, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Card, Text, Button, Layout } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './styles.js'


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
      console.log(JSON.stringify(data, null, 4));
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

  const Header = (props) => (
    <Layout {...props} style={[props.style, styles.headerContainer]}>
      <Text category='h2'>Hello {first_name}</Text>
    </Layout>
  );

  const Footer = (props) => (
    <Layout {...props} style={[props.style, styles.footerContainer]}>
      <TouchableOpacity>
              <Button style={styles.button}
              size = 'small'
              title="Update User" 
              onPress={() => navigation.navigate("AccountUpdate")}
              >
                Update user
              </Button>
            </TouchableOpacity>

          <TouchableOpacity >
              <Button style={styles.button}
              size = 'small'
              title="Log Out" 
              onPress={sendlogout}
              >
                Log Out
              </Button>
            </TouchableOpacity>

    </Layout>
  )

    
  
  return (

      <Layout style={styles.Container}>
        <Card style={styles.flexbox} header = {Header} footer = {Footer}>
          {/* <Text style={styles.textHeader}>
          Hello {first_name}!
          </Text> */}
          <Text style={styles.text}>
          Users name: {first_name} {last_name}
          </Text>
          <Text style={styles.text}>
          Users Email address: {email}
          </Text>
        </Card>
        <TouchableOpacity >
    <Button style={styles.button}
      size = 'small'
      onPress={() => navigation.navigate("Home")}>
        Home
      </Button>
    </TouchableOpacity>
          
            
           
      </Layout>
    
      
    
  );
}
  
export default Account