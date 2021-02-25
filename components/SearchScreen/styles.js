/* eslint-disable react/jsx-filename-extension */
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },

  text: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },

  header: {
    alignContent: 'stretch',
    alignItems: 'stretch',
  },

  card: {
    // backgroundColor: '#EDF1F7',
    alignItems: 'center',
  },

  button: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000080',
    borderColor: '#000080',
  },

});
export default styles