// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "mern-blog-9a426.firebaseapp.com",
	projectId: "mern-blog-9a426",
	storageBucket: "mern-blog-9a426.appspot.com",
	messagingSenderId: "326680177369",
	appId: "1:326680177369:web:b9d007157107af5108acc8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
