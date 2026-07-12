/* =====================================================
   Schneiders Taverne & Bar
   Admin Dashboard
   admin.js
===================================================== */


import { db } from "./firebase.js";

console.log("Admin gestartet");

import {

    collection,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    doc

} from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";



/* ==========================
   Elemente
========================== */



const nameInput =
document.getElementById("productName");


const priceInput =
document.getElementById("productPrice");

const sizeInput =
document.getElementById("productSize");

const categoryInput =
document.getElementById("productCategory");


const saveButton =
document.getElementById("saveProduct");


const productsContainer =
document.getElementById("productsContainer");


const searchInput =
document.getElementById("searchProduct");



const itemCount =
document.getElementById("itemCount");


const categoryCount =
document.getElementById("categoryCount");



let editID = null;



let allProducts = [];



/* ==========================
   Produkte laden
========================== */


async function loadProducts(){


    productsContainer.innerHTML =
    "Produkte werden geladen...";



    const snapshot = await getDocs(

        collection(db,"products")

    );



    allProducts = [];



    snapshot.forEach((item)=>{


        allProducts.push({

            id:item.id,

            ...item.data()

        });


    });



    updateStats();


    displayProducts(allProducts);


}




/* ==========================
   Anzeigen
========================== */


function displayProducts(products){


    productsContainer.innerHTML="";



    let categories = {};



    products.forEach(product=>{


        if(!categories[product.category]){


            categories[product.category]=[];

        }


        categories[product.category].push(product);



    });



    Object.keys(categories).forEach(category=>{


        const categoryBox =
        document.createElement("div");


        categoryBox.className =
        "category-box";



        categoryBox.innerHTML = `

            <div class="category-title">

                ${category}

            </div>


            <div class="category-products">

            </div>

        `;



        const list =
        categoryBox.querySelector(
            ".category-products"
        );



        categories[category].forEach(product=>{


            const item =
            document.createElement("div");


            item.className =
            "product-item";



            item.innerHTML = `

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <span>

                    ${Number(product.price).toFixed(2)} €

                    </span>

                </div>


                <div class="product-actions">


                    <button 
                    class="edit-btn"
                    onclick="editProduct('${product.id}')">

                    ✏️ Bearbeiten

                    </button>


                    <button
                    class="delete-btn"
                    onclick="deleteProduct('${product.id}')">

                    🗑️ Löschen

                    </button>


                </div>

            `;



            list.appendChild(item);


        });



        productsContainer.appendChild(categoryBox);



    });


}

/* ==========================
   Produkt speichern
========================== */


saveButton.addEventListener("click", async ()=>{


    const name =
    nameInput.value.trim();


    const price =
    Number(priceInput.value);


    const category =
    categoryInput.value;

   const size =
   sizeInput.value.trim();



    if(!name || !price){


        alert(
            "Bitte Name und Preis eingeben!"
        );


        return;

    }



    try{


        // Neues Produkt

        if(editID === null){


           await addDoc(

    collection(db,"products"),

    {

        name:name,

        price:price,

        category:category,

        size:size

    }

);


        }


        // Produkt bearbeiten

        else{


            await updateDoc(

                doc(
                    db,
                    "products",
                    editID
                ),

                {

                    name:name,

                    price:price,

                    category:category

                }

            );



            editID=null;


            saveButton.innerHTML =
            "💾 Produkt speichern";


        }




        nameInput.value="";

        priceInput.value="";



        loadProducts();



    }


    catch(error){


        console.error(error);


        alert(
            "Fehler beim Speichern!"
        );


    }



});





/* ==========================
   Produkt löschen
========================== */


window.deleteProduct = async function(id){


    if(!confirm(
        "Möchtest du dieses Produkt löschen?"
    )){


        return;

    }



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
   Produkt bearbeiten
========================== */


window.editProduct = function(id){


    const product =
    allProducts.find(
        item=>item.id===id
    );



    if(!product){

        return;

    }



    nameInput.value =
    product.name;



    priceInput.value =
    product.price;



    categoryInput.value =
    product.category;



    editID=id;



    saveButton.innerHTML =
    "✏️ Änderungen speichern";



    window.scrollTo({

        top:0,

        behavior:"smooth"

    });


};





/* ==========================
   Suche
========================== */


searchInput.addEventListener(
"input",
()=>{


    const search =
    searchInput.value.toLowerCase();



    const filtered =
    allProducts.filter(product=>{


        return (

            product.name
            .toLowerCase()
            .includes(search)

            ||

            product.category
            .toLowerCase()
            .includes(search)

        );


    });



    displayProducts(filtered);



});





/* ==========================
   Statistik
========================== */


function updateStats(){


    if(itemCount){


        itemCount.innerHTML =
        allProducts.length;


    }



    if(categoryCount){


        const categories =
        new Set();


        allProducts.forEach(product=>{


            categories.add(
                product.category
            );


        });



        categoryCount.innerHTML =
        categories.size;


    }


}





/* ==========================
   Start
========================== */


loadProducts();
