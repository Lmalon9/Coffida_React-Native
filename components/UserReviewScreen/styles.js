import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  card: {
    backgroundColor: '#EDF1F7',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  button: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#151A30',
    borderColor: '#151A30',
  },
  objectContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  objectButton: {
    alignContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    justifyContent: 'center',
    borderColor: '#151A30',
  },
});

export default styles;
