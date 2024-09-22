


//handle custom properties of the item card class
document.addEventListener('DOMContentLoaded', function() {
    localStorage.removeItem('orderList');
    const checkout = document.getElementById('checkout');
    const checkoutTab = document.getElementById('priceTable');
    const checkoutButton = checkout.querySelector('button');
    checkoutButton.addEventListener('click', () => {
        checkoutTab.classList.toggle('visible');
    })

    fetch('data/pizzas.json')
        .then(response => response.json())
        .then(pizzaFlavors => {
            const pizzaContainer = document.getElementById('pizzaContainer');
            addCards(pizzaContainer, pizzaFlavors);
        })
        .catch(error => console.error('Error fetching the JSON data:', error));

    const menuButton = document.getElementById('menu');
    const menuCurtain = document.querySelector('.menuCurtain');

    menuButton.addEventListener('click', function(){
        menuCurtain.classList.toggle('visible');
    });

    const proceedButton = document.getElementById('proceedButton');
    proceedButton.addEventListener('click', function(){
        window.location.href = 'pages/checkout.html';
    });


    const buttonList = document.querySelectorAll('button');
    buttonList.forEach(btn => {
        btn.addEventListener('click', function(){
            btn.classList.add('animate-button');

            btn.addEventListener('animationend', function(){
                btn.classList.remove('animate-button');
            }, {once: true});
        })
    });  
});

function addCards(targetContainer, items){
    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'itemCard';
        itemCard.setAttribute('img-src', item.imgSrc);
        itemCard.innerHTML = `
            <h2 id="name">${item.name}</h2>
            <img alt=${item.name} src=${item.imgSrc}>
            <div class="itemCardFooter">
                <h5 id="description">${item.description}<h5>
                <h3 id="price">R$ ${item.price}</h3>
            </div>
            <button></button>
        `;
        targetContainer.appendChild(itemCard);

        //Add event listener to each card to allow for functionality;

        const button = itemCard.querySelector('button');
        button.addEventListener('click', () => {
            addToOrder(item);
        })
    });
}

//Adds pizza to local storage order.
function addToOrder(pizza){
    let orderList = JSON.parse(localStorage.getItem('orderList')) || [];
    let existingEntry = orderList.find(item => item.id === pizza.id);

    if(existingEntry){
        existingEntry.count++;
    } else{
        pizza.count = 1;
        orderList.push(pizza);
    }

    localStorage.setItem('orderList', JSON.stringify(orderList));
    updateOrderList();
}

function removeFromOrder(pizza){
    let orderList = JSON.parse(localStorage.getItem('orderList')) || [];
    let existingEntry = orderList.find(item => item.id === pizza.id);

    try{

        if(existingEntry){
            if(existingEntry.count > 1){
                existingEntry.count--;
            }
            else{
                orderList.pop(pizza);
            }
        } else{
            orderList.pop(pizza);
        }
        localStorage.setItem('orderList', JSON.stringify(orderList));
        updateOrderList();
    } catch (exception){
        alert(`Error while popping from list: ${exception}`);
    }
}

function calculateTotalValue(orderList){
    return orderList.reduce((total, order) => {
        const price = parseFloat(order.price) * parseFloat(order.count);
        return total + price;
    }, 0).toFixed(2);
}

function updateOrderList(){
    const orderContainer = document.getElementById('priceTable');
    const checkoutTab = document.getElementById('checkout');
    orderContainer.innerHTML = '';

    let orderList = JSON.parse(localStorage.getItem('orderList')) || [];
    orderList.forEach(pizza => {
        const checkoutItem = document.createElement('div');
        checkoutItem.className = 'checkoutItem';
        checkoutItem.innerHTML = `
            <img src="${pizza.imgSrc}">
            <h2>${pizza.name}</h2>
            <div id="count">${pizza.count}</div>
            <button>
                <img src="media/icons/cancel.png">
            </button>
        `;
        const button = checkoutItem.querySelector('button');
        button.addEventListener('click', () => {
            removeFromOrder(pizza);

            button.classList.add('animate-button');

            button.addEventListener('animationend', function(){
                button.classList.remove('animate-button');
            }, {once: true});
        });
        orderContainer.appendChild(checkoutItem);
    })
    
    let total = calculateTotalValue(orderList);
    const totalValue = checkoutTab.querySelector('h4');
    const headingTotalValue = document.getElementById('headingTotalValue');
    totalValue.textContent = `R$ ${total}`;
    headingTotalValue.textContent = `R$ ${total}`;
}