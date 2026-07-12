/* =====================================================
   Schneiders Taverne & Bar
   auth.js
===================================================== */


import { auth } from "./firebase.js";


import {

    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut

} from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import {

doc,
getDoc

} from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";




/* ==========================
   Login
========================== */


const loginForm = document.getElementById("loginForm");



if(loginForm){


    loginForm.addEventListener("submit", async (e)=>{


        e.preventDefault();



        const email = 
        document.getElementById("username").value;



        const password = 
        document.getElementById("password").value;



        const message =
        document.getElementById("loginMessage");



        try{


            await signInWithEmailAndPassword(

                auth,

                email,

                password

            );



            message.style.color="#c89b3c";

            message.innerHTML =
            "✅ Anmeldung erfolgreich";



const user = auth.currentUser;


const userDoc = await getDoc(
    doc(db,"users",user.uid)
);



if(userDoc.exists()){


    const role =
    userDoc.data().role;



    if(role === "admin"){


        window.location.href =
        "admin.html";


    }


    else if(role === "personal"){


        window.location.href =
        "personal.html";


    }


    else{


        message.innerHTML =
        "❌ Keine Rolle vergeben";


    }


}



        }


        catch(error){



            message.style.color="red";


            message.innerHTML =
            "❌ Benutzername oder Passwort falsch";



            console.log(error);



        }



    });


}




/* ==========================
   Prüfen ob eingeloggt
========================== */


const currentPage =
window.location.pathname;



if(currentPage.includes("admin.html")){


onAuthStateChanged(auth, async (user)=>{


    if(!user){

        window.location.href="login.html";

        return;

    }



    const userData = await getDoc(

        doc(
            db,
            "users",
            user.uid
        )

    );



    if(
        !userData.exists() ||
        userData.data().role !== "admin"
    ){


        alert(
            "❌ Keine Admin-Berechtigung!"
        );


        window.location.href =
        "login.html";


    }


});


}

if(currentPage.includes("personal.html")){


onAuthStateChanged(auth, async (user)=>{


    if(!user){

        window.location.href="login.html";

        return;

    }



    const userData = await getDoc(

        doc(
            db,
            "users",
            user.uid
        )

    );



    if(
        !userData.exists() ||
        userData.data().role !== "personal"
    ){


        alert(
            "❌ Kein Personal-Zugang!"
        );


        window.location.href =
        "login.html";


    }


});


}


/* ==========================
   Logout
========================== */


const logoutButton =
document.getElementById("logout");



if(logoutButton){


    logoutButton.addEventListener("click",()=>{


        signOut(auth);


        window.location.href="login.html";


    });


}
