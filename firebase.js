// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
import { getStorage, ref, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCmPjOJNCtMIwxDAs_NDID0kKh6mPkdPKI",
    authDomain: "task-tracker-e1fde.firebaseapp.com",
    projectId: "task-tracker-e1fde",
    storageBucket: "task-tracker-e1fde.firebasestorage.app",
    messagingSenderId: "698322659764",
    appId: "1:698322659764:web:b7b14834564640d4ee2ae1",
    measurementId: "G-TEXDGHC6KZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage();

export async function downloadText(file_path) {
    const data_ref = ref(storage, file_path);
    const data_url = await getDownloadURL(data_ref);
    const data = await fetch(data_url).then(r => r.text());
    console.log("Downloaded text!")

    return data;
}

export async function uploadText(file_path, data) {
    let data_file = new File([data], file_path, {type: "text/plain"});
    const data_ref = ref(storage, file_path);

    await uploadBytes(data_ref, data_file).then((snapshot) => {
        console.log('Uploaded text!');
    });
}

export async function downloadJSON(file_path) {
    const data_ref = ref(storage, file_path);
    const data_url = await getDownloadURL(data_ref);
    const data = await fetch(data_url).then(r => r.text());
    console.log("Downloaded JSON!")

    return JSON.parse(data);
}

export async function uploadJSON(file_path, data) {
    let data_file = new File([JSON.stringify(data, null, 2)], file_path, {type: "application/json"});
    const data_ref = ref(storage, file_path);

    await uploadBytes(data_ref, data_file).then((snapshot) => {
        console.log('Uploaded JSON!');
    });
}