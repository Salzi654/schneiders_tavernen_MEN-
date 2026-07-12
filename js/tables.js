import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const tableName = document.getElementById("tableName");
const tableSeats = document.getElementById("tableSeats");
const tableDescription = document.getElementById("tableDescription");
const tableStatus = document.getElementById("tableStatus");
const saveTable = document.getElementById("saveTable");
const tablesContainer = document.getElementById("tablesContainer");

let editID = null;
let tables = [];

loadTables();

async function loadTables(){

    tablesContainer.innerHTML = "<p>Tische werden geladen...</p>";

    const q = query(
        collection(db, "tables"),
        orderBy("order")
    );

    const snapshot = await getDocs(q);

    tables = [];

    snapshot.forEach((docItem)=>{

        tables.push({
            id: docItem.id,
            ...docItem.data()
        });

    });

    renderTables();

}

function renderTables(){

    tablesContainer.innerHTML = "";

    if(tables.length === 0){

        tablesContainer.innerHTML =
        "<p>Noch keine Tische vorhanden.</p>";

        return;
    }

    tables.forEach(table=>{

        tablesContainer.innerHTML += `

<div class="tableCard">

<div class="tableInfo">

<h3>${table.name}</h3>

<p>🪑 Plätze: ${table.seats}</p>

<p>${table.description || ""}</p>

<p class="status">

${statusEmoji(table.status)}
${table.status}

</p>

</div>

<div class="tableButtons">

<button
class="editBtn"
onclick="editTable('${table.id}')">

✏️ Bearbeiten

</button>

<button
class="deleteBtn"
onclick="deleteTable('${table.id}')">

🗑️ Löschen

</button>

</div>

</div>

`;

    });

}

// ==========================
// Status Emoji
// ==========================

function statusEmoji(status){

    if(status === "frei"){
        return "🟢";
    }

    if(status === "reserviert"){
        return "🟡";
    }

    if(status === "belegt"){
        return "🔴";
    }

    if(status === "gesperrt"){
        return "⚫";
    }

    return "⚪";

}



// ==========================
// Tisch speichern
// ==========================

saveTable.addEventListener("click", async ()=>{


    const name =
    tableName.value.trim();


    const seats =
    Number(tableSeats.value);


    const description =
    tableDescription.value.trim();


    const status =
    tableStatus.value;



    if(!name || !seats){

        alert(
            "Bitte Tischname und Plätze eingeben!"
        );

        return;

    }



    try{


        // Neuer Tisch

        if(editID === null){


            await addDoc(

                collection(db,"tables"),

                {

                    name:name,

                    seats:seats,

                    description:description,

                    status:status,

                    order:tables.length + 1

                }

            );


        }



        // Tisch bearbeiten

        else{


            await updateDoc(

                doc(
                    db,
                    "tables",
                    editID
                ),

                {

                    name:name,

                    seats:seats,

                    description:description,

                    status:status

                }

            );


            editID = null;


            saveTable.innerHTML =
            "💾 Tisch speichern";


        }



        clearForm();


        loadTables();



    }

    catch(error){

        console.error(error);

        alert(
            "Fehler beim Speichern!"
        );

    }


});




// ==========================
// Formular leeren
// ==========================

function clearForm(){


    tableName.value = "";

    tableSeats.value = "";

    tableDescription.value = "";

    tableStatus.value = "frei";


}

// ==========================
// Tisch bearbeiten
// ==========================

window.editTable = function(id){


    const table =
    tables.find(
        t => t.id === id
    );


    if(!table){

        return;

    }


    tableName.value =
    table.name;


    tableSeats.value =
    table.seats;


    tableDescription.value =
    table.description || "";


    tableStatus.value =
    table.status;


    editID = id;


    saveTable.innerHTML =
    "✏️ Änderungen speichern";


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });


};




// ==========================
// Tisch löschen
// ==========================

window.deleteTable = async function(id){


    const confirmDelete =
    confirm(
        "Möchtest du diesen Tisch wirklich löschen?"
    );


    if(!confirmDelete){

        return;

    }



    try{


        await deleteDoc(

            doc(
                db,
                "tables",
                id
            )

        );


        loadTables();


    }

    catch(error){


        console.error(error);


        alert(
            "Fehler beim Löschen!"
        );


    }


};
