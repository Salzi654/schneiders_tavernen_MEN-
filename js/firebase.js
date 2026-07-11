/* =====================================================
   Schneiders Taverne & Bar
   Firebase Verbindung
===================================================== */


import { initializeApp } from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";


import { getAuth } from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";


import { getFirestore } from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";




// Firebase Konfiguration

const firebaseConfig = {

    apiKey: "AIzaSyDNoGirp_RbjN3LXRloU_nCfXW06ZEkThY",

    authDomain: "schneiders-taverne.firebaseapp.com",

    projectId: "schneiders-taverne",

    storageBucket: "schneiders-taverne.firebasestorage.app",

    messagingSenderId: "499080395114",

    appId: "1:499080395114:web:fcaa0c94d8fc57e0324d13"

};




// Firebase starten

const app = initializeApp(firebaseConfig);



// Login

const auth = getAuth(app);



// Datenbank

const db = getFirestore(app);



export { auth, db };
