/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import { ToastAndroid, TouchableOpacity } from 'react-native';
import { Text, Button, Layout, Input } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles'

function AccountUpdate() {
  const [firstName, setFirstName] = useState(''); // initialize state
  const [lastName, setLastName] = useState(''); // initialize state
  const [email, setEmail] = useState(''); // initialize state
  const [password, setPassword] = useState(''); // initialize state
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('focus', () => {
      getUserInfo();
    });
    async function getUserInfo() {
      const idlog = JSON.parse(await AsyncStorage.getItem('@session_token')).id;
      const tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
      fetch(`http://10.0.2.2:3333/api/1.0.0/user/${idlog}`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': tokenlog,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
          throw 'failed';
          };
        })
        .then((data) => {
          // console.log(data);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setEmail(data.email);
        })
        .catch((message) => ToastAndroid.showWithGravity(`ERROR ${message}`));
    }
  });

  const send_update = async () => {
    const idlog = JSON.parse(await AsyncStorage.getItem('@session_token')).id;
    const tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
    fetch(`http://10.0.2.2:3333/api/1.0.0/user/${idlog}`,
      {
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': tokenlog,
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }),
      })
      .then((res) => {
        if (res.status === 200) {
          ToastAndroid.showWithGravity('Update Successful', ToastAndroid.SHORT, ToastAndroid.CENTER);
          navigation.navigate('Account');
          return;
        } else {
          ToastAndroid.showWithGravity("Update Unsuccessful", ToastAndroid.SHORT, ToastAndroid.CENTER)
          throw 'failed';
        }
      })
    // .then (async (data) => {
    //   console.log(data);
    //   navigation.navigate("Account")
    // })
      .catch((message) => ToastAndroid.showWithGravity(`ERROR ${message}`));
  };

  const passValidation = () =>{
    const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
    if (pattern.test(password) === false) {
      ToastAndroid.showWithGravity("Invalid Password", ToastAndroid.SHORT, ToastAndroid.CENTER)
    } else {
      send_update();
    }
  };

  const emailValidation = () =>{
    const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
    if (pattern.test(email) === false) {
      ToastAndroid.showWithGravity("Invalid Email", ToastAndroid.SHORT, ToastAndroid.CENTER)
    } else {
      passValidation();
    }
  };

  return (
    <Layout style={styles.container}>
      <ScrollView style={{ alignSelf: 'center', width: '100%', height: '100%', margin: 20 }} 
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.text}>
          First Name:
        </Text>
        <Input
          style={styles.textbox}
          value={firstName}
          onChangeText={text => setFirstName(text)}
        />
        <Text style={styles.text}>
          Last Name:
        </Text>
        <Input
          style={styles.textbox}
          value={lastName}
          onChangeText={text => setLastName(text)}
        />
        <Text style={styles.text}>
          Email:
        </Text>
        <Input
          style={styles.textbox}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Text style={styles.text}>
          Password:
        </Text>
        <Input
          style={styles.textbox}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity>
          <Button
            style={styles.button}
            size='small'
            onPress={emailValidation}>
            Update
          </Button>
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
}

export default AccountUpdate;
