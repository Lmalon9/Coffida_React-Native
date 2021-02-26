/* eslint-disable react/jsx-filename-extension */
import React, {useState} from 'react';
import { ToastAndroid, TouchableOpacity } from 'react-native';
import { Text, Button, Layout, Input } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

function Login() {
  const [email, setEmail] = useState(''); // initialize state
  const [password, setPassword] = useState(''); // initialize state
  const navigation = useNavigation();

  const sendlogin = async () => {
    fetch("http://10.0.2.2:3333/api/1.0.0/user/login",
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
      .then((res) => {
        if (res.status === 200) {
          ToastAndroid.showWithGravity("Login Successful!", ToastAndroid.SHORT, ToastAndroid.CENTER)
          return res.json();
        } else {
          ToastAndroid.showWithGravity("Login Unsuccessful, please check Email or Password", ToastAndroid.SHORT, ToastAndroid.CENTER)
          throw 'failed';
        };
      })
      .then(async (data) => {
        console.log(data);
        await AsyncStorage.setItem('@session_token', JSON.stringify(data));
        navigation.navigate('Home');
      })
      .catch((message) => ToastAndroid.showWithGravity(`ERROR ${message}`));
  };

  return (
    <Layout style={styles.container}>
      <Text style={styles.text}>
        Email:
      </Text>
      <Input
        placeholder="Email"
        style={styles.textbox}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.text}>
        Password:
      </Text>
      <Input
        placeholder="Password"
        style={styles.textbox}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity>
        <Button
          size="small"
          style={styles.button}
          onPress={sendlogin}
        >
          Login
        </Button>
      </TouchableOpacity>
      <Text style={styles.textSignUp}>
        Dont Have an Account?
      </Text>
      <TouchableOpacity>
        <Button
          size="small"
          style={styles.button}
          onPress={() => navigation.navigate('SignUp')}
        >
          Sign Up
        </Button>
      </TouchableOpacity>
    </Layout>

  );
}
export default Login;
