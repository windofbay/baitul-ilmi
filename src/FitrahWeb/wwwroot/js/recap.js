(()=>{
    const url = 'http://localhost:5000/api';
    const endPoint = 'recap'  
    let YEAR=String(new Date().getUTCFullYear());
    let DATE;

    let closeModal = () =>{
        document.querySelector('.modal-layer#soon').style.display = 'none';
        document.querySelector('.modal-layer#soon > .popup-dialog').style.display = 'none';
        document.querySelector('.modal-layer#picture').style.display = 'none';
        document.querySelector('.modal-layer#picture > .popup-dialog').style.display = 'none'
        document.querySelector('.modal-layer#update-proof').style.display = 'none';
        document.querySelector('.modal-layer#update-proof > .popup-dialog').style.display = 'none'
    }; 
    let showImage = () =>{
        document.querySelector('.modal-layer#picture').style.display = 'flex';
        document.querySelector('.modal-layer#picture > .popup-dialog').style.display = 'block'       
    };
    let showUpdateImage = () => {
        document.querySelector('.modal-layer#update-proof').style.display = 'flex';
        document.querySelector('.modal-layer#update-proof > .popup-dialog').style.display = 'block'  
    };
    let showSuccessModal = () => {
        document.querySelector('.modal-layer#success').style.display = 'flex';
        document.querySelector('.modal-layer#success > .popup-dialog').style.display = 'block';
    };
    let closeSuccessModal = () =>{
        document.querySelector('.modal-layer#success').style.display = 'none';
        document.querySelector('.modal-layer#success > .popup-dialog').style.display = 'none';
        closeModal();
        getRecaps();
    };
    let getPicture = (date) => {
        let request = new XMLHttpRequest();
        request.open('GET',`${url}/${endPoint}/${date}`);
        
        request.onloadstart = ()=>{
            console.log('start request..');
        }
        request.send();
        request.onload = function(){
            const response = request.response;
            const responseJSON = JSON.parse(response);
            bindingPictureModal(responseJSON);
        };
        request.onloadend = ()=>{
            console.log('finish');
        }    
    };
    let getRecap = (date) => {
        let request = new XMLHttpRequest();
        request.open('GET',`${url}/${endPoint}/${date}`);
        
        request.onloadstart = ()=>{
            console.log('start request..');
        }
        request.send();
        request.onload = function(){
            const response = request.response;
            const responseJSON = JSON.parse(response);
            bindingUpdateModal(responseJSON);
        };
        request.onloadend = ()=>{
            console.log('finish');
        }    
    };
    let bindingPictureModal = (response) => {
        document.querySelector('.modal-layer#picture > .popup-dialog img')
        .setAttribute("src",`${url}/${endPoint}/image/${response.imageName}`);
    };
    // let bindingUpdateModal = (response)=>{
    //     let form = document.querySelector('.modal-layer#update-proof');
    //     form.querySelector('input[name=tanggal]').value=response.date.split('T')[0];
    // };
    let bindingRecaps = (response) =>{
        document.querySelector('table > tbody').innerHTML=``;
        for (const {
            date, plainDate, totalQuantity, totalFitrahMoney, totalFitrahRice,
            totalFidiyaMoney, totalFidiyaRice,
            totalInfaqMoney, totalInfaqRice,
            totalMaalMoney
        } of response.recaps
        ){
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${date}</td>
                <td>
                    <a href="javascript:;" id="${plainDate}" class="blue-button valid-button"><i class="fa fa-book"></i></a>
                    <a href="javascript:;" id="${plainDate}" class="blue-button update-button"><i class="fa fa-pen-square"></i></a>
                </td>
                <td>${totalQuantity}</td>
                <td>${totalFitrahMoney}</td>
                <td>${totalFitrahRice}</td>
                <td>${totalFidiyaMoney}</td>
                <td>${totalFidiyaRice}</td>
                <td>${totalInfaqMoney}</td>
                <td>${totalInfaqRice}</td>
                <td>${totalMaalMoney}</td>
            `;
            tr.querySelector('.blue-button.valid-button').addEventListener(
                'click',
                (event)=>{
                    event.preventDefault();
                    DATE = tr.querySelector('.blue-button.valid-button').getAttribute("id");
                    getPicture(DATE);
                    showImage();
                }
            );
            tr.querySelector('.blue-button.update-button').addEventListener(
                'click',
                (event)=>{
                    event.preventDefault();
                    DATE = tr.querySelector('.blue-button.update-button').getAttribute("id");
                    //getRecap(DATE);
                    showUpdateImage();
                }
            );
            let tBody = document.querySelector('table > tbody');
            tBody.appendChild(tr);
        }
        let select = document.querySelector('.filter select[name=cari-tahun]');
        select.innerHTML = ``;
        let option =`<option value="">Pilih Tahun</option>`
        response.years.forEach(year => {
            option = option + `<option value="${year.value}">${year.text}</option>`
        });
        select.innerHTML = option;
        bindingFooter(response);
    };
    let bindingFooter = (response)=>{
        document.querySelector('table > tfoot').innerHTML =`
        <tr>
            <td>Total</td>
            <td></td>
            <td>${response.overallRecap.overallQuantity}</td>
            <td>${response.overallRecap.overallFitrahMoney}</td>
            <td>${response.overallRecap.overallFitrahRice}</td>
            <td>${response.overallRecap.overallFidiyaMoney}</td>
            <td>${response.overallRecap.overallFidiyaRice}</td>
            <td>${response.overallRecap.overallInfaqMoney}</td>
            <td>${response.overallRecap.overallInfaqRice}</td>
            <td>${response.overallRecap.overallMaalMoney}</td>
        </tr>
        `
    };
    let getRecaps = ()=>{
        let request = new XMLHttpRequest();
        request.open('GET',`${url}/${endPoint}?period=${YEAR}`);
        
        request.onloadstart = ()=>{
            console.log('start request..');
        }
        request.send();
        request.onload = function(){
            const response = request.response;
            const responseJSON = JSON.parse(response);
            bindingRecaps(responseJSON);
        };
        request.onloadend = ()=>{
            console.log('finish');
        }
    };
    let updatedRecap = (date) => {
        let form = document.querySelector('.modal-layer#update-proof > .popup-dialog .upsert-form');
        let image = form.querySelector('input[name=bukti]').files[0];

        let formData = new FormData();
        formData.append("Image", image);
        formData.append("Date",date);

        return formData;
    };
    
    let updateRecap = (date) => {
        let formData = updatedRecap(date);
        let request = new XMLHttpRequest();
        request.open('PATCH',`${url}/${endPoint}/${date}`);
        request.send(formData);
        request.onload = () => {
            console.log(request.response);
        };
        request.onloadend = () => {
            if(request.status>=200 && request.status<=300){
                showSuccessModal();
            } else if (request.status === 400) {
                alert("coba lagi!");
            } else {
                alert("Terjadi kesalahan, coba lagi!");
            }
        };
    };
    let modifyDate = (date) => {
        let originalDateTimeString = "2024-04-02T00:00:00";
        let originalDate = new Date(originalDateTimeString);
        
        // Extract individual components
        let month = originalDate.getMonth() + 1; // Months are zero-based, so add 1
        let day = originalDate.getDate();
        let year = originalDate.getFullYear();
        let hours = originalDate.getHours();
        let minutes = originalDate.getMinutes();
        let seconds = originalDate.getSeconds();
        
        // Determine AM or PM
        let amOrPm = hours < 12 ? 'AM' : 'PM';
        
        // Convert hours to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // Convert 0 to 12 for 12-hour clock
        
        // Format the components into the desired string format
        let modifiedDateString = month + '/' + day + '/' + year + ' ' +
                                 (hours < 10 ? '0' : '') + hours + ':' + 
                                 (minutes < 10 ? '0' : '') + minutes + ':' + 
                                 (seconds < 10 ? '0' : '') + seconds + ' ' + amOrPm;
        
        return modifiedDateString;
    };
    getRecaps();
    document.querySelector('.filter > button[type=submit]').addEventListener(
        'click',
        (event)=>{
            event.preventDefault();
            YEAR = document.querySelector('.filter select[name=cari-tahun').value;
            console.log(YEAR);
            getRecaps();
        }
    );
    document.querySelector('.blue-button#close-picture').addEventListener(
        'click',
        (event)=>{
            event.preventDefault();
            closeModal();
        }
    );
    document.querySelector('.blue-button#close').addEventListener(
        'click',
        (event)=>{
            event.preventDefault();
            closeModal();
        }
    );
    document.querySelector('.blue-button#edit').addEventListener(
        'click',
        (event)=>{
            event.preventDefault();
            updateRecap(DATE);
        }
    );
    document.querySelector('.blue-button#close-success').addEventListener(
        'click',
        (event)=>{
            event.preventDefault();
            closeSuccessModal();
        }
    );
})();

    // let createPagination = (response) => {
    //     let tr = document.createElement('tr');
    //     let td = document.createElement('td');
    //     td.setAttribute("colspan","10");
    //     let div = document.createElement('div');
    //     div.setAttribute("class","pagination");
    //     let divPageButton = document.createElement('div');
    //     let divPageNumber = document.createElement('div');
    //     divPageNumber.innerHTML=
    //     `Page ${response.pagination.page} of ${response.pagination.totalPages}`;
    //     div.append(divPageNumber);
    //     for(let pageNumber =1;pageNumber<= response.pagination.totalPages;pageNumber++){
    //         let a = document.createElement('a');
    //         a.textContent=pageNumber;
    //         a.addEventListener(
    //             'click',
    //             (event) =>{
    //                 event.preventDefault();
    //                 PAGE_NUMBER = pageNumber;
    //                 console.log(PAGE_NUMBER);
    //                 getRecaps();
    //             }
    //         );
    //         divPageButton.append(a);
    //     }
    //     div.append(divPageButton);
    //     td.append(div);
    //     tr.append(td);
    //     let tFoot = document.querySelector('table > tfoot');
    //     tFoot.appendChild(tr);
    // }