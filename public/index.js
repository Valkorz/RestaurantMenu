


//handle custom properties of the item card class
document.addEventListener('DOMContentLoaded', function() {
    localStorage.removeItem('orderList');
    const checkout = document.getElementById('checkout');
    const checkoutTab = document.getElementById('priceTable');
    const checkoutButton = checkout.querySelector('button');
    checkoutButton.addEventListener('click', () => {
        if(checkoutTab.style.visibility == "hidden"){
            checkoutTab.style.visibility = "visible";
            checkoutTab.style.transform = "translate(0,0)";
        } else{
            checkoutTab.style.visibility = "hidden";
            checkoutTab.style.transform = "translate(0,0)";
        }
    })

    fetch('data/pizzas.json')
        .then(response => response.json())
        .then(pizzaFlavors => {
            const pizzaContainer = document.getElementById('pizzaContainer');

            pizzaFlavors.forEach(pizza => {
                const itemCard = document.createElement('div');
                itemCard.className = 'itemCard';
                itemCard.setAttribute('img-src', pizza.imgSrc);
                itemCard.innerHTML = `
                    <h3 id="name">${pizza.name}</h3>
                    <img alt=${pizza.name} src=${pizza.imgSrc}>
                    <div class="itemCardFooter">
                        <h5 id="description">${pizza.description}<h5>
                        <h3 id="price">${pizza.price}</h3>
                    </div>
                    <button></button>
                `;
                pizzaContainer.appendChild(itemCard);

                //Add event listener to each card to allow for functionality;

                const button = itemCard.querySelector('button');
                button.addEventListener('click', () => {
                    addToOrder(pizza);
                })
            });
        })
        .catch(error => console.error('Error fetching the JSON data:', error));

    // const itemCards = document.querySelectorAll('.itemCard');
    // itemCards.forEach(card => {
    //     const imgSrc = card.getAttribute('img-src');
    //     const imgElement = card.querySelector('img');
    //     if(imgElement && imgSrc){
    //         imgElement.src = imgSrc;
    //     }
    // })
})

//Adds pizza to local storage order.
function addToOrder(pizza){
    let orderList = JSON.parse(localStorage.getItem('orderList')) || [];
    orderList.push(pizza);
    localStorage.setItem('orderList', JSON.stringify(orderList));
    updateOrderList();
}

function removeFromOrder(pizza){
    let orderList = JSON.parse(localStorage.getItem('orderList')) || [];
    try{
        orderList.pop(pizza);
        localStorage.setItem('orderList', JSON.stringify(orderList));
        updateOrderList();
    } catch (exception){
        alert(`Error while popping from list: ${exception}`);
    }
}

function updateOrderList(){
    const orderContainer = document.getElementById('priceTable');
    orderContainer.innerHTML = '';

    let orderList = JSON.parse(localStorage.getItem('orderList')) || [];
    orderList.forEach(pizza => {
        const checkoutItem = document.createElement('div');
        checkoutItem.className = 'checkoutItem';
        checkoutItem.innerHTML = `
            <img src="${pizza.imgSrc}">
            <h5>${pizza.name}</h5>
            <div id="count">1</div>
            <button>
                <img src="media/icons/cancel.png">
            </button>
        `;
        const button = checkoutItem.querySelector('button');
        button.addEventListener('click', () => {
            removeFromOrder(pizza);
        });
        orderContainer.appendChild(checkoutItem);
    })
}