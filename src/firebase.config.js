import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBmPeyBnaA53DeYc40mKaitTA1DIMNNSfw",
  authDomain: "house-marketplace-app-110.firebaseapp.com",
  projectId: "house-marketplace-app-110",
  storageBucket: "house-marketplace-app-110.appspot.com",
  messagingSenderId: "388700328966",
  appId: "1:388700328966:web:f5dc60f0e6463358ec1f87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()