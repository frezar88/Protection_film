import {requestRun} from './ajax.js';
import { editStyleForBrand} from "./editStyle.js";

let url = 'http://omg.aps.by/server/'
let id = parseUrl()



function parseUrl() {
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    return id
}

requestRun(url + 'check-id/?id=' + id, 'GET').then((data) => {
    if (data) {
        showSite(data)
        editStyleForBrand(data.brand.name)
       
    }
  
})


function showSite(data) {
    hideSpiner()
    showOrCloseBurgerMenu()
    addEventForBtnMoreInfo()
    addEventForHeaderNavMenu()
    showOrCloseFormBlock()
    addMaskFromInputCallBackForm("phone", "+375_________")
    sendData()
    setDefaultNameAndPhone(data.user)
}

function hideSpiner() {
    let spiner = document.querySelector('.spiner')
    let wrapper = document.querySelector('.protection__wrapper')
    spiner.classList.add('hide')
    wrapper.classList.remove('hide')
}

function showOrCloseBurgerMenu() {
    let btnShowMenu = document.querySelector('.header__burger-icon')
    btnShowMenu.addEventListener('click', () => {
        moveBurgerMenu(1, 0)
        closeBurgerMenu()
    })
}
function closeBurgerMenu() {
    let btnCloseBurgerMenu = document.querySelector('.burger-menu__close-btn')
    btnCloseBurgerMenu.addEventListener('click', () => {
        moveBurgerMenu(0, -3000)
    })
}
function moveBurgerMenu(opacity, translateY) {
    let burgerMenu = document.querySelector('.burger-menu')
    burgerMenu.style.opacity = opacity
    burgerMenu.style.transform = "translateY(" + translateY + "px)"
    if (translateY === 0) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'unset'
    }
}



function addEventForHeaderNavMenu() {
    let headerMenu = document.querySelector('.burger-menu__nav ul')
    headerMenu.addEventListener('click', (e) => {
        moveBurgerMenu(0, -3000)
        moveToCurrentBlock(e.target.attributes['data-name'].value)
    })
}
function moveToCurrentBlock(target) {
    let currentBlock = document.getElementById(target)
    currentBlock.scrollIntoView({ block: "end", inline: "start", behavior: "smooth" });
}
function addEventForBtnMoreInfo() {
    let btnMoreInfo = document.querySelector('.main-first-screen__more-info')
    btnMoreInfo.addEventListener('click', () => {
        moveToCurrentBlock('benefits')
    })
}



function showOrCloseFormBlock() {
    addEventForBtnBuy()
}
function addEventForBtnBuy() {
    let btnBuy = document.querySelectorAll('.btn-buy')
    let btnSendToServer = document.querySelector('.btn-send-to-server')
   
    btnBuy.forEach(button => {
        button.addEventListener('click', (e) => {
            
            btnSendToServer.setAttribute('data-name', e.target.innerHTML)

            showFormBlock()
            closeFormBlock()
        })
    });
    
}

function showFormBlock() {
    let blockForm = document.querySelector('.form-block')
    let form = document.querySelector('.form ')
    blockForm.classList.remove('no-active')
    document.body.style.overflow = 'hidden'
    form.classList.remove('no-active')
}

function closeFormBlock() {
    let blockForm = document.querySelector('.form-block')
    let btnClose = document.querySelectorAll('.close-btn')
    let acceptBlock = document.querySelector('.accept-block')
    let tryAgainBlock = document.querySelector('.try-again-block')
    let btnAccept = document.querySelector('.btn-accept')
    btnAccept.addEventListener('click', () => {
        blockForm.classList.add('no-active')
        document.body.style.overflow = 'unset'
        acceptBlock.classList.add('no-active')
        tryAgainBlock.classList.add('no-active')
    })
    btnClose.forEach(button => {
        button.addEventListener('click', () => {
            blockForm.classList.add('no-active')
            document.body.style.overflow = 'unset'
            acceptBlock.classList.add('no-active')
            tryAgainBlock.classList.add('no-active')
        })
    });
}




function addMaskFromInputCallBackForm(path, maskValue) {
    function setCursorPosition(pos, elem) {
        elem.focus();
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
        else if (elem.createTextRange) {
            let range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select();
        }
    }

    function mask(event) {
        let matrix = maskValue,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");

        if (def.length >= val.length) val = def;

        this.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
        });

        if (event.type === "blur") {
            if (this.value.length === 2) this.value = "";
        } else setCursorPosition(this.value.length, this);
    }

    let input = document.getElementById(path);

    input.addEventListener("input", mask, false);

    input.addEventListener("focus", mask, false);

    input.addEventListener("blur", mask, false);
}


function sendData() {
    let btnSendToServer = document.querySelector('.btn-send-to-server')
    let form = document.querySelector('.form')
    let acceptBlock = document.querySelector('.accept-block')
    
    /*  let tryAgainBlock = document.querySelector('.try-again-block') */
    
    btnSendToServer.addEventListener('click', (e) => {
        let inputPhone = document.querySelector('.form-block label[name="phone"] input')
       
        if (inputPhone.value.length === 13) {
            form.classList.add('no-active')
         
            let data = createData(e.currentTarget.attributes['data-name'].value)
           console.log(data)
            requestRun(url + 'set-answer', 'POST',data).then((data) => {
                acceptBlock.classList.remove('no-active')
            })

        } else {
            inputPhone.style.boxShadow = 'red 0px 0px 6px'
            inputPhone.addEventListener('input', (e) => {
                if (e.target.value.length === 13) {
                    inputPhone.style.boxShadow = 'unset'
                } else {
                    inputPhone.style.boxShadow = 'red 0px 0px 6px'
                }
            })
        }
       
    })
}

function createData(type) {
    let inputNameValue = document.querySelector('.form-block label[name="name"] input').value
    let inputPhoneValue = document.querySelector('.form-block label[name="phone"] input').value
    return {'id':id ,'name': inputNameValue.trim(), 'phone': inputPhoneValue.slice(4), 'button': type.trim()}
}

function setDefaultNameAndPhone(data) {
    let inputName = document.querySelector('.form-block label[name="name"] input')
    let inputPhone = document.querySelector('.form-block label[name="phone"] input')
    if (data) {
        inputName.value = data.name
        inputPhone.value = '+375' + data.phone
    }
}

