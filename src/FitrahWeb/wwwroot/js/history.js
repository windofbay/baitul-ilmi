(()=>{

    const url = 'http://localhost:5000/api';
    const endPoint = 'history'
    let CODE;
    let PAGE_NUMBER=1;
    let NAME="";
    let ADDRESS="";
    let YEAR=String(new Date().getUTCFullYear());
    

    let showInsertModal = ()=>{
        let form = document.querySelector('.upsert-form')
        form.querySelector('input[name=nama]').value = null;
        form.querySelector('input[name=alamat]').value=null;
        form.querySelector('input[name=jiwa]').value=null;
        form.querySelector('input[name=fitrah-uang]').value=null;
        form.querySelector('input[name=fitrah-beras]').value=null;
        form.querySelector('input[name=infaq-uang]').value =null;
        form.querySelector('input[name=infaq-beras]').value=null;
        form.querySelector('input[name=fidiyah-uang]').value=null;
        form.querySelector('input[name=fidiyah-beras]').value=null;
        form.querySelector('input[name=maal]').value=null;
        form.querySelector('input[name=note]').value=null;
        document.querySelector('.modal-layer#update').style.display = 'flex';
        document.querySelector('.modal-layer#update > .popup-dialog').style.display = 'block';
        document.querySelector('.blue-button#add').style.display = 'inline-block';
        document.querySelector('.blue-button#edit').style.display = 'none';
        
    };
    let showUpdateModal = ()=>{
        document.querySelector('.modal-layer#update').style.display = 'flex';
        document.querySelector('.modal-layer#update > .popup-dialog').style.display = 'block';
        document.querySelector('.blue-button#add').style.display='none';
        document.querySelector('.blue-button#edit').style.display='inline-block';
    };
    let showNoteModal = () => {
        document.querySelector('.modal-layer#notes').style.display = 'flex';
        document.querySelector('.modal-layer#notes > .popup-dialog').style.display = 'block';
    };
    let comingSoon = () =>{
        document.querySelector('.modal-layer#soon').style.display = 'flex';
        document.querySelector('.modal-layer#soon > .popup-dialog').style.display = 'block'
    }
    let closeModal = () =>{
        document.querySelector('.modal-layer#update').style.display = 'none';
        document.querySelector('.modal-layer#update > .popup-dialog').style.display = 'none';
        document.querySelector('.modal-layer#delete').style.display = 'none';
        document.querySelector('.modal-layer#delete > .popup-dialog').style.display = 'none';
        document.querySelector('.modal-layer#notes').style.display = 'none';
        document.querySelector('.modal-layer#notes > .popup-dialog').style.display = 'none';
        document.querySelector('.modal-layer#soon').style.display = 'none';
        document.querySelector('.modal-layer#soon > .popup-dialog').style.display = 'none';
        document.querySelector('.blue-button#add').style.display = 'none';
        document.querySelector('.blue-button#edit').style.display = 'none';
    }; 

    let closeSuccessModal = () =>{
        document.querySelector('.modal-layer#success').style.display = 'none';
        document.querySelector('.modal-layer#success > .popup-dialog').style.display = 'none';
        closeModal();
        getHistories();
    };
    let showSuccessModal = () => {
        document.querySelector('.modal-layer#success').style.display = 'flex';
        document.querySelector('.modal-layer#success > .popup-dialog').style.display = 'block';
    };
    let showConfirmDelete = () =>{
        document.querySelector('.modal-layer#delete').style.display = 'flex';
        document.querySelector('.modal-layer#delete > .popup-dialog').style.display = 'block'
    };
    let getHistories = ()=>{
        let request = new XMLHttpRequest();
        request.open('GET',`${url}/${endPoint}?page=${PAGE_NUMBER}&name=${NAME}&address=${ADDRESS}&period=${YEAR}`);
        //request.setRequestHeader('Authorization','Bearer '+ TOKEN);
        request.onloadstart = ()=>{
            console.log('start request..');
        }
        request.send();
        request.onload = function(){
            const response = request.response;
            const responseJSON = JSON.parse(response);
            bindingHistories(responseJSON);
        };
        request.onloadend = ()=>{
            console.log('finish');
        }
    };
    let getHistoryByCode = (code)=>{
        let request = new XMLHttpRequest();
        request.open('GET',`${url}/${endPoint}/${code}/edit`);
        //request.setRequestHeader('Authorization','Bearer '+ TOKEN);
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
    }
    let bindingUpdateModal = (response)=>{
        let form = document.querySelector('.upsert-form')
        form.querySelector('input[name=nama]').value = response.muzakkiName;
        form.querySelector('input[name=alamat]').value=response.address;
        form.querySelector('input[name=jiwa]').value=response.quantity;
        form.querySelector('input[name=fitrah-uang]').value=response.fitrahMoney;
        form.querySelector('input[name=fitrah-beras]').value=response.fitrahRice;
        form.querySelector('input[name=infaq-uang]').value =response.infaqMoney;
        form.querySelector('input[name=infaq-beras]').value=response.infaqRice;
        form.querySelector('input[name=fidiyah-uang]').value=response.fidiyaMoney;
        form.querySelector('input[name=fidiyah-beras]').value=response.fidiyaRice;
        form.querySelector('input[name=maal]').value=response.maalMoney;
        form.querySelector('input[name=note]').value=response.note;
        form.querySelector('input[name=tanggal]').value=response.date.split('T')[0];
        bindingInsertModal(response);
        document.querySelector('.modal-layer#notes > .popup-dialog > p').innerHTML = response.note
    };
    let editedHistory = (code) =>{
        let form = document.querySelector('.upsert-form')
        let muzakkiName = form.querySelector('input[name=nama]').value;
        let address = form.querySelector('input[name=alamat]').value;
        let quantity = form.querySelector('input[name=jiwa]').value;
        let fitrahMoney = parseFloat(form.querySelector('input[name=fitrah-uang]').value)==NaN? null : parseFloat(form.querySelector('input[name=fitrah-uang]').value);
        let fitrahRice = parseFloat(form.querySelector('input[name=fitrah-beras]').value)==NaN? null:parseFloat(form.querySelector('input[name=fitrah-beras]').value);
        let infaqMoney = parseFloat(form.querySelector('input[name=infaq-uang]').value)==NaN?null :parseFloat(form.querySelector('input[name=infaq-uang]').value) ;
        let infaqRice = parseFloat(form.querySelector('input[name=infaq-beras]').value)==NaN?null:parseFloat(form.querySelector('input[name=infaq-beras]').value);
        let fidiyaMoney = parseFloat(form.querySelector('input[name=fidiyah-uang]').value)==NaN?null:parseFloat(form.querySelector('input[name=fidiyah-uang]').value);
        let fidiyaRice = parseFloat(form.querySelector('input[name=fidiyah-beras]').value)==NaN?null:parseFloat(form.querySelector('input[name=fidiyah-beras]').value);
        let maalMoney = parseFloat(form.querySelector('input[name=maal]').value)==NaN?null:parseFloat(form.querySelector('input[name=maal]').value);
        let maalRice = null;
        let amilUsername = form.querySelector('select[name=amil]').value;
        let note = form.querySelector('input[name=note]').value;
        let amils = [];
        let date = form.querySelector('input[name=tanggal]').value;        //console.log(form.querySelector('input[name=fitrah-uang]').value);
        return {muzakkiName,address,quantity,fitrahMoney,fitrahRice,fidiyaMoney,fidiyaRice,
            infaqMoney, infaqRice, maalMoney, maalRice, amilUsername, note, amils, code,
            date
        }
    };
    let updateHistory = (code) =>{
        let request = new XMLHttpRequest();
        request.open('PATCH',`${url}/${endPoint}/${code}/edit`);
        request.setRequestHeader('Content-type','application/json');
        //request.setRequestHeader('Authorization','Bearer '+TOKEN);
        request.send(JSON.stringify(editedHistory(code)));
        request.onload = () => {
            console.log(request.response);
        };
        request.onloadend = () => {
            if(request.status>=200 && request.status<=300){
                showSuccessModal();
            } else if (request.status === 400) {
                alert("Tolong masukan semua data-data wajib (Nama, Alamat, Jumlah Jiwa, dan Tanggal) and coba lagi!");
            } else {
                alert("Terjadi kesalahan, coba lagi!");
            }
        };       
    };
    let bindingHistories = (response) =>{
        document.querySelector('table > tbody').innerHTML=``;
        document.querySelector('table > tfoot').innerHTML=``;
        for (const {
                    code,muzakkiName,address,date,quantity,
                    fitrahMoney,fitrahRice,infaqMoney,infaqRice,
                    fidiyaMoney,fidiyaRice,maalMoney,maalRice,
                    amilUsername
                } of response.histories
            ){
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <a href="javascript:;" id="${code}" class="blue-button update-button"><i class="fa fa-pen-square"></i></a>
                    <a href="javascript:;" id="${code}" class="blue-button delete-button"><i class="fa fa-trash"></i></a>
                    <a href="javascript:;" id="${code}" class="blue-button note-button"><i class="fa fa-sticky-note"></i></a>
                </td>
                <td>${muzakkiName}</td>
                <td>${address}</td>
                <td>${quantity}</td>
                <td>${fitrahMoney}</td>
                <td>${fitrahRice}</td>
                <td>${fidiyaMoney}</td>
                <td>${fidiyaRice}</td>
                <td>${infaqMoney}</td>
                <td>${infaqRice}</td>
                <td>${maalMoney}</td>
                <td>${date}</td>
                <td>${amilUsername}</td>
            `;
            //console.log(tr);
            tr.querySelector('.blue-button.delete-button').addEventListener(
                'click',
                (event)=>{
                    event.preventDefault();
                    CODE = code;
                    //showConfirmDelete();
                    comingSoon();
                }
            )
            tr.querySelector('.blue-button.update-button').addEventListener(
                'click',
                (event)=>{
                    event.preventDefault();
                    CODE = code;
                    getHistoryByCode(CODE);
                    showUpdateModal();
                }
            );
            tr.querySelector('.blue-button.note-button').addEventListener(
                'click',
                (event)=>{
                    event.preventDefault();
                    CODE = code;
                    getHistoryByCode(CODE);
                    showNoteModal();
                }
            );
            
            let tBody = document.querySelector('table > tbody');
            tBody.appendChild(tr);
        }
        createPagination(response);
        let select = document.querySelector('.filter select[name=cari-tahun]');
        select.innerHTML = ``;
        let option =`<option value="">Pilih Tahun</option>`
        response.years.forEach(year => {
            option = option + `<option value="${year.value}">${year.text}</option>`
        });
        select.innerHTML = option;
    };
    let createPagination = (response) => {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.setAttribute("colspan","13");
        let div = document.createElement('div');
        div.setAttribute("class","pagination");
        let divPageButton = document.createElement('div');
        let divPageNumber = document.createElement('div');
        divPageNumber.innerHTML=
        `Page ${response.pagination.page} of ${response.pagination.totalPages}`;
        div.append(divPageNumber);
        for(let pageNumber =1;pageNumber<= response.pagination.totalPages;pageNumber++){
            let a = document.createElement('a');
            a.textContent=pageNumber;
            a.addEventListener(
                'click',
                (event) =>{
                    event.preventDefault();
                    PAGE_NUMBER = pageNumber;
                    console.log(PAGE_NUMBER);
                    getHistories();
                }
            );
            divPageButton.append(a);
        }
        div.append(divPageButton);
        td.append(div);
        tr.append(td);
        let tFoot = document.querySelector('table > tfoot');
        tFoot.appendChild(tr);
    }
    let addHistory = () => {
        let request = new XMLHttpRequest();
        request.open('POST',`${url}/${endPoint}`);
        request.setRequestHeader('Content-type','application/json');
        //request.setRequestHeader('Authorization','Bearer '+TOKEN);
        request.send(JSON.stringify(newHistory()));
        request.onload = () => {
            console.log(request.response);
        };
        request.onloadend = () => {
            if(request.status>=200 && request.status<=300){
                showSuccessModal();
                
            } else if (request.status === 400) {
                alert("Tolong masukan semua data-data wajib (Nama, Alamat, Jumlah Jiwa, dan Tanggal) and coba lagi!");
            } else {
                alert("Terjadi kesalahan, coba lagi!");
            }
        };
    }

    let newHistory = ()=>{
        let form = document.querySelector('.upsert-form')
        let muzakkiName = form.querySelector('input[name=nama]').value;
        let address = form.querySelector('input[name=alamat]').value;
        let quantity = form.querySelector('input[name=jiwa]').value;
        let fitrahMoney = parseFloat(form.querySelector('input[name=fitrah-uang]').value)==NaN? null : parseFloat(form.querySelector('input[name=fitrah-uang]').value);
        let fitrahRice = parseFloat(form.querySelector('input[name=fitrah-beras]').value)==NaN? null:parseFloat(form.querySelector('input[name=fitrah-beras]').value);
        let infaqMoney = parseFloat(form.querySelector('input[name=infaq-uang]').value)==NaN?null :parseFloat(form.querySelector('input[name=infaq-uang]').value) ;
        let infaqRice = parseFloat(form.querySelector('input[name=infaq-beras]').value)==NaN?null:parseFloat(form.querySelector('input[name=infaq-beras]').value);
        let fidiyaMoney = parseFloat(form.querySelector('input[name=fidiyah-uang]').value)==NaN?null:parseFloat(form.querySelector('input[name=fidiyah-uang]').value);
        let fidiyaRice = parseFloat(form.querySelector('input[name=fidiyah-beras]').value)==NaN?null:parseFloat(form.querySelector('input[name=fidiyah-beras]').value);
        let maalMoney = parseFloat(form.querySelector('input[name=maal]').value)==NaN?null:parseFloat(form.querySelector('input[name=maal]').value);
        let maalRice = null;
        let amilUsername = form.querySelector('select[name=amil]').value;
        let note = form.querySelector('input[name=note]').value;
        let amils = [];
        let code = "";
        let date= form.querySelector('input[name=tanggal]').value;
        return {muzakkiName,address,quantity,fitrahMoney,fitrahRice,fidiyaMoney,fidiyaRice,
            infaqMoney, infaqRice, maalMoney, maalRice, amilUsername, note, amils, code,
            date
        }
    };
    let getInsert = () => {
        let request = new XMLHttpRequest();
        request.open('GET',`${url}/${endPoint}/insert`);
        request.onloadstart = ()=>{
            console.log('start request..');
        }
        request.send();
        request.onload = function(){
            const response = request.response;
            const responseJSON = JSON.parse(response);
            bindingInsertModal(responseJSON);
        };
        request.onloadend = ()=>{
            console.log('finish');
        }
    };
    let bindingInsertModal = (response) => {
 
        let select = document.querySelector('.upsert-form select[name=amil]');
        let option =""
        select.innerHTML = ``;
        response.amils.forEach(amil => {
            if(amil.value==response.amilUsername){
                option = option + `<option value="${amil.value}" selected>${amil.text}</option>`
            } else{
                option = option + `<option value="${amil.value}">${amil.text}</option>`
            }
        });
        select.innerHTML = option;
        if(response.date=="0001-01-01T00:00:00"){
            document.querySelector('.upsert-form input[name=tanggal]').value = new Date().toISOString().split('T')[0]
        }
    };


    getHistories();
    document.querySelector('.blue-button.create-button').addEventListener(
        'click',
        (event)=>{
            event.preventDefault();
            getInsert();
            showInsertModal();
        }
    );
    document.querySelector('.blue-button#close').addEventListener(
        'click',
        (event)=>{
            event.preventDefault();
            closeModal();
        }
    );
    document.querySelector('.blue-button#close-success').addEventListener(
        'click',
        (event)=>{
            event.preventDefault();
            closeSuccessModal();
        }
    );
    document.querySelector('.blue-button#add').addEventListener(
        'click',
        (event)=>{
            event.preventDefault();
            addHistory();
        }
    );

    document.querySelector('.blue-button#cancel').addEventListener(
        'click',
        (event)=>{
            event.preventDefault();
            closeModal();
        }
    );
    document.querySelector('.blue-button#close-note').addEventListener(
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
            updateHistory(CODE);
        }
    );
    document.querySelector('.filter > button[type=submit]').addEventListener(
        'click',
        (event)=>{
            event.preventDefault();
            PAGE_NUMBER=1;
            NAME = document.querySelector('.filter input[name=cari-nama]').value;
            ADDRESS = document.querySelector('.filter input[name=cari-alamat').value;
            YEAR = document.querySelector('.filter select[name=cari-tahun').value;
            getHistories();
        }
    );
    // document.querySelector('.blue-button#confirm-delete').addEventListener(

    // );
})();



    // gabisa begini, mesti ditaro di iterasinya 'bindingHistories()'
    // let editButtons = document.querySelectorAll('.blue-button.update-button')
    // editButtons.forEach(button => {
    //     button.addEventListener(
    //         'click',
    //         (event)=>{
    //             event.preventDefault();
    //             CODE = button.getAttribute('id');
    //             getHistory(CODE);
    //             showUpdateModal();
    //         }
    //     );
    // });

    // let deleteButtons = document.querySelectorAll('.blue-button.delete-button')
    // deleteButtons.forEach(button => {
    //     button.addEventListener(
    //         'click',
    //         (event)=>{
    //             event.preventDefault();
    //             CODE = button.getAttribute('id');
    //             console.log(CODE);
    //             showConfirmDelete();
    //         }
    //     );
    // });