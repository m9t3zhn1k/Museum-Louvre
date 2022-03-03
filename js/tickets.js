const ticketType = document.getElementsByName('ticket_Type');
const ticketTypeSelect = document.getElementById('input-ticket-type');
const inputDate = document.getElementById('input-date');
const inputTime = document.getElementById('input-time');
let ticketTypePos = parseInt(localStorage.getItem('ticketTypePos')) || 0;
let typePrice = parseInt(localStorage.getItem('typePrice')) || 20;
let basicCounter = parseInt(localStorage.getItem('basicCounter')) || 1;
let seniorCounter = parseInt(localStorage.getItem('seniorCounter')) || 1;
let price;

let dateExhibition = new Date();
let timeExhibition = new Date();
setMinDate();
const ticketTypePrice = {
    0: 20,
    1: 25,
    2: 40,
}

const ticketBasicCounter = document.querySelector('.tickets__counter_basic');
const ticketBasicCounterLeftPopup = document.querySelector('.amount__basic_counter');
const ticketBasicCounterRightPopup = document.querySelector('.overview__tickets_value-basic');
const ticketSeniorCounter = document.querySelector('.tickets__counter_senior');
const ticketSeniorCounterLeftPopup = document.querySelector('.amount__senior_counter');
const ticketSeniorCounterRightPopup = document.querySelector('.overview__tickets_value-senior');
const buttonsMinus = document.querySelectorAll('.tickets__button_minus');
const buttonMinusPopupBasic = document.querySelector('.amount__block_minus-basic');
const buttonMinusPopupSenior = document.querySelector('.amount__block_minus-senior');
const buttonsPlus = document.querySelectorAll('.tickets__button_plus');
const buttonPlusPopupBasic = document.querySelector('.amount__block_plus-basic');
const buttonPlusPopupSenior = document.querySelector('.amount__block_plus-senior');
const totalPrice = document.querySelector('.tickets__forms_price');
const ticketPopupOpen = document.querySelector('.tickets__button_buy');
const basicPrice = document.querySelector('.overview__tickets_basic');
const seniorPrice = document.querySelector('.overview__tickets_senior');
const popupTotalPrice = document.querySelector('.overview__total_price');
const popupDateExhibition = document.querySelector('.overview__item_date');
const popupTimeExhibition = document.querySelector('.overview__item_time');
const popupTypeExhibition = document.querySelector('.overview__item_type');
for (let i = 0; i < ticketType.length; i++) {
    if (i == parseInt(localStorage.getItem('ticketTypePos'))) {
        ticketType[i].checked = true;
        popupTypeExhibition.textContent = ticketType[i].parentNode.textContent;
    }
}
for (let i = 0; i < ticketTypeSelect.length; i++) {
    if (i == parseInt(localStorage.getItem('ticketTypePos'))) {
        ticketTypeSelect[i].selected = true;
    }
}
ticketType.forEach(type => type.addEventListener('change', chooseType));
ticketTypeSelect.addEventListener('change', chooseTypeSelect);
inputDate.addEventListener('change', setExhibitionDate);
inputTime.addEventListener('change', setExhibitionTime);
ticketBasicCounter.addEventListener('click', ticketsCounter);
ticketSeniorCounter.addEventListener('click', ticketsCounter);
buttonsMinus.forEach(button => button.addEventListener('click', ticketsCounter));
buttonMinusPopupBasic.addEventListener('click', ticketsCounterPopupBM);
buttonMinusPopupSenior.addEventListener('click', ticketsCounterPopupSM);
buttonsPlus.forEach(button => button.addEventListener('click', ticketsCounter));
buttonPlusPopupBasic.addEventListener('click', ticketsCounterPopupBP);
buttonPlusPopupSenior.addEventListener('click', ticketsCounterPopupSP);

setExhibitionDate();
setExhibitionTime();

localStorage.setItem('basicCounter', basicCounter);
localStorage.setItem('seniorCounter', seniorCounter);
localStorage.setItem('typePrice', typePrice);
localStorage.setItem('ticketTypePos', ticketTypePos);
ticketBasicCounter.value = parseInt(localStorage.getItem('basicCounter')) || 1;
ticketSeniorCounter.value = parseInt(localStorage.getItem('seniorCounter')) || 1;
ticketBasicCounterLeftPopup.value = parseInt(localStorage.getItem('basicCounter')) || 1;
ticketSeniorCounterLeftPopup.value = parseInt(localStorage.getItem('seniorCounter')) || 1;

function chooseType() {
    for (let i = 0; i < ticketType.length; i++) {
        if (ticketType[i].checked) {
            typePrice = ticketTypePrice[i];
            ticketTypeSelect[i].selected = true;
            ticketTypePos = i;
            popupTypeExhibition.textContent = ticketType[i].parentNode.textContent;
        }
    }
    saveLocalStorage();
    mathTotalPrice();
    return typePrice, ticketTypePos;
}
function chooseTypeSelect() {
    for (let i = 0; i < ticketTypeSelect.length; i++) {
        if (ticketTypeSelect[i].selected) {
            typePrice = ticketTypePrice[i];
            ticketType[i].checked = true;
            ticketTypePos = i;
            popupTypeExhibition.textContent = ticketType[i].parentNode.textContent;
        }
    }
    saveLocalStorage();
    mathTotalPrice();
    return typePrice, ticketTypePos;
}
function ticketsCounter() {
    basicCounter = parseInt(ticketBasicCounter.value);
    seniorCounter = parseInt(ticketSeniorCounter.value);
    ticketBasicCounterLeftPopup.value = basicCounter;
    ticketSeniorCounterLeftPopup.value = seniorCounter;
    mathTotalPrice();
    saveLocalStorage();
    return basicCounter, seniorCounter;
}
function ticketsCounterPopupBM() {
    ticketBasicCounter.value -= 1;
    if (ticketBasicCounter.value < 0) ticketBasicCounter.value = 0;
    ticketsCounter();
}
function ticketsCounterPopupBP() {
    ticketBasicCounter.value++;
    if (ticketBasicCounter.value > 20) ticketBasicCounter.value = 20;
    ticketsCounter();
}
function ticketsCounterPopupSM() {
    ticketSeniorCounter.value -= 1;
    if (ticketSeniorCounter.value < 0) ticketSeniorCounter.value = 0;
    ticketsCounter();
}
function ticketsCounterPopupSP() {
    ticketSeniorCounter.value++;
    if (ticketSeniorCounter.value > 20) ticketSeniorCounter.value = 20;
    ticketsCounter();
}
function mathTotalPrice() {
    price = typePrice * (basicCounter + seniorCounter / 2);
    basicPrice.innerHTML = `<span>&#8364;</span>${typePrice * basicCounter}`;
    seniorPrice.innerHTML = `<span>&#8364;</span>${typePrice * seniorCounter / 2}`;
    ticketBasicCounterRightPopup.innerHTML = `${basicCounter}`;
    ticketSeniorCounterRightPopup.innerHTML = `${seniorCounter}`;
    totalPrice.innerHTML = `Total&nbsp;<span>&#8364;</span>${price}`;
    popupTotalPrice.innerHTML = `<span>&#8364;</span>${price}`;
    return price;
}
function saveLocalStorage() {
    localStorage.basicCounter = basicCounter;
    localStorage.seniorCounter = seniorCounter;
    localStorage.typePrice = typePrice;
    localStorage.ticketTypePos = ticketTypePos;
    localStorage.setItem('dateExhibition', popupDateExhibition.textContent);
    localStorage.setItem('timeExhibition', popupTimeExhibition.textContent);
}
function setMinDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
    dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    } 
    
    today = yyyy + '-' + mm + '-' + dd;
    inputDate.setAttribute("min", today);
}
function setExhibitionDate() {
    if (inputDate.value) {
        dateExhibition = new Date(inputDate.value);
    } else if (localStorage.dateExhibition) {
        popupDateExhibition.textContent = localStorage.getItem('dateExhibition');
        return;
    }
    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const month = dateExhibition.getMonth();
    const year = dateExhibition.getDate();
    const day = dateExhibition.getDay();

    popupDateExhibition.textContent = `${dayArray[day]}, ${monthArray[month]} ${year}`;
    saveLocalStorage();
}
function setExhibitionTime() {
    if (inputTime.value) {
        timeExhibition = inputTime.value;
    } else if (localStorage.timeExhibition) {
        popupTimeExhibition.textContent = localStorage.getItem('timeExhibition');
        return;
    }
    let hour = timeExhibition.slice(0, 2);
    hour > 18 ? hour = "17" : hour = hour;
    hour < 9 ? hour = "9" : hour = hour;
    let minutes = timeExhibition.slice(-2);
    minutes > 30 ? minutes = "30" : minutes = "00";

    popupTimeExhibition.textContent = `${hour}:${minutes}`;
    saveLocalStorage();
}

mathTotalPrice();