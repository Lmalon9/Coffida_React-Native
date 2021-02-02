import React, {Component, useState} from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';
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
      await AsyncStorage.setItem('@session_token', data.token);
      navigation.navigate("Home")

    })
    .catch( (message) => { console.log("ERROR" + message)})
  }

  function alert(){
    Alert.alert('Email: '+ email + ' Password: ' + password)
    console.log(email, password)
  }

    return (
      <View style={styles.container}>
          <Text style={styles.text}>
            Email:
          </Text>
          <TextInput placeholder = 'Email' style={styles.textboxUser}
          onChangeText = {text => setEmail(text)}
          />
          <Text style={styles.text}>
            Password:
          </Text>
          <TextInput placeholder = 'Password' style={styles.textboxPass}
          onChangeText = {text => setPassword(text)}
          secureTextEntry = {true}
          />  
          <TouchableOpacity on style={styles.button}>
          <Button title = 'Login' 
          
           onPress = {sendlogin}
          />
          </TouchableOpacity>

          <Text style={styles.textSignUp}>
          Dont Have an Account?
          </Text>

          <TouchableOpacity on style={styles.button}>
          <Button 
          title = 'Sign Up' 
          onPress={() => navigation.navigate('SignUp')}
          />
          </TouchableOpacity>
      </View>

    );
  }

  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      marginTop:'5%',
      marginLeft: '15%',
      textAlign: 'center'
      
      
      //marginTop: StatusBar.currentHeight || 0,
      //marginTop: Constants.statusBarHeight,
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
      marginTop:'5%',
      marginLeft:'20%',
    }
  });

  
  export default Login;
