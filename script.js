/*
=================================
 VAPE SHOP SCRIPT
=================================
*/


// ================================
// SETTINGS
// ================================


// Сюда вставишь Telegram менеджера
// пример:
// https://t.me/username


const TELEGRAM_LINK = "https://t.me/Fluffy_Manager";



// Цена одной жижи

const PRODUCT_PRICE = 15.99;




// ================================
// PRODUCTS DATABASE
// ================================


const PRODUCTS = [


    {

        id: "vozol",

        name: "VOZOL",

        image: "/images/vozol.jpg",


        description:
        "Премиальные жижи с популярными вкусами",


        flavours: [

            "Blueberry Ice",
            "Strawberry Ice Cream",
            "Mixed Berries",
            "Grape Ice",
            "Watermelon Bubblegum",
            "Strawberry Kiwi",
            "Sour Apple Ice"

        ]

    },





    {


        id:"elfliq",


        name:"ELFLIQ",


        image:"/images/elfliq.png",


        description:
        "Жижи хорошего качества с популярными вкусами",



        flavours:[


            "Grape",

            "Raspberry Lychee",

            "Blueberry Raspberry Pomegranate",

            "Strawberry Banana",

            "Jasmine Raspberry",

            "Pineapple Colada",

            "Green Grape Rose"


        ]


    }



];





// ================================
// CART
// ================================



let cart = [];







// ================================
// HTML ELEMENTS
// ================================



const productsContainer =
document.getElementById("products");



const cartCount =
document.getElementById("cartCount");



const cartTotal =
document.getElementById("cartTotal");



const cartModal =
document.getElementById("cartModal");



const openCart =
document.getElementById("openCart");



const closeCart =
document.getElementById("closeCart");



const cartItems =
document.getElementById("cartItems");



const modalProducts =
document.getElementById("modalProducts");



const modalTotal =
document.getElementById("modalTotal");



const toast =
document.getElementById("toast");








// ================================
// CREATE PRODUCTS
// ================================



function renderProducts(){



    productsContainer.innerHTML = "";




    PRODUCTS.forEach(product => {



        const card = document.createElement("div");


        card.className = "product-card";



        card.innerHTML = `



            <img 
            class="product-image"
            src="${product.image}"
            alt="${product.name}"
            >




            <h2 class="product-name">

            ${product.name}

            </h2>





            <p class="product-description">

            ${product.description}

            </p>





            <div class="product-price">

            ${PRODUCT_PRICE.toFixed(2)}€

            </div>





            <div class="flavour-title">

            Выбери вкус

            </div>





            <div class="flavour-list">


                ${

                product.flavours.map(flavour => `


                    <div class="flavour-item">


                        <span class="flavour-name">

                        ${flavour}

                        </span>




                        <button 

                        class="add-button"

                        onclick="addToCart('${product.name}','${flavour}')"

                        >

                        +

                        </button>


                    </div>


                `).join("")

                }



            </div>



        `;




        productsContainer.appendChild(card);



    });



}






// ================================
// ADD TO CART
// ================================



function addToCart(product, flavour){



    cart.push({


        product,

        flavour,

        price: PRODUCT_PRICE


    });





    updateCart();



    showToast();



}






// ================================
// UPDATE CART
// ================================



function updateCart(){



    let total = 0;




    cart.forEach(item => {


        total += item.price;


    });





    cartCount.innerHTML =

    `${cart.length} products`;




    cartTotal.innerHTML =

    `${total.toFixed(2)}€`;




    modalProducts.innerHTML = cart.length;



    modalTotal.innerHTML =

    `${total.toFixed(2)}€`;





    renderCart();





}






// ================================
// RENDER CART ITEMS
// ================================



function renderCart(){


    cartItems.innerHTML = "";



    if(cart.length === 0){


        cartItems.innerHTML = `


        <p style="color:#aaa">

        Твоя корзина пустая!

        </p>


        `;


        return;


    }






    cart.forEach((item,index)=>{



        const element =
        document.createElement("div");



        element.className="cart-item";





        element.innerHTML = `



        <div>


        <div class="cart-item-name">

        ${item.product}

        </div>


        <div style="color:#aaa">

        ${item.flavour}

        </div>


        </div>





        <div>


        ${item.price.toFixed(2)}€


        <button 

        class="remove-item"

        onclick="removeItem(${index})"

        >

        ✕


        </button>



        </div>



        `;




        cartItems.appendChild(element);



    });



}
// ================================
// REMOVE ITEM
// ================================


function removeItem(index){


    cart.splice(index,1);



    updateCart();



}






// ================================
// CART OPEN / CLOSE
// ================================



openCart.addEventListener(
"click",
()=>{


    cartModal.classList.add("active");


});





closeCart.addEventListener(
"click",
()=>{


    cartModal.classList.remove("active");


});





// закрытие при клике вне окна


cartModal.addEventListener(
"click",
(e)=>{


    if(e.target === cartModal){


        cartModal.classList.remove("active");


    }


});







// ================================
// TELEGRAM ORDER
// ================================



document
.getElementById("telegramOrder")
.addEventListener(
"click",
()=>{



    if(cart.length === 0){


        showToast(
        "Корзина пустая!"
        );


        return;


    }






    let message =

`Привет!!
хочу купить жижу:

`;





    cart.forEach(item=>{


        message +=

        `• ${item.product} - ${item.flavour}\n`;


    });





    let total = 0;



    cart.forEach(item=>{


        total += item.price;


    });





    message +=

`

Products: ${cart.length}

Subtotal:
${total.toFixed(2)}€

Доставка:
можем обсудить здесь
`;







    const url =

    TELEGRAM_LINK +

    "?text=" +

    encodeURIComponent(message);






    window.open(
    url,
    "_blank"
    );




});









// ================================
// TOAST MESSAGE
// ================================



function showToast(text="Added to basket"){



    toast.innerHTML = text;



    toast.classList.add("show");





    setTimeout(()=>{


        toast.classList.remove("show");


    },1500);



}







// ================================
// START SHOP
// ================================



renderProducts();



updateCart();
