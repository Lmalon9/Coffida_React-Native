import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';

import Landing from './components/Landing_page.js'
import Login from './components/login_screen.js'
import SignUp from './components/signup_screen.js'
import Account from './components/account.js'
import AccountUpdate from './components/account_update.js'
import CoffeeList from './components/coffee_list.js'
import coffeeLocation from './components/coffee_location.js'
import { ScreenStackHeaderLeftView } from 'react-native-screens';


const Stack = createStackNavigator();


class App extends Component {
  state = {
    isLoggedIn: false,
    
  }


  render(){
  return (
   <NavigationContainer> 
    <Stack.Navigator>
     <Stack.Screen name="Home" component={Landing}  />
     <Stack.Screen name="CoffeeList" component={CoffeeList} />
     <Stack.Screen name="CoffeeLocation" component={coffeeLocation} />
     <Stack.Screen name="Login" component={Login} />
     <Stack.Screen name="SignUp" component={SignUp} />
     <Stack.Screen name="Account" component={Account} />
     <Stack.Screen name="AccountUpdate" component={AccountUpdate} />


     </Stack.Navigator>
    </NavigationContainer>

  );
}
}

export default App;

