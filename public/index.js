
//handle custom properties of the item card class
document.addEventListener('DOMContentLoaded', function() {
    const itemCards = document.querySelectorAll('.itemCard');
    itemCards.forEach(card => {
        const imgSrc = card.getAttribute('img-src');
        const imgElement = card.querySelector('img');
        if(imgElement && imgSrc){
            imgElement.src = imgSrc;
        }
    })
})