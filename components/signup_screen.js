import React, {Component, useState} from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';


function SignUp(){

    const [first_name, setFirstName] = useState(''); // initialize state
    const [last_name, setLastName] = useState(''); // initialize state
    const [email, setEmail] = useState(''); // initialize state
    const [password, setPassword] = useState(''); // initialize state



  function alert(){
    Alert.alert('First: '+ first_name + ' Last: ' + last_name + ' email: ' + email + ' password: ' + password)
    console.log(first_name, last_name, email, password)
  }

    return (
      <View style={styles.container}>
          <Text style={styles.text}>
            First Name:
          </Text>
          <TextInput placeholder = 'First Name' style={styles.textboxUser}
          onChangeText = {text => setFirstName(text)}
          />
          <Text style={styles.text}>
            Last Name:
          </Text>
          <TextInput placeholder = 'Last Name' style={styles.textboxPass}
          onChangeText = {text => setLastName(text)}
          
          />  
          <Text style={styles.text}>
            Email:
          </Text>
          <TextInput placeholder = 'Email:' style={styles.textboxPass}
          onChangeText = {text => setEmail(text)}
          
          />  
          <Text style={styles.text}>
            Password:
          </Text>
          <TextInput placeholder = 'Password:' style={styles.textboxPass}
          onChangeText = {text => setPassword(text)}
          secureTextEntry = {true}
          />  

          <TouchableOpacity on style={styles.button}>
          <Button title = 'Create Account' 
          
           onPress = {() => alert()}
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
      width:'50%',
      marginTop:'5%',
      marginLeft:'10%',
    }
  });

  
  export default SignUp;
