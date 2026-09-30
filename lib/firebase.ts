import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDznRowMlKbcrdAc27aUSMkzOHNbzFVIo0",
  authDomain: "futaiq.firebaseapp.com",
  projectId: "futaiq",
  storageBucket: "futaiq.firebasestorage.app",
  messagingSenderId: "1077594479160",
  appId: "1:1077594479160:web:5036d61df9081798cae4cd"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
