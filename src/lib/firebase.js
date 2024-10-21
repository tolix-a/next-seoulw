// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyD5MMSijixwcBS2em_vLcJA_r842vEJgyw",
  authDomain: "seoulw-a996e.firebaseapp.com",
  projectId: "seoulw-a996e",
  storageBucket: "seoulw-a996e.appspot.com",
  messagingSenderId: "445591651444",
  appId: "1:445591651444:web:b74489d17a63fdc4327d21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
