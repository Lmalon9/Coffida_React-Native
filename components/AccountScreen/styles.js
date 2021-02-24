import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({

    Container:{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: '#F7F9FC',
  },

  flexbox:{
    height: 250, 
    borderRadius: 10,
    backgroundColor: '#EDF1F7',
    borderColor: '#1A2138',
    //alignContent: 'center',
    //justifyContent: 'center',
    //alignItems: 'center'
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

    button:{
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 1,
      backgroundColor: '#151A30',
      borderColor: '#151A30',

  },

  });

  export default styles