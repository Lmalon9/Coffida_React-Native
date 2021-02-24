import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Card, Text, Button, Layout } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './styles'


function LoggedIn({ id }){
    const navigation = useNavigation()
    //const [id, setId] = useState('')

    const Footer = (props) => (
        <Layout {...props} style={[props.style, styles.footerContainer]}>
        <Button style={styles.button} 
        size = 'small' 
        onPress={() => navigation.navigate("Account", {userId: id})}>
        Account
        </Button>
        </Layout>
    )

    return(
        <Layout style={styles.Container}>
            <Card style={styles.flexbox} footer = {Footer}>
            <Text style={styles.titleText} category='h1' >
            Welcome To Coffida
            </Text>
            </Card>
        </Layout>
    )
}


export default LoggedIn