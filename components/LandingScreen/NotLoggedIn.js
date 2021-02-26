/* eslint-disable react/jsx-filename-extension */
import 'react-native-gesture-handler';
import React from 'react';
import { TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import {
  Card,
  Text,
  Button,
  Layout,
  Icon,
} from '@ui-kitten/components';
import styles from './styles';

function NotLoggedIn() {
  const navigation = useNavigation()
  const PersonIcon = (props) => (
    <Icon {...props} name="person-outline" />
  );

  const Footer = (props) => (
    <Layout {...props} style={[props.style, styles.footerContainer]}>
      <TouchableOpacity >
        <Button  style={styles.button}
          size = 'small'
          accessoryLeft={PersonIcon}
          onPress={() => navigation.navigate("Login")}
          >
          Login
        </Button>
      </TouchableOpacity>
    </Layout>
  )
  return (
    <Layout style={styles.Container}>
      <Card style={styles.flexbox} footer = {Footer}>
        <Text style={styles.titleText} category="h1">
          Welcome To Coffida
        </Text>
      </Card>
    </Layout>
  );
}

export default NotLoggedIn;
