var today = new Date();
var selY = document.getElementById('selYear');
var selM = document.getElementById('selMonth');
var btn = document.getElementsByTagName('button')[0];
var main = document.getElementsByClassName('cal-main')[0];
function getDate(obj = new Date()) {
    var date = {
        year: obj.getFullYear(),
        month: obj.getMonth() + 1,
        day: obj.getDate(),
        MaxLast: 30,
        firstDayOfWeek: 1,
    }
    if (date.month == 2) {
        if (date.year % 4 == 0 && date.year % 100 != 0  || date.year % 400 == 0) {
            date.MaxLast = 28;
        } else {
            date.MaxLast = 29;
        }
    } else if (date.month <= 7 && date.month % 2 == 1 || date.month > 7 && date.month % 2 == 0) {
        date.MaxLast = 31
    }
    var first = new Date(date.year, date.month - 1).getDay();
    date.firstDayOfWeek = first;
    return date;
}

function setHead() {
    var str = '';
    var temp = '';
    for (var i = today.getFullYear() - 50; i < today.getFullYear()  + 50; i++) {
        // var oSpan = document.createElement('span'); 
        str += `<option value='${i}'>${i}</option>`;
    }
    selY.innerHTML = str;
    selY.value = today.getFullYear();
    for (var i = 1; i <= 12; i++) {
        // var oSpan = document.createElement('span'); 
        temp += `<option value='${i}'>${i}</option>`;
    }
    selM.innerHTML = temp;
    selM.value = today.getMonth() + 1;
    btn.addEventListener('click', function () {
        selY.value = today.getFullYear();
        selM.value = today.getMonth() + 1;
        setMain(today);
    })
    selY.onchange = function () {
        setMain();
    }
    selM.onchange = function () {
        setMain();
    }
    setMain();
}
function setMain() {
    var nowDate = getDate();
    var selDate = getDate(new Date(selY.value,selM.value - 1));
    var str = '';
    console.log(selDate,nowDate);
    for(var i = 0; i < selDate.firstDayOfWeek - 1; i++){
        str += `<span></span>`
    }
    for(var i = 1; i <= selDate.MaxLast;i++){
        
        if(selDate.year == nowDate.year && selDate.month == nowDate.month && i == nowDate.day){
            str += `<span class="active">${i}</span>`;
            continue;
        }
        str += `<span>${i}</span>`;
    }
    main.innerHTML = str;
   

}
setHead();
