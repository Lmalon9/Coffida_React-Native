import 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import { ToastAndroid, StyleSheet, Alert, TouchableOpacity, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';
import { Card, Text, Button, Layout, Input } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native-gesture-handler';
import { Pattern } from 'react-native-svg';



function AccountUpdate(){
    const [first_name, setFirstName] = useState(''); // initialize state
    const [last_name, setLastName] = useState(''); // initialize state
    const [email, setEmail] = useState(''); // initialize state
    const [password, setPassword] = useState(''); // initialize state
    const isValid = useState(null)
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

    const passValidation = () =>{
      var pattern = new RegExp("?")
      if (!pattern.test(password)){
        ToastAndroid.showWithGravity("Invalid Password", ToastAndroid.SHORT, ToastAndroid.CENTER)
      }
      else {
        return
      }
    }

    const send_update = async () => {
        var idlog = JSON.parse(await AsyncStorage.getItem('@session_token')).id;
        var tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
        passValidation();
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
          ToastAndroid.showWithGravity("Update Unsuccessful", ToastAndroid.SHORT, ToastAndroid.CENTER)
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
      
        <Layout style={styles.container}>
          <ScrollView style ={{alignSelf:'center', width: '100%', height:'100%', margin: 20}} 
          contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
            <Text style={styles.text}>
            First Name:
            </Text>
            <Input 
            style = {styles.textbox}
            value = {first_name}
            onChangeText = {text => setFirstName(text)}
            />
            <Text style={styles.text}>
            Last Name:
            </Text>
            <Input
            style = {styles.textbox}
            value = {last_name}
            onChangeText = {text => setLastName(text)}
            />
            <Text style={styles.text}>
            Email:
            </Text>
            <Input
            style = {styles.textbox}

            value = {email}
            onChangeText = {text => setEmail(text)}            
            />
            <Text style={styles.text}>
            Password:
            </Text>
            <Input
            style = {styles.textbox}
            onChangeText = {text => setPassword(text)}
            secureTextEntry = {true}
            />
            <TouchableOpacity>
              <Button
              style={styles.button}
              size = 'small'
              onPress={send_update}
              >
              Update
              </Button>
            </TouchableOpacity>
            </ScrollView> 
        </Layout>

    );
  }
  
  
    const styles = StyleSheet.create({
      container: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        alignItems: 'center',
        //backgroundColor: '#F7F9FC',
        justifyContent: 'center'
      },
      text: {
        fontSize: 16,
        marginTop: '5%',
      },
      textbox: {
        width: '70%'     
      },

      button:{
        marginTop: 10,
        backgroundColor: '#151A30',
        borderColor: '#151A30',
      },
    });
    export default AccountUpdate