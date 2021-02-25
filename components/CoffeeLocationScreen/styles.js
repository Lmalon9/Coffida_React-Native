import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },

  button: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000080',
    borderColor: '#000080',
  },

  buttonLike: {
    alignContent: 'center',
    alignItems: 'center',
    width: 50,
    justifyContent: 'center',
    color: '#000080',
    flexDirection: 'column'
    // backgroundColor: '#151A30',
    // borderColor: '#151A30',
  },
});

export default styles;
