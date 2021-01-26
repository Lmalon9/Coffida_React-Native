import React, {useState} from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';


function Login() {
  const [email, setEmail] = useState(''); // initialize state
  const [password, setPassword] = useState(''); // initialize state

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
      fontSize: 14,
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
      width:'30%'
    }
  });

  
  export default Login;
