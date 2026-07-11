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



            setTimeout(()=>{


                window.location.href="admin.html";


            },1000);



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


    onAuthStateChanged(auth,(user)=>{


        if(!user){


            window.location.href="login.html";


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
