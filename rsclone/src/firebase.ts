import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyBEptbyAP4Gm5o8AtKfZ_CcooTKvlHOy2Y",
  authDomain: "rsclone-development.firebaseapp.com",
  projectId: "rsclone-development",
  storageBucket: "rsclone-development.appspot.com",
  messagingSenderId: "403906730125",
  appId: "1:403906730125:web:450a212e325b2e79b06ac4"
})

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app