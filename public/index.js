
//handle custom properties of the item card class
document.addEventListener('DOMContentLoaded', function() {

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
                    alert(`Button clicked for ${pizza.name}`);
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