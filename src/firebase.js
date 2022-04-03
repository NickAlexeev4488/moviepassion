import { initializeApp } from "firebase/app";
import { getFirestore, collection, serverTimestamp } from "firebase/firestore";
import config from "../firebase.config.json";

const firebaseConfig = config;

export const app = initializeApp(firebaseConfig);

export const nowstime = serverTimestamp()

export const db = getFirestore(app);

export const moviesRef = collection(db, "movies");
