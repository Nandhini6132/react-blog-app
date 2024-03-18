
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBukgUtMh4HCE39gV9OtnVUhdSxCgEY-bE",
  authDomain: "react-blog-3db09.firebaseapp.com",
  projectId: "react-blog-3db09",
  storageBucket: "react-blog-3db09.appspot.com",
  messagingSenderId: "433810731111",
  appId: "1:433810731111:web:79135416111f084a9c64c2"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export {auth,db,storage}