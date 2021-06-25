import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { KeyboardAvoidingView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../firebase'
const RegisterScreen = () =>{
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [imageUrl,setImageUrl] = useState("");
    
    const register = () =>{
        auth
        .createUserWithEmailAndPassword(email,password)
        .then(authUser =>{
            authUser.user.updateProfile({
                displayName: name,
                photoURL:
                    imageUrl ||
                    "https://lh3.googleusercontent.com/ogw/ADea4I4Q3m4I-DJN1g5bWi02NZmGLRjSfL6yN9HrNrMZ=s83-c-mo"
            })
        })
        .catch((error) => alert(error.message))
    }

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={0}
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <StatusBar styles="light"/>
            <Text h3 style={{marginBottom:50}}>
                Create a Signal account
            </Text>
            <View style={styles.inputContainer}>
            <Input 
                    placeholder="Full Name"
                    type="text"
                    value={name}
                    onChangeText={(text) =>setName(text)}
                />
                <Input 
                    placeholder="Email" 
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
                <Input 
                    placeholder="Profile Picture URL (optional)" 
                    type="text"
                    value={imageUrl}
                    onChangeText={(text) =>setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>
            <Button containerStyle={styles.button} raised onPress={register} title="Register"/>
            <View style={{height:100}} />
        </KeyboardAvoidingView>
    )
}
export default RegisterScreen

const styles = StyleSheet.create({ 
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    inputContainer: {
        width: 300,
    },
    button:{
        width: 200,
        marginTop: 10,
    }
})