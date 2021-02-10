import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { TextInput, StyleSheet, Alert, TouchableOpacity, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Text, Button, Layout } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoggedIn from './LoggedIn.js'
import NotLoggedIn from './NotLoggedIn.js'

//import styles from './HomeObject/styles'


function Landing(){
const navigation = useNavigation()
const [loggedin, setLoggedin] = useState(true);
const [id, setId] = useState('')


useEffect(() => {
  navigation.addListener('focus', () => {
     checkLoggedIn();
   }
  )
  async function checkLoggedIn(){
  try{
    const value = await AsyncStorage.getItem("@session_token");
  if (value == null){
    setLoggedin(false);
    }
  else{
    setId(JSON.parse(await AsyncStorage.getItem('@session_token')).id);
    setLoggedin(true);
    //console.log("landing page ", id);

  }
  }
  catch (error){

  }
  } 
  } 
  , []); 


  if (loggedin == false){
  return (

    <NotLoggedIn />
  //   <Layout style={styles.container}>
  //     <Layout style={styles.flexbox}>
  //        <Text style={styles.text}>
  //        Welcome To Coffida 
  //        </Text>
          
  //         <Button
  //         title = 'Login'
          
  //         onPress={() => navigation.navigate("Login")}
  //        />
          
  //    </Layout>
  //    </Layout>
  // );
  )
}

else{
  return(
  
    <LoggedIn id = {id} />
  
    )
}
}



  const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   flexDirection: 'column', 
    //   alignItems: 'stretch',
    //   justifyContent: 'center'

    //   // width: '100%',
    //   // height: '100%',
    //   // marginTop: StatusBar.currentHeight || 0,
    //   //marginTop: Constants.statusBarHeight,
    // },
    // flexbox:{
    //   height: 200, 
    //   backgroundColor: 'skyblue', 
    //   //border:2,
    //   borderColor: 'blue',
    //   borderRadius:10
    // },
    // text: {
    //   fontSize: 25,
    //   textAlign: 'center',
    //   fontWeight: 'bold',
    //   alignContent: 'center',
    //   alignItems: 'center',
    //   textAlign:'center'
     
    // },
    // button:{
    //   marginTop: 10,
    // }
  });

export default Landing