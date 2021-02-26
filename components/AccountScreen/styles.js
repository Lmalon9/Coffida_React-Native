import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  Container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#C0C0C0',
  },

  flexbox: {
    height: 250,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },

  footerContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },

  headerContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 15,
    textAlign: 'left',
    marginTop: 10,
  },

  button: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
    backgroundColor: '#000080',
    borderColor: '#000080',
  },
});
export default styles;
