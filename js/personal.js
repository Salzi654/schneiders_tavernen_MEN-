import { db } from "./firebase.js";


import {

collection,
getDocs

} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";



const tablesContainer =
document.getElementById("tablesContainer");



let tables = [];



// Tische laden

loadTables();




async function loadTables(){


    tablesContainer.innerHTML =
    "<p>Tische werden geladen...</p>";



    const snapshot =
    await getDocs(
        collection(db,"tables")
    );



    tables = [];



    snapshot.forEach((item)=>{


        tables.push({

            id:item.id,

            ...item.data()

        });


    });



    showTables();


}




function showTables(){


    tablesContainer.innerHTML="";



    if(tables.length === 0){


        tablesContainer.innerHTML =
        "<p>Keine Tische vorhanden</p>";


        return;

    }



    tables.forEach(table=>{


        const div =
        document.createElement("div");



        div.className =
        "personalTable";



        div.innerHTML = `

        <h3>
        ${table.name}
        </h3>


        <p>
        🪑 ${table.seats} Plätze
        </p>


        <p class="status">

        ${getStatus(table.status)}

        </p>

        `;



        div.onclick = ()=>{


            openTable(table.id);


        };



        tablesContainer.appendChild(div);



    });



}





function getStatus(status){


    if(status==="frei"){

        return "🟢 Frei";

    }


    if(status==="reserviert"){

        return "🟡 Reserviert";

    }


    if(status==="belegt"){

        return "🔴 Belegt";

    }


    if(status==="gesperrt"){

        return "⚫ Gesperrt";

    }


    return "⚪ Unbekannt";


}




function openTable(id){


    window.location.href =
    "order.html?table=" + id;


}
