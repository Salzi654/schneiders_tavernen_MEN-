/* =====================================================
   Schneiders Taverne & Bar
   Firebase Verbindung
===================================================== */


/*
    HIER SPÄTER DEINE FIREBASE DATEN EINFÜGEN

    Firebase Console:
    https://console.firebase.google.com/

    Projekt erstellen
    → Web-App hinzufügen
    → Config kopieren
*/


import { initializeApp } from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";


import { getAuth } from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";


import { getFirestore } from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";




// Deine Firebase Konfiguration

const firebaseConfig = {


    apiKey: "DEIN_API_KEY",


    authDomain: "DEIN_PROJEKT.firebaseapp.com",


    projectId: "DEIN_PROJEKT_ID",


    storageBucket: "DEIN_PROJEKT.firebasestorage.app",


    messagingSenderId: "DEINE_SENDER_ID",


    appId: "DEINE_APP_ID"


};



// Firebase starten

const app = initializeApp(firebaseConfig);



// Login System

const auth = getAuth(app);



// Datenbank

const db = getFirestore(app);



export { auth, db };
