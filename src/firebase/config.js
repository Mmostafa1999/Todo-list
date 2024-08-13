
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth   } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAvO3GRQY71M729CjEFzhVf2CmDgyAjHk",
  authDomain: "react2-69c8b.firebaseapp.com",
  projectId: "react2-69c8b",
  storageBucket: "react2-69c8b.appspot.com",
  messagingSenderId: "457036389309",
  appId: "1:457036389309:web:9c40c2faf52431b32dd0d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
