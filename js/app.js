/* =====================================================
   Schneiders Taverne & Bar
   app.js
===================================================== */


/* ==========================
   Mobile Navigation
========================== */


const menuButton = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");


if(menuButton){

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}



/* ==========================
   Speisekarten Suche
========================== */


const searchInput = document.getElementById("searchInput");


if(searchInput){

    searchInput.addEventListener("keyup", function(){

        let searchText = this.value.toLowerCase();


        const items = document.querySelectorAll(
            ".category .item"
        );


        items.forEach(item => {


            let text = item.textContent.toLowerCase();


            if(text.includes(searchText)){

                item.style.display="flex";

            }

            else{

                item.style.display="none";

            }


        });


    });

}



/* ==========================
   Smooth Scroll
========================== */


document.querySelectorAll('a[href^="#"]')
.forEach(link => {


    link.addEventListener("click", function(e){


        let target =
        document.querySelector(
            this.getAttribute("href")
        );


        if(target){


            e.preventDefault();


            target.scrollIntoView({

                behavior:"smooth"

            });


        }


    });


});



/* ==========================
   Animation beim Laden
========================== */


window.addEventListener("load",()=>{


    document.body.classList.add("loaded");


});
