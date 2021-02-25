/* eslint-disable react/jsx-filename-extension */
import 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import {
  Card,
  Text,
  Button,
  Layout,
} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

function Account({ route }) {
  const [firstName, setFirstName] = useState(''); // initialize state
  const [lastName, setLastName] = useState(''); // initialize state
  const [email, setEmail] = useState(''); // initialize state
  const navigation = useNavigation();

  const getAccount = async () => {
    //  console.log("account check", route.params.userId)
    const tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
    fetch(`http://10.0.2.2:3333/api/1.0.0/user/${route.params.userId}`,
      {
        method: 'get',
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": tokenlog,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw 'error';
        };
      })
      .then((data) => {
      //  console.log(JSON.stringify(data, null, 4));
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
      })
      .catch((message) => ToastAndroid.showWithGravity(`ERROR ${message}`));
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      checkLoggedIn();
    });
    async function checkLoggedIn() {
      try {
        const value = await AsyncStorage.getItem('@session_token');
        if (value == null) {
          navigation.navigate('Login');
        } else {
          navigation.navigate('Account');
          getAccount();
        }
      }
      catch (error) {
        ToastAndroid.showWithGravity('Error!', ToastAndroid.SHORT, ToastAndroid.CENTER);
      }
    }
  });

  const sendlogout = async () => {
    const tokenlog = JSON.parse(await AsyncStorage.getItem('@session_token')).token;
    //  console.log(tokenlog)
    await AsyncStorage.removeItem('@session_token');
    fetch("http://10.0.2.2:3333/api/1.0.0/user/logout", 
      {
        method: 'post',
        headers: {
          "X-Authorization": tokenlog,
        },
      })
      .then((res) => {
        if (res.status === 200)
        {
          return;
        } else {
          throw 'failed';
        }
      })
      .then(async (data) => {
        // console.log(data);
        await AsyncStorage.removeItem('@session_token');
        navigation.navigate('Home');
      })
      .catch((message) => ToastAndroid.showWithGravity(`ERROR ${message}`));
  };

  const Header = (props) => (
    <Layout {...props} style={[props.style, styles.headerContainer]}>
      <Text category='h2'>
        Hello {firstName}
      </Text>
    </Layout>
  );

  const Footer = (props) => (
    <Layout {...props} style={[props.style, styles.footerContainer]}>
      <TouchableOpacity>
        <Button
          style={styles.button}
          size="small"
          title="Update User"
          onPress={() => navigation.navigate('AccountUpdate')}
        >
          Update user
        </Button>
      </TouchableOpacity>

      <TouchableOpacity>
        <Button
          style={styles.button}
          size="small"
          title="Log Out"
          onPress={sendlogout}
        >
          Log Out
        </Button>
      </TouchableOpacity>
    </Layout>
  );
  return (

    <Layout style={styles.Container}>
      <Card style={styles.flexbox} header={Header} footer={Footer}>
        <Text style={styles.text}>
          Users name: {firstName} {lastName}
        </Text>
        <Text style={styles.text}>
          Users Email address: {email}
        </Text>
      </Card>
      <TouchableOpacity>
        <Button
          style={styles.button}
          size="small"
          onPress={() => navigation.navigate('Home')}
        >
          Home
        </Button>
      </TouchableOpacity>
    </Layout>
  );
}
Account.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.number,
    }),
  }).isRequired,
};
export default Account;
