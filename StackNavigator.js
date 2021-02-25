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



import Landing from './components/LandingScreen/Landing_page';
import Login from './components/LoginScreen/login_screen';
import SignUp from './components/SignUpScreen/signup_screen';
import Account from './components/AccountScreen/account';
import AccountUpdate from './components/AccountUpdateScreen/account_update';
import CoffeeList from './components/CoffeeSpotsScreen/coffee_list';
import coffeeLocation from './components/CoffeeLocationScreen/coffee_location';
import ReviewPost from './components/AddReviewScreen/add_Review_Page';
import UserReviewList from './components/UserReviewScreen/users_reviews';
import ReviewUpdate from './components/UpdateReviewScreen/UserUpdateReview';
import filter from './components/SearchScreen/search_page';
import SearchResults from './components/SearchScreen/search_results';


const Stack = createStackNavigator();

const MainStackNav = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Landing} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="AccountUpdate" component={AccountUpdate} />
        </Stack.Navigator>
    )
};

const CoffeeStackNav = () => {
    return(
    <Stack.Navigator>
        <Stack.Screen name="CoffeeList" component={CoffeeList} />
        <Stack.Screen name="Search" component={filter}/>
        <Stack.Screen name="Search Results" component={SearchResults}/>
        <Stack.Screen name="CoffeeLocation" component={coffeeLocation} />
        <Stack.Screen name="AddReview" component={ReviewPost} />
        <Stack.Screen name="UsersReviews" component={UserReviewList} />
        <Stack.Screen name="Update User Review" component={ReviewUpdate} />
    </Stack.Navigator>
    )
};

export {MainStackNav, CoffeeStackNav}