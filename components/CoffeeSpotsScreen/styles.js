import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
        container: {
          flexDirection: 'column',

        },
        card:{
          //backgroundColor: '#EDF1F7',
          alignItems: 'center',

        },
        text: {
          fontSize: 30,
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: 10,
        },
        button:{
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#151A30',
          borderColor: '#151A30',
        },
        buttonFav:{
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center'
        },

        header:{
            alignContent: 'stretch',
            alignItems: 'stretch'
          },
});

export default styles