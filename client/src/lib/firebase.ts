import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

<<<<<<< HEAD
const firebaseConfig = {
  apiKey: "AIzaSyApqx0DBFMFZQ8jg3ZUNM3zsccu2TbHYIQ",
  authDomain: "hotellucky-76138.firebaseapp.com",
  projectId: "hotellucky-76138",
  storageBucket: "hotellucky-76138.firebasestorage.app",
  messagingSenderId: "121453585641",
  appId: "1:121453585641:web:2429727e7d2df63b4abc78",
  measurementId: "G-Q98C09YRGY"
};
=======
  const firebaseConfig = {
    apiKey: "AIzaSyApqx0DBFMFZQ8jg3ZUNM3zsccu2TbHYIQ",
    authDomain: "hotellucky-76138.firebaseapp.com",
    projectId: "hotellucky-76138",
    storageBucket: "hotellucky-76138.firebasestorage.app",
    messagingSenderId: "121453585641",
    appId: "1:121453585641:web:2429727e7d2df63b4abc78",
    measurementId: "G-Q98C09YRGY"
  };
>>>>>>> 2e777d9d170a5f3181f7ae245401638afafd4a52

// Initialize Firebase
let firebaseApp;
try {
  firebaseApp = initializeApp(firebaseConfig);
} catch (error) {
  console.error("Error initializing Firebase:", error);
  throw error;
}

// Initialize Firebase services
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export const app = firebaseApp;
