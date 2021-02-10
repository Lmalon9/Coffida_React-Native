import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Card, Text, Button, Layout, Icon } from '@ui-kitten/components';
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

function NotLoggedIn(){
    const navigation = useNavigation()
    //const [id, setId] = useState('')

    const PersonIcon = (props) => (
        <Icon {...props} name='person-outline'/>
      );

    const Footer = (props) => (
        <Layout {...props} style={[props.style, styles.footerContainer]}>
        <TouchableOpacity >
        <Button  style={styles.button}
        size = 'small'
        accessoryLeft={PersonIcon}
        onPress={() => navigation.navigate("Login")}
        >
        Login
        </Button>
        </TouchableOpacity>
        </Layout>
    )

    return(
        <Layout style={styles.Container} >
            <Card style={styles.flexbox} footer = {Footer}>
            <Text style={styles.titleText} category='h1'>
            Welcome To Coffida
            </Text>
            </Card>
        </Layout>
    )
}

// const styles = StyleSheet.create({

//     footerContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//       },
    
//     Container:{
//         flex: 1,
//         flexDirection: 'column',
//         //height: 100, 
//         alignItems: 'center',
//         justifyContent: 'center',
        

//     },
//     flexbox:{
//         height: 150, 
//         borderRadius: 10,
//     },
//     titleText: {
//         textAlign: 'center',
//     },
//     button:{
//         //alignContent: 'center',
//         alignItems: 'center',
//         justifyContent: 'center'

//     },


// })

export default NotLoggedIn