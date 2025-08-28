import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyApqx0DBFMFZQ8jg3ZUNM3zsccu2TbHYIQ",
  authDomain: "hotellucky-76138.firebaseapp.com",
  projectId: "hotellucky-76138",
  storageBucket: "hotellucky-76138.firebasestorage.app",
  messagingSenderId: "121453585641",
  appId: "1:121453585641:web:2429727e7d2df63b4abc78",
  measurementId: "G-Q98C09YRGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
