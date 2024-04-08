// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getReactNativePersistence , initializeAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from "@react-native-async-storage/async-storage";
// Your web app's Firebase configuration
import {getFirestore,collection} from 'firebase/firestore'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVmwh9-SfISYiyct-sU3tif8zLGbjrW3c",
  authDomain: "expendigo-9f2fc.firebaseapp.com",
  projectId: "expendigo-9f2fc",
  storageBucket: "expendigo-9f2fc.appspot.com",
  messagingSenderId: "1026880365458",
  appId: "1:1026880365458:web:82b07f167c21c04eb9974b",
  measurementId: "G-18KKZ03WK9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{
    persistence : getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)

export const userRef = collection(db,"users")

export const tripsRef = collection(db, "trips")
export const expensesRef = collection(db, "expenses") 
