import { db } from "./firebase.js";


import {

collection,
getDocs,
addDoc,
doc,
getDoc,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";



// ==========================
// Variablen
// ==========================


const productsContainer =
document.getElementById("productsContainer");


const cartContainer =
document.getElementById("cartContainer");


const totalElement =
document.getElementById("total");


const tableTitle =
document.getElementById("tableTitle");


const saveOrderButton =
document.getElementById("saveOrder");



let products = [];

let cart = [];

let tableID = null;



// Tisch aus URL holen

const params =
new URLSearchParams(
    window.location.search
);


tableID =
params.get("table");




// Start

loadTable();

loadProducts();

// ==========================
// Tisch laden
// ==========================


async function loadTable(){


    if(!tableID){

        tableTitle.innerHTML =
        "Kein Tisch ausgewählt";

        return;

    }



    const tableRef =
    doc(
        db,
        "tables",
        tableID
    );


    const snapshot =
    await getDoc(tableRef);



    if(snapshot.exists()){


        const table =
        snapshot.data();



        tableTitle.innerHTML =
        "🍽️ " + table.name;


    }


}

// ==========================
// Produkte laden
// ==========================


async function loadProducts(){


    productsContainer.innerHTML =
    "Produkte werden geladen...";



    const snapshot =
    await getDocs(
        collection(db,"products")
    );



    products = [];



    snapshot.forEach((item)=>{


        products.push({

            id:item.id,

            ...item.data()

        });


    });



    showProducts();


}

// ==========================
// Produkte anzeigen
// ==========================


function showProducts(){


    productsContainer.innerHTML = "";



    let categories = {};



    products.forEach(product=>{


        if(product.available === false){

            return;

        }



        if(!categories[product.category]){


            categories[product.category] = [];

        }



        categories[product.category].push(product);



    });




    Object.keys(categories).forEach(category=>{


        const categoryDiv =
        document.createElement("div");



        categoryDiv.innerHTML = `

            <h3>

            ${category}

            </h3>

        `;



        categories[category].forEach(product=>{


            const div =
            document.createElement("div");



            div.className =
            "productCard";



            div.innerHTML = `

            <div>


            <strong>

            ${product.name}

            </strong>


            <br>


            ${
                product.size
                ?
                "🥛 " + product.size
                :
                ""
            }


            <br>


            ${Number(product.price).toFixed(2)}
            €


            </div>


            <button
            class="addButton">

            ➕

            </button>


            `;



            div.querySelector(
                ".addButton"
            ).onclick = ()=>{


                addToCart(product);


            };



            categoryDiv.appendChild(div);



        });



        productsContainer.appendChild(
            categoryDiv
        );



    });



}

// ==========================
// Produkt hinzufügen
// ==========================


function addToCart(product){


    const existing =
    cart.find(
        item=>item.id === product.id
    );



    if(existing){


        existing.amount++;


    }

    else{


        cart.push({

            id:product.id,

            name:product.name,

            price:Number(product.price),

            size:product.size || "",

            amount:1

        });


    }



    updateCart();


}

// ==========================
// Warenkorb anzeigen
// ==========================


function updateCart(){


    cartContainer.innerHTML = "";



    let total = 0;



    if(cart.length === 0){


        cartContainer.innerHTML =
        "Noch keine Produkte ausgewählt";


        totalElement.innerHTML =
        "0.00 €";


        return;


    }



    cart.forEach(item=>{


        total +=
        item.price * item.amount;



        const div =
        document.createElement("div");



        div.className =
        "cartItem";



        div.innerHTML = `


        <div>

        ${item.amount}x 
        ${item.name}

        ${
            item.size
            ?
            "(" + item.size + ")"
            :
            ""
        }

        </div>


        <div>

        ${(item.price * item.amount).toFixed(2)}
        €

        </div>


        `;



        cartContainer.appendChild(div);



    });



    totalElement.innerHTML =
    total.toFixed(2) + " €";



}

// ==========================
// Bestellung speichern
// ==========================


saveOrderButton.addEventListener(
"click",
async ()=>{


    if(cart.length === 0){


        alert(
            "Keine Produkte ausgewählt!"
        );


        return;

    }



    let total = 0;



    cart.forEach(item=>{


        total +=
        item.price * item.amount;


    });




    try{


        // Bestellung speichern

        await addDoc(

            collection(db,"orders"),

            {

                tableID: tableID,

                items: cart,

                total: total,

                status: "offen",

                createdAt:
                serverTimestamp()

            }

        );





        // Tisch auf belegt setzen

        await updateTableStatus();





        alert(
            "✅ Bestellung gespeichert!"
        );



        cart = [];


        updateCart();



    }



    catch(error){


        console.error(error);


        alert(
            "Fehler beim Speichern!"
        );


    }



});





// ==========================
// Tisch Status ändern
// ==========================


async function updateTableStatus(){


    await updateDoc(

        doc(
            db,
            "tables",
            tableID
        ),

        {

            status:"belegt"

        }

    );


}
