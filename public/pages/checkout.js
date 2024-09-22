document.addEventListener('DOMContentLoaded', function(){
    const menuButton = document.getElementById('menu');
    const menuCurtain = document.querySelector('.menuCurtain');

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


});