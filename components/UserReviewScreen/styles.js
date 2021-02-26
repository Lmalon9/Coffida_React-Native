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
    backgroundColor: '#000080',
    borderColor: '#000080',
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
    backgroundColor: '#000080',
    borderColor: '#000080',
  },
});

export default styles;
