import { db, auth } from "./firebase.js";

import {

createUserWithEmailAndPassword

} from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import {

collection,
getDocs,
deleteDoc,
doc,
addDoc

} from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";



const usersContainer =
document.getElementById("usersContainer");



const saveUser =
document.getElementById("saveUser");



const userEmail =
document.getElementById("userEmail");


const userRole =
document.getElementById("userRole");

const userPassword =
document.getElementById("userPassword");



let users = [];



// Start

loadUsers();




// ==========================
// Mitarbeiter laden
// ==========================


async function loadUsers(){


    usersContainer.innerHTML =
    "Mitarbeiter werden geladen...";



    const snapshot =
    await getDocs(
        collection(db,"users")
    );



    users = [];



    snapshot.forEach(item=>{


        users.push({

            id:item.id,

            ...item.data()

        });


    });



    showUsers();


}





// ==========================
// Mitarbeiter anzeigen
// ==========================


function showUsers(){


    usersContainer.innerHTML="";



    if(users.length === 0){


        usersContainer.innerHTML =
        "Keine Mitarbeiter vorhanden";


        return;


    }




    users.forEach(user=>{


        const div =
        document.createElement("div");



        div.className =
        "userCard";



        div.innerHTML = `


        <div>

        <strong>

        ${user.email}

        </strong>


        <br>


        Rolle:

        ${
            user.role === "admin"
            ?
            "👑 Admin"
            :
            "👨‍🍳 Personal"
        }


        </div>



        <button class="delete">

        🗑️ Löschen

        </button>


        `;




        div.querySelector(
            ".delete"
        ).onclick = ()=>{


            deleteUser(user.id);


        };



        usersContainer.appendChild(div);



    });



}





// ==========================
// Mitarbeiter löschen
// ==========================


async function deleteUser(id){


    const confirmDelete =
    confirm(
        "Mitarbeiter wirklich löschen?"
    );


    if(!confirmDelete){

        return;

    }



    await deleteDoc(

        doc(
            db,
            "users",
            id
        )

    );



    loadUsers();


}

saveUser.addEventListener(
"click",
async ()=>{


const email =
userEmail.value.trim();


const password =
userPassword.value.trim();


const role =
userRole.value;



if(!email || !password){

alert(
"E-Mail und Passwort eingeben!"
);

return;

}



try{


const result =
await createUserWithEmailAndPassword(

auth,

email,

password

);



await addDoc(

collection(db,"users"),

{

uid:
result.user.uid,

email:email,

role:role

}

);



alert(
"✅ Mitarbeiter erstellt!"
);



userEmail.value="";

userPassword.value="";


loadUsers();



}


catch(error){

    console.log("Firebase Fehler:", error);

    alert(
    "❌ Fehler: " + error.message
    );

}



});
