import 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import { Text, ToastAndroid, View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'



function AccountUpdate(){
    const [first_name, setFirstName] = useState(''); // initialize state
    const [last_name, setLastName] = useState(''); // initialize state
    const [email, setEmail] = useState(''); // initialize state
    const [password, setPassword] = useState(''); // initialize state
    const navigation = useNavigation();

    useEffect(() => {
      navigation.addListener('focus', () => {
        getUserInfo();
      }
      )
      async function getUserInfo(){
      var idlog = JSON.parse(await AsyncStorage.getItem('@session_token')).id;
      var tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
      fetch(`http://10.0.2.2:3333/api/1.0.0/user/${idlog}`,
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
    });

    const send_update = async () => {
        var idlog = JSON.parse(await AsyncStorage.getItem('@session_token')).id;
        var tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
        console.log(idlog)
        fetch(`http://10.0.2.2:3333/api/1.0.0/user/${idlog}`,
        {
          method: 'patch',
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": tokenlog,
          
          },
          body: JSON.stringify( {
            first_name: first_name,
            last_name:last_name,
            email: email,
            password: password,
          }),
      })

      .then ((res) => {
        if (res.status == 200)
        {
          ToastAndroid.showWithGravity("Update Successful", ToastAndroid.SHORT, ToastAndroid.CENTER)
          navigation.navigate("Account")
          return;
          
        }
        else{
          throw 'failed';
        };
  
      })
      // .then (async (data) => {
  
      //   console.log(data);
      //   navigation.navigate("Account")
  
      // })
      .catch( (message) => { console.log("ERROR" + message)})
    }

    return (

        <View>
            <TextInput 
            value = {first_name}
            onChangeText = {text => setFirstName(text)}
            />
            <TextInput
            value = {last_name}
            onChangeText = {text => setLastName(text)}
            />
            <TextInput
            value = {email}
            onChangeText = {text => setEmail(text)}            />
            <TextInput
            onChangeText = {text => setPassword(text)}            />
            <TouchableOpacity style={styles.button}>
              <Button
              title="Update" 
              onPress={send_update}
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
    export default AccountUpdate