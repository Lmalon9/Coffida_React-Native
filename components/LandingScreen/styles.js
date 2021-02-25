import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  Container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F9FC',
  },
  flexbox: {
    height: 150,
    borderRadius: 10,
    backgroundColor: '#EDF1F7',
    borderColor: '#1A2138',
  },
  titleText: {
    textAlign: 'center',
  },

  button: {
    // alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
    backgroundColor: '#000080',
    borderColor: '#000080',
  },
});

export default styles;
