import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {getFirestore, collection, query, where, getDocs} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyATNuEh4aiAWSbIcxIMqKgUm6ncC8mstQo",
    authDomain: "car-service-management-a95d4.firebaseapp.com",
    projectId: "car-service-management-a95d4",
    storageBucket: "car-service-management-a95d4.appspot.com",
    messagingSenderId: "666879569089",
    appId: "1:666879569089:web:d2e061e8b7f8f080ed7840",
    measurementId: "G-YXP69GT4B9"
};

// Initialize Firebase
const app = firebase.default.initializeApp(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);

const auth = app.auth();
//const auth = getAuth(firebaseApp);
// const db = app.firestore();
const db = getFirestore(firebaseApp);
const googleProvider = new firebase.default.auth.GoogleAuthProvider();

export default app;
const signInWithGoogle = async () => {
    try {
        const res = await auth.signInWithPopup(googleProvider);
        const user = res.user;
        const query = await db
        .collection("users")
            .where("uid", "==", user.uid)
            .get();
        if(query.docs.length === 0) {
            await db.collection("users").add({
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
};

const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        await db.collection("users").add({
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
};

const sendPasswordResetEmail = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
        alert("Password reset link sent!");
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
};

const logOut = () => {
    auth.signOut();
};

export {
    auth,
    db,
    signInWithGoogle,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logOut
};