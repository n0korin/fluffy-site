/*
========================================
 VAPE SHOP
 MAIN SCRIPT
 VERSION 2.0
========================================
*/


// =====================================
// SETTINGS
// =====================================


// Ссылка Telegram менеджера
// меняешь только это

const TELEGRAM_LINK = "https://t.me/Fluffy_Manager";



// Цена одной жидкости

const PRODUCT_PRICE = 15.99;




// =====================================
// PRODUCTS DATABASE
// =====================================


const PRODUCTS = [

    {

        id: "vozol",

        name: "VOZOL",

        image: "./images/vozol-Photoroom.png",

        description:
        "Качественная жидкость 30мл/5% с насыщенным вкусом и приятным послевкусием.",


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

        id: "elfliq",

        name: "ELFLIQ",

        image: "./images/elfliq-nic-salts-30ml-Photoroom.png",

        description:
        "Популярные вкусы жидкости ELFLIQ 30мл/5% с ярким ароматом и мягким вкусом.",


        flavours: [

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




// =====================================
// CART DATA
// =====================================


let cart = [];





// =====================================
// HTML ELEMENTS
// =====================================


const productsContainer =
document.querySelector("#products");


const cartCount =
document.querySelector("#cartCount");


const cartTotal =
document.querySelector("#cartTotal");


const cartModal =
document.querySelector("#cartModal");


const cartItems =
document.querySelector("#cartItems");


const modalProducts =
document.querySelector("#modalProducts");


const modalTotal =
document.querySelector("#modalTotal");


const toast =
document.querySelector("#toast");


const openCartButton =
document.querySelector("#openCart");


const closeCartButton =
document.querySelector("#closeCart");


const telegramButton =
document.querySelector("#telegramOrder");







// =====================================
// CREATE PRODUCT CARDS
// =====================================



function renderProducts(){


    productsContainer.innerHTML = "";



    PRODUCTS.forEach(product => {



        const card =
        document.createElement("article");



        card.className =
        "product-card";




        card.innerHTML = `


        <div class="image-box">


        <img

        class="product-image"

        src="${product.image}"

        alt="${product.name}"

        >


        </div>





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

        Нажмите чтобы выбрать вкус

        </div>






        <div class="flavour-list">


        ${

        product.flavours.map(flavour => `


            <div class="flavour-item">


                <span>

                ${flavour}

                </span>



                <button

                class="add-button"

                data-product="${product.name}"

                data-flavour="${flavour}"

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





    activateAddButtons();


}






// =====================================
// ADD BUTTONS
// =====================================



function activateAddButtons(){



    const buttons =

    document.querySelectorAll(".add-button");




    buttons.forEach(button => {



        button.addEventListener(

        "click",

        ()=>{


            const product =

            button.dataset.product;



            const flavour =

            button.dataset.flavour;



            addToCart(
                product,
                flavour
            );



        });



    });



}







// =====================================
// ADD TO CART
// =====================================



function addToCart(product, flavour){



    const item = {


        id:
        Date.now(),


        product,

        flavour,


        price:
        PRODUCT_PRICE



    };




    cart.push(item);



    updateCart();



    showToast(
    "Товар добавлен в корзину"
    );



}






// =====================================
// CALCULATE TOTAL
// =====================================



function getTotal(){


    return cart.reduce(

        (sum,item)=>

        sum + item.price,

        0

    );


}






// =====================================
// UPDATE CART
// =====================================



function updateCart(){



    const total =
    getTotal();




    cartCount.textContent =

    `${cart.length} товаров`;





    cartTotal.textContent =

    `${total.toFixed(2)}€`;





    modalProducts.textContent =

    cart.length;





    modalTotal.textContent =

    `${total.toFixed(2)}€`;





    renderCart();



}

// =====================================
// RENDER CART
// =====================================


function renderCart(){


    cartItems.innerHTML = "";




    if(cart.length === 0){


        cartItems.innerHTML = `

        <div class="empty-cart">

            Корзина пока пустая

        </div>

        `;


        return;


    }






    cart.forEach(item => {



        const cartElement =

        document.createElement("div");



        cartElement.className =

        "cart-item";





        cartElement.innerHTML = `



        <div class="cart-item-info">


            <div class="cart-item-name">

            ${item.product}

            </div>



            <div class="cart-item-flavour">

            ${item.flavour}

            </div>


        </div>






        <div class="cart-item-right">


            <span>

            ${item.price.toFixed(2)}€

            </span>





            <button

            class="remove-item"

            data-id="${item.id}"

            >

            ✕

            </button>



        </div>




        `;






        cartItems.appendChild(cartElement);



    });






    activateRemoveButtons();



}







// =====================================
// REMOVE BUTTONS
// =====================================



function activateRemoveButtons(){



    const buttons =

    document.querySelectorAll(
    ".remove-item"
    );




    buttons.forEach(button => {



        button.addEventListener(

        "click",

        ()=>{



            const id =

            Number(
            button.dataset.id
            );




            removeFromCart(id);



        });



    });



}








// =====================================
// REMOVE FROM CART
// =====================================



function removeFromCart(id){



    cart =

    cart.filter(

        item =>

        item.id !== id

    );




    updateCart();



}









// =====================================
// OPEN CART
// =====================================



function openCart(){


    cartModal.classList.add(
    "active"
    );


}







// =====================================
// CLOSE CART
// =====================================



function closeCart(){


    cartModal.classList.remove(
    "active"
    );


}








// =====================================
// MODAL EVENTS
// =====================================



openCartButton.addEventListener(

"click",

()=>{


    openCart();



});







closeCartButton.addEventListener(

"click",

()=>{


    closeCart();



});







cartModal.addEventListener(

"click",

(event)=>{


    if(
    event.target === cartModal
    ){


        closeCart();


    }


});









// =====================================
// TELEGRAM MESSAGE
// =====================================



function createTelegramMessage(){



    let message =

`Здравствуйте!

Хочу заказать:

`;






    cart.forEach(item=>{


        message +=

`• ${item.product} — ${item.flavour}
`;



    });







    message +=

`

Количество товаров:
${cart.length}



Стоимость:
${getTotal().toFixed(2)}€



Доставка:

Обсудим в переписке.

`;






    return message;



}







// =====================================
// SEND TO TELEGRAM
// =====================================



telegramButton.addEventListener(

"click",

()=>{



    if(cart.length === 0){



        showToast(
        "Корзина пустая"
        );


        return;



    }






    const message =

    createTelegramMessage();





    const telegramURL =


    TELEGRAM_LINK +

    "?text=" +

    encodeURIComponent(
    message
    );







    window.open(

        telegramURL,

        "_blank"

    );




});

// =====================================
// TOAST NOTIFICATION
// =====================================


function showToast(text){



    toast.textContent = text;



    toast.classList.add(
    "show"
    );





    setTimeout(()=>{


        toast.classList.remove(
        "show"
        );


    },1500);



}








// =====================================
// LOCAL STORAGE
// =====================================



function saveCart(){



    localStorage.setItem(

        "vapeCart",

        JSON.stringify(cart)

    );


}






function loadCart(){



    const savedCart =

    localStorage.getItem(
    "vapeCart"
    );





    if(savedCart){


        cart =

        JSON.parse(
        savedCart
        );


    }



}







// =====================================
// OVERRIDE UPDATE
// =====================================


// сохраняем корзину
// каждый раз после изменения



const oldUpdateCart = updateCart;



updateCart = function(){


    oldUpdateCart();


    saveCart();



};









// =====================================
// IMAGE ERROR HANDLING
// =====================================



document.addEventListener(

"error",

(event)=>{



    if(
    event.target.tagName === "IMG"
    ){


        event.target.src =
        "images/no-image.png";


    }



},

true

);









// =====================================
// START APPLICATION
// =====================================



function startShop(){



    loadCart();



    renderProducts();



    updateCart();



}








startShop();
