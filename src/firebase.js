import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {doc,addDoc, setDoc, collection, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
//https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyATNuEh4aiAWSbIcxIMqKgUm6ncC8mstQo",
    authDomain: "car-service-management-a95d4.firebaseapp.com",
    projectId: "car-service-management-a95d4",
    storageBucket: "car-service-management-a95d4.appspot.com",
    messagingSenderId: "666879569089",
    appId: "1:666879569089:web:d2e061e8b7f8f080ed7840",
    measurementId: "G-YXP69GT4B9"
};


const app = firebase.initializeApp(firebaseConfig);


const auth = app.auth();

const googleProvider = new firebase.default.auth.GoogleAuthProvider();


const db = getFirestore();

export default app;
const signInWithGoogle = async () => {
    try {
        const res = await auth.signInWithPopup(googleProvider);
        const user = res.user;
        const query = await db
            .collection("users")
            .where("uid", "==", user.uid)
            .get();
        if (query.docs.length === 0) {
            await db.collection("users").add({
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.log(err);
        //alert(err.message);
    }
};

const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.log(err);
        //alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        await db.collection("users").add({
            uid: user.uid,
            name: user.displayName,
            authProvider: "local",
            email: user.email,
        });
    } catch (err) {
        console.log(err);
        //alert(err.message);
    }
};

const sendPasswordResetEmail = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
        alert("Password reset link sent!");
    } catch (err) {
        console.log(err);
        //alert(err.message);
    }
};

const logOut = () => {
    auth.signOut();
};
// class TutorialDateService{
//     getAll(){
//         return db;
//     }
//     create(items){
//         return db.collection("users").add({
//             items
//         })
//     }
//     update(id, value){
//         return db.doc(id).update(value)
//     }
//     delete(id){
//         return db.doc(id).delete();
//     }
// }
// export  { app, TutorialDateService};

export {
    auth,
    db,
    signInWithGoogle,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logOut,
};