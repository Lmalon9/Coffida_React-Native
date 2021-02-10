import React, {Component, useState} from 'react';
import { ToastAndroid, StyleSheet, Alert, TouchableOpacity, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';
import { Card, Text, Button, Layout, Input } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'


function Login(){
  const [email, setEmail] = useState(''); // initialize state
  const [password, setPassword] = useState(''); // initialize state
  const navigation = useNavigation()

  const sendlogin = async () => {
    fetch("http://10.0.2.2:3333/api/1.0.0/user/login",
    {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify( {
        email: email,
        password: password,
      }),
    })

    .then ((res) => {
      if (res.status == 200)
      {
        return res.json();
        
      }
      else{
        throw 'failed';
      };

    })
    .then (async (data) => {

      console.log(data);
      await AsyncStorage.setItem('@session_token', JSON.stringify(data));
      navigation.navigate("Home")

    })
    .catch( (message) => { console.log("ERROR" + message)})
  }

  function alert(){
    Alert.alert('Email: '+ email + ' Password: ' + password)
    console.log(email, password)
  }

    return (
      <Layout style={styles.container}>
          <Text style={styles.text}>
            Email:
          </Text>
          <Input placeholder = 'Email' style={styles.textboxUser}
          onChangeText = {text => setEmail(text)}
          />
          <Text style={styles.text}>
            Password:
          </Text>
          <Input 
          placeholder = 'Password' style={styles.textboxPass}
          onChangeText = {text => setPassword(text)}
          secureTextEntry = {true}
          />  
          <TouchableOpacity >
          <Button 
          size = 'small'
          style={styles.button}
          onPress = {sendlogin}
          >
          Login
          </Button>
          </TouchableOpacity>

          <Text style={styles.textSignUp}>
          Dont Have an Account?
          </Text>

          <TouchableOpacity >
          <Button 
          size = 'small'
          style={styles.button}
          onPress={() => navigation.navigate('SignUp')}
          >
          Sign Up
          </Button>
          </TouchableOpacity>
      </Layout>

    );
  }

  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      textAlign: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 16,
      marginTop: '5%',
    
    },
    textSignUp: {
      fontSize: 16,
      marginTop: '5%',
      marginHorizontal: '12%'
    
    },
    textboxUser: {
      width: '70%'
      
    },
    textboxPass: {
      width: '70%'
    },
    button:{
      marginTop: 10,

      backgroundColor: '#151A30',
      borderColor: '#151A30',
    }
  });

  
  export default Login;
