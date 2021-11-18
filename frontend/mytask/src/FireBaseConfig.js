import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from "./firebaseconfig";

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export { provider, auth };
