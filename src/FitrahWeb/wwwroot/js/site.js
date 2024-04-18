(()=>{

    let comingSoonModal = () =>{
        document.querySelector('.modal-layer#soon').style.display = 'flex';
        document.querySelector('.modal-layer#soon > .popup-dialog').style.display = 'block'
    };
    let closeSoonModal = () =>{
        document.querySelector('.modal-layer#soon').style.display = 'none';
        document.querySelector('.modal-layer#soon > .popup-dialog').style.display = 'none';
    }; 
    document.querySelector('.sign-out button#logout').addEventListener(
        'click',
        (event)=>{
            event.preventDefault();
            comingSoonModal();
        }
    );
    document.querySelector('.modal-layer#soon .blue-button#close-soon').addEventListener(
        'click',
        (event)=>{
            event.preventDefault();
            closeSoonModal();
        }
    );
})();