import firebase from "firebase/app";
import "firebase/firestore";

// Get a Firestore instance

const firebaseConfig = {
  apiKey: "AIzaSyACipLSg8oA9Hrj-1Px-D4XlpajvgwMJ6Y",
  authDomain: "vue-fire-todo-ff0b8.firebaseapp.com",
  projectId: "vue-fire-todo-ff0b8",
  storageBucket: "vue-fire-todo-ff0b8.appspot.com",
  messagingSenderId: "330879785516",
  appId: "1:330879785516:web:79f97d9c57b2396d850f89"
};

export const db = firebase.initializeApp(firebaseConfig).firestore();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };
