import 'react-native-gesture-handler';
import React, { Component, useDebugValue } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { Button} from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';


import {MainStackNav, CoffeeStackNav} from './StackNavigator.js'

// import Landing from './components/LandingScreen/Landing_page.js.js'
// import Login from './components/login_screen.js'
// import SignUp from './components/signup_screen.js'
// import Account from './components/account.js'
// import AccountUpdate from './components/account_update.js'
// import CoffeeList from './components/CoffeeSpotsScreen/coffee_list.js'
// import coffeeLocation from './components/CoffeeLocationScreen/coffee_location.js'
// import ReviewPost from './components/add_Review_Page.js'
// import UserReviewList from './components/users_reviews.js'
// import ReviewUpdate from './components/UserUpdateReview.js'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

class App extends Component {
  
  state = {
    isLoggedIn: false,
    
    
  }

  

  render(){
  return (
  <React.Fragment>
  <IconRegistry icons={EvaIconsPack} />
  <ApplicationProvider {...eva} theme={eva.light}>
  <NavigationContainer>
    <Tab.Navigator>

     <Tab.Screen name="Home" component={MainStackNav}/>
     <Tab.Screen name="Coffee Spots" component={CoffeeStackNav}/>
     
    </Tab.Navigator>
  </NavigationContainer>

    {/* <NavigationContainer> 
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Landing} />
      <Stack.Screen name="CoffeeList" component={CoffeeList} />
      <Stack.Screen name="CoffeeLocation" component={coffeeLocation} />
      <Stack.Screen name="AddReview" component={ReviewPost} />
      <Stack.Screen name="UsersReviews" component={UserReviewList} />
      <Stack.Screen name="Update User Review" component={ReviewUpdate} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="AccountUpdate" component={AccountUpdate} />
    </Stack.Navigator>
    </NavigationContainer> */}

    
  </ApplicationProvider>
  </React.Fragment>


  );
}
}

export default App;

