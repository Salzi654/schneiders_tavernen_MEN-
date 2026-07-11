/* =====================================================
   Schneiders Taverne & Bar
   menu.js
===================================================== */


import { db } from "./firebase.js";


import {

    collection,
    getDocs

} from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";



const menuContainer = 
document.getElementById("firebaseMenu");



async function loadMenu(){


    if(!menuContainer){

        return;

    }



    try{


        const snapshot = await getDocs(

            collection(db,"products")

        );



        menuContainer.innerHTML = "";



        let categories = {};



        snapshot.forEach((doc)=>{


            const product = doc.data();



            if(!categories[product.category]){


                categories[product.category] = [];

            }



            categories[product.category].push(product);



        });





        Object.keys(categories).forEach((category)=>{


            const box = document.createElement("details");


            box.className="category";



            box.innerHTML = `

                <summary>

                    ${category}

                </summary>


                <div class="category-items">


                </div>

            `;



            const items =
            box.querySelector(".category-items");



            categories[category].forEach((product)=>{


                const item =
                document.createElement("div");



                item.className="item";



                item.innerHTML = `

                    <span>

                        ${product.name}

                    </span>


                    <span>

                        ${Number(product.price).toFixed(2)} €

                    </span>

                `;



                items.appendChild(item);


            });



            menuContainer.appendChild(box);



        });



    }


    catch(error){


        console.error(error);


        menuContainer.innerHTML =

        "❌ Fehler beim Laden der Speisekarte";


    }



}



loadMenu();
