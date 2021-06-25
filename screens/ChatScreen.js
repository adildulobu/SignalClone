import { AntDesign } from '@expo/vector-icons'
import React, { useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { ScrollView } from 'react-native'
import { TextInput } from 'react-native'


const ChatScreen = ({navigation, route}) =>{
    const [input, setInput] = useState("")
    useLayoutEffect(() =>{
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <Avatar rounded source={{uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"}} />
                    <Text style={{color:"white", marginLeft: 10, fontWeight: "700"}}>{route.params.chatName}</Text>
                </View>
            ),
            headerLeft: () =>(
                <TouchableOpacity
                    style={{marginLeft: 10}}
                    onPress={navigation.goBack}
                >
                    <AntDesign name="arrowleft" size={24} color="white"/>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View 
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight: 20,
                    }}
                >
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white"/>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [])
    return(
        <SafeAreaView style={{flex: 1, backgroundColor:"white"}}>
           <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding": "height"}
            style={styles.container}
            keyboardVerticalOffset={90}
           >
               <>
                 <ScrollView>

                 </ScrollView>
                 <View>
                     <TextInput
                      value={input} 
                      onChangeText={(text) =>setInput(text)}
                      placeholder="Signal Message" 
                      style={styles.textInput}
                      />
                 </View>
               </>
           </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen


const styles = StyleSheet.create({
    container: {},
    footer:{}
})