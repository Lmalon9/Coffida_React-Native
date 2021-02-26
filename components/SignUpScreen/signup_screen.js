/* eslint-disable react/jsx-filename-extension */
import React, {useState} from 'react';
import { Alert, TouchableOpacity, ToastAndroid } from 'react-native';
import {
  Text,
  Button,
  Layout,
  Input,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';


function SignUp() {
  const [firstName, setFirstName] = useState(''); // initialize state
  const [lastName, setLastName] = useState(''); // initialize state
  const [email, setEmail] = useState(''); // initialize state
  const [password, setPassword] = useState(''); // initialize state
  const navigation = useNavigation();

  const sendSignUp = () => {
    fetch('http://10.0.2.2:3333/api/1.0.0/user',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }),
      })
      .then((res) => {
        if (res.status === 201) {
          ToastAndroid.showWithGravity('SignUp Successful!', ToastAndroid.SHORT, ToastAndroid.CENTER);
          return res.json();
        } else {
          ToastAndroid.showWithGravity('SignUp Unsuccessful', ToastAndroid.SHORT, ToastAndroid.CENTER);
          throw 'failed';
        }
      })
      .then((data) => {
        navigation.navigate('Login');
      })
      .catch((message) => { console.log('ERROR' + message)})
  };

  const passValidation = () =>{
    const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
    if (pattern.test(password) === false) {
      ToastAndroid.showWithGravity('Invalid Password', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
    else{
      sendSignUp();
    }
  };

  const emailValidation = () =>{
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (pattern.test(email) === false) {
      ToastAndroid.showWithGravity('Invalid Email', ToastAndroid.SHORT, ToastAndroid.CENTER);
    } else {
      passValidation();
    }
  };
  // pattern for password and email picked up from stackoverflow

  function alert() {
    Alert.alert('First: '+ first_name + ' Last: ' + last_name + ' email: ' + email + ' password: ' + password)
    console.log(first_name, last_name, email, password)
  }

  return (
    <Layout style={styles.container}>
      <Text style={styles.text}>
        First Name:
      </Text>
      <Input
        placeholder="First Name:"
        style={styles.textbox}
        onChangeText={(text) => setFirstName(text)}
      />
      <Text style={styles.text}>
        Last Name:
      </Text>
      <Input
        placeholder="Last Name:"
        style={styles.textbox}
        onChangeText={(text) => setLastName(text)}
      />
      <Text style={styles.text}>
        Email:
      </Text>
      <Input 
        placeholder="Email:"
        style={styles.textbox}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.text}>
        Password:
      </Text>
      <Input
        placeholder="Password:"
        style={styles.textbox}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />

      <TouchableOpacity>
        <Button
          size="small"
          style={styles.button}
          onPress={emailValidation}
        >
          Sign Up
        </Button>
      </TouchableOpacity>
    </Layout>
  );
}

export default SignUp;
