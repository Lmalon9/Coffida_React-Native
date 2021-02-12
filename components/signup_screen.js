import React, {Component, useState} from 'react';
import { StyleSheet, Alert, TouchableOpacity, ToastAndroid} from 'react-native';
import { Card, Text, Button, Layout, Input } from '@ui-kitten/components';

import { useNavigation } from '@react-navigation/native'


function SignUp(){

    const [first_name, setFirstName] = useState(''); // initialize state
    const [last_name, setLastName] = useState(''); // initialize state
    const [email, setEmail] = useState(''); // initialize state
    const [password, setPassword] = useState(''); // initialize state
    const navigation = useNavigation()


    const sendSignUp = () => {
      fetch("http://10.0.2.2:3333/api/1.0.0/user",
      {
        method: 'post',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
        }),
      })

      .then ((res) => {
        if (res.status == 201)
        {
          ToastAndroid.showWithGravity("SignUp Successful!", ToastAndroid.SHORT, ToastAndroid.CENTER)
          return res.json();
          
        }
        else{
          ToastAndroid.showWithGravity("SignUp Unsuccessful", ToastAndroid.SHORT, ToastAndroid.CENTER)
          throw 'failed';
        };

      })
      .then ( (data) => {
        console.log(data);
        navigation.navigate("Login")

      })
      .catch( (message) => { console.log("ERROR" + message)})
    }


  function alert(){
    Alert.alert('First: '+ first_name + ' Last: ' + last_name + ' email: ' + email + ' password: ' + password)
    console.log(first_name, last_name, email, password)
  }

    return (
      <Layout style={styles.container}>
          <Text style={styles.text}>
            First Name:
          </Text>
          <Input placeholder = 'First Name' style={styles.textbox}
          onChangeText = {text => setFirstName(text)}
          />
          <Text style={styles.text}>
            Last Name:
          </Text>
          <Input placeholder = 'Last Name' style={styles.textbox}
          onChangeText = {text => setLastName(text)}
          
          />  
          <Text style={styles.text}>
            Email:
          </Text>
          <Input placeholder = 'Email:' style={styles.textbox}
          onChangeText = {text => setEmail(text)}
          secureTextEntry = {true}

          
          />  
          <Text style={styles.text}>
            Password:
          </Text>
          <Input placeholder = 'Password:' style={styles.textbox}
          onChangeText = {text => setPassword(text)}
          secureTextEntry = {true}
          />  

          <TouchableOpacity>
          <Button 
          size = 'small'
          style={styles.button}
          onPress = {sendSignUp}
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
      backgroundColor: '#F7F9FC',
      justifyContent: 'center'

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
    textbox: {
      width: '70%'
      
    },
   
    button:{
      marginTop: 10,

      backgroundColor: '#151A30',
      borderColor: '#151A30',
    }
  });

  
  export default SignUp;
