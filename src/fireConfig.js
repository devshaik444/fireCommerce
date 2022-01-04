//firebase configuration and we gonna use only Firestore and Fireauthentication
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwD_XRqJwBezLQbfFsvIMOnXbbc92cg4c",
  authDomain: "firecommerce-c357a.firebaseapp.com",
  projectId: "firecommerce-c357a",
  storageBucket: "firecommerce-c357a.appspot.com",
  messagingSenderId: "890437470912",
  appId: "1:890437470912:web:5d8ef5fc72d95e39cc3b25",
  measurementId: "G-9NKXZ4JYQZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB=getFirestore(app)

export default fireDB;
