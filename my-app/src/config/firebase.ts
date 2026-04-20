import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBiWCZe0g_GW4jAIugXGYAIRVD0-02npfo",
  authDomain: "elifkuafor.firebaseapp.com",
  projectId: "elifkuafor",
  storageBucket: "elifkuafor.firebasestorage.app",
  messagingSenderId: "967408631444",
  appId: "1:967408631444:web:e782208ca3c126caf07e81"
};

// Tekrar initialize edilmesini engelle
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };