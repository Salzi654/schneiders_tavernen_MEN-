/* =====================================================
   Schneiders Taverne & Bar
   admin.js
===================================================== */


import { db } from "./firebase.js";


import {

    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc

} from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";



/* ==========================
   Elemente
========================== */


const productName =
document.getElementById("productName");


const productPrice =
document.getElementById("productPrice");


const productCategory =
document.getElementById("productCategory");


const addButton =
document.getElementById("addProduct");


const productList =
document.getElementById("productList");



const itemCount =
document.getElementById("itemCount");





/* ==========================
   Produkt hinzufügen
========================== */


if(addButton){


addButton.addEventListener("click", async ()=>{


    const name =
    productName.value;


    const price =
    productPrice.value;


    const category =
    productCategory.value;



    if(!name || !price){

        alert("Bitte Name und Preis eingeben");

        return;

    }



    await addDoc(

        collection(db,"products"),

        {

            name:name,

            price:Number(price),

            category:category

        }

    );



    productName.value="";

    productPrice.value="";



    loadProducts();



});

}



/* ==========================
   Produkte laden
========================== */


async function loadProducts(){


    if(!productList) return;



    productList.innerHTML="";



    const snapshot =
    await getDocs(
        collection(db,"products")
    );



    let count=0;



    snapshot.forEach((data)=>{


        count++;


        const product =
        data.data();



        const id =
        data.id;



        const div =
        document.createElement("div");



        div.className="product";



        div.innerHTML=`

            <div>

                <strong>${product.name}</strong>

                <br>

                <span>
                ${product.category}
                </span>

                <br>

                ${product.price.toFixed(2)} €

            </div>


            <button onclick="deleteProduct('${id}')">

                Löschen

            </button>

        `;



        productList.appendChild(div);



    });



    if(itemCount){

        itemCount.innerHTML=count;

    }



}




/* ==========================
   Produkt löschen
========================== */


window.deleteProduct = async function(id){


    const confirmDelete =
    confirm(
        "Produkt wirklich löschen?"
    );


    if(!confirmDelete)
        return;



    await deleteDoc(

        doc(
            db,
            "products",
            id
        )

    );



    loadProducts();



};




/* ==========================
   Start
========================== */


loadProducts();
