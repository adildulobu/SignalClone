import React, {useEffect, useLayoutEffect, useState} from 'react'
import { StyleSheet ,SafeAreaView,ScrollView, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { StatusBar } from 'expo-status-bar'
import { auth, db } from '../firebase'
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons'


const HomeScreen = ({navigation}) =>{
    const  [chats, setChats] = useState([])



   const signOutUser = () => {
       auth.signOut().then(()=>{
           navigation.replace("Login")
       })
   }



   useEffect(() =>{
        const unsubscribe = db.collection('chats').onSnapshot(snapshot =>(
            setChats(snapshot.docs.map(doc =>({
                id: doc.id,
                data: doc.data()
            })))
         )
        );
        return unsubscribe
   },[])

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: "Signal",
            headerStyle: {backgroundColor:"#fff"},
            headerTitleStyle: {color:"black"},
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{marginLeft:20}}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Avatar onPress={signOutUser} rounded source={{uri: auth?.currentUser?.photoURL}}/>
                    </TouchableOpacity>
                    
                </View>
            ),
            headerRight: () =>(
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>{navigation.navigate("AddChat")}} activeOpacity={0.5}>
                        <SimpleLineIcons name="pencil" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
            )
        });
    },[navigation]);

    return (
        <SafeAreaView>
            <StatusBar styles="light"/>
            <ScrollView style={styles.container}>
                {chats.map(({id, data:{chatName}}) =>(
                    <CustomListItem key={id} id={id} chatName={chatName}/>
                ))}
            </ScrollView>
        </SafeAreaView>
               
    )
}
export default HomeScreen

const styles = StyleSheet.create({ 
   container: {
       height:"100%"
   }
})