// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBy4o5P_r0dl4L-HFdL3Jj49140tKUztk0",
  authDomain: "tabletalk-restaurant-edf5e.firebaseapp.com",
  projectId: "tabletalk-restaurant-edf5e",
  storageBucket: "tabletalk-restaurant-edf5e.firebasestorage.app",
  messagingSenderId: "323187505408",
  appId: "1:323187505408:web:0a661e6bf4e6bb3aef9be5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;