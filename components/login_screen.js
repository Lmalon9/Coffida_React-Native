import React, {Component, useState} from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native'


function Login(){
  const [email, setEmail] = useState(''); // initialize state
  const [password, setPassword] = useState(''); // initialize state
  const navigation = useNavigation()

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
          
           onPress = {() => alert()}
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
