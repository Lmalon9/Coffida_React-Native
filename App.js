import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import { Text, View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, NativeModules, StatusBar, FlatList, SafeAreaView} from 'react-native';

export default function App() {
  return (
    <NavigationContainer>{
      <Button
        title = 'Login'
      />
      }</NavigationContainer>
  );
}
