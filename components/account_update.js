import 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'


function AccountUpdate(){
    const [first_name, setFirstName] = useState('Test'); // initialize state
    const [last_name, setLastName] = useState(''); // initialize state
    const [email, setEmail] = useState(''); // initialize state
    const [password, setPassword] = useState(''); // initialize state
    const navigation = useNavigation();

    useEffect(() => {
         
           
         
        }
    );

    const send_update = async () => {
        var idlog = JSON.parse(await AsyncStorage.getItem('@session_token')).id;
        console.log(idlog)

    }

    return (

        <View>
            <TextInput 
            value = {first_name}
            onChangeText = {text => setFirstName(text)}
            />
            <TextInput
            onChangeText = {text => setLastName(text)}
            />
            <TextInput>
            {email}
            </TextInput>
            <TextInput>
            {password}
            </TextInput>
            <TouchableOpacity style={styles.button}>
              <Button
              title="Update" 
              //onPress={}
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