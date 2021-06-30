import React, {useEffect, useState}from 'react'
import { Platform,StyleSheet,Text, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { KeyboardAvoidingView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../firebasee'
const LoginScreen = ({ navigation }) =>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged((authUser) =>{
            console.log(authUser)
            if(authUser){
                navigation.replace("Home")
            }
        });

        return unsubscribe;

    }, []);

    const signIn = () =>{
        auth.signInWithEmailAndPassword(email,password)
        .catch((error) => alert(error))
    }

    return (
        <KeyboardAvoidingView 
            keyboardVerticalOffset={0}
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <StatusBar styles="light"/>
            <Image source={{
                uri:
                    "https://upload.wikimedia.org/wikipedia/commons/4/4f/Signal_Blue_Icon.png",
            }}
            style={{width:145, height:145, borderRadius:10,marginBottom:15}}
            />
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Email" 
                    autoFocus 
                    type="email"
                    value={email}
                    onChangeText={(text) =>setEmail(text)}
                />
                <Input 
                    placeholder="Password" 
                    secureTextEntry 
                    type="password"
                    value={password}
                    onChangeText={(text) =>setPassword(text)}
                />
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="Login"/>
            <Button
             onPress={() => navigation.navigate("Register")}
             containerStyle={styles.button} type="outline" title="Register"/>
            <View style={{ height:100 }} />
        </KeyboardAvoidingView>
    )
}
export default LoginScreen

const styles = StyleSheet.create({ 
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: "white"
    },
    inputContainer: {
        width: 300,
    },
    button:{
        width: 200,
        marginTop: 7,
    }
})