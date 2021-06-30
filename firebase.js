import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBMEwrOADPPcMQTHfYNPoBwul6FSfRB8ms",
    authDomain: "signal-clone-adil.firebaseapp.com",
    projectId: "signal-clone-adil",
    storageBucket: "signal-clone-adil.appspot.com",
    messagingSenderId: "242046354902",
    appId: "1:242046354902:web:849f567b027bf228735077"
  };


let app;

if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}else{
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();


export { db,auth }; 
  