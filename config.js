// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyBBZgdxZfyQFkFFOqo6rJDgmBAIOKHMLfY',
  authDomain: 'rn-expo-project-72745.firebaseapp.com',
  databaseURL: 'https://rn-expo-project-72745.firebaseio.com',
  projectId: 'rn-expo-project-72745',
  storageBucket: 'rn-expo-project-72745.appspot.com',
  messagingSenderId: 'sender-id',
  appId: '1:460114632246:android:23f855d9924ff7226bc297',
  measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);