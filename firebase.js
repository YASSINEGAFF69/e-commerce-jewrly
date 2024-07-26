// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5ORY-tJuXzplDb9Nf6f1sum5o8Ozto0k",
  authDomain: "khitandbeads.firebaseapp.com",
  projectId: "khitandbeads",
  storageBucket: "khitandbeads.appspot.com",
  messagingSenderId: "465276583609",
  appId: "1:465276583609:web:0a904cfffab15735f7a568",
  measurementId: "G-VT9TQWNYVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, serverTimestamp };
