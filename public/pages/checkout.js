
document.addEventListener('DOMContentLoaded', function(){
    backgroundAudio();

    const menuButton = document.getElementById('menu');
    const menuCurtain = document.querySelector('.menuCurtain');
    const checkoutTable = document.querySelector('table');
    const emptyMessage = document.getElementById('emptyOrderMessage');

    checkoutTable.innerHTML = ``;

    menuButton.addEventListener('click', function(){
        menuCurtain.classList.toggle('visible');
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

    let orderList = JSON.parse(localStorage.getItem('orderList')) || [];
    if(orderList){
        emptyMessage.style.visibility = "hidden";

        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>Item</th>
            <th>Quantidade</th>
            <th>Valor unidade</th>
            <th>Subtotal</th>
        `;

        checkoutTable.appendChild(headerRow);

        totalPrice = 0;
        orderList.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.name}</td>
                <td>${entry.count}</td>
                <td>R$ ${entry.price}</td>
                <td>R$ ${(entry.price * entry.count).toFixed(2)}</td>
            `;

            totalPrice += parseFloat(entry.price) * parseFloat(entry.count);
            checkoutTable.appendChild(row);
        })

        const totalsRow = document.createElement('tr');
        totalsRow.innerHTML = `
            <th> Total: </th>
            <th>R$ ${totalPrice.toFixed(2)}</th>
        `;

        checkoutTable.appendChild(totalsRow);
    }
    else {
        emptyMessage.style.visibility = "visible";
    }


});

function backgroundAudio(){
    const audio = document.getElementById('bgm');
    const playButton = document.getElementById('sound');

    playButton.addEventListener('click', function() {
        audio.play().then(() => {
            localStorage.setItem('audioPlaying', 'true');
        }).catch(error => {
            console.error('Error playing audio:', error);
        });
    });

    // Check if audio was previously playing
    if (localStorage.getItem('audioPlaying') === 'true') {
        audio.play().catch(error => {
            console.error('Error playing audio:', error);
        });
    }

    // Add event listener to play audio
    audio.addEventListener('play', function() {
        localStorage.setItem('audioPlaying', 'true');
    });

    // Add event listener to pause audio
    audio.addEventListener('pause', function() {
        localStorage.setItem('audioPlaying', 'false');
        playButton.style.backgroundImage = 'url(media/icons/mute.png)';
    });

}