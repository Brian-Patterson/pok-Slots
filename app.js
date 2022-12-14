let symbols = document.querySelectorAll(".slot");
let play = document.querySelector(".playButton");
let amount = document.querySelectorAll(".money");
let ante = document.querySelectorAll(".ante");
let stop = document.querySelector(".stopButton");
let signage = document.querySelector(".betSign");

let poliwag = document.createElement("img");
poliwag.classList.add("poliwag", "slotImg");
let seven = document.createElement("img");
seven.classList.add("seven", "slotImg");
let bar = document.createElement("img");
bar.classList.add("bar", "slotImg");
let diglett = document.createElement("img");
diglett.classList.add("diglett", "slotImg");
let jigglypuff = document.createElement("img");
jigglypuff.classList.add("jigglypuff", "slotImg");
let cherries = document.createElement("img");
cherries.classList.add("cherries", "slotImg");

seven.src = "images/freeimage-36149600-web.jpg"
poliwag.src = "https://img.pokemondb.net/sprites/red-blue/normal/poliwag.png";
bar.src= "images/Slot_Bar.webp";
diglett.src = "https://img.pokemondb.net/sprites/red-blue/normal/diglett.png";
jigglypuff.src = "https://img.pokemondb.net/sprites/red-blue/normal/jigglypuff.png";
cherries.src = "images/cherries.jpg"


function colorfulBets() {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    signage.style.textShadow = "1px 1px 25px" + "#" + randomColor;
    signage.style.color = "#" + randomColor;    
}

setInterval(colorfulBets, 650);

for(let i=1; i<=ante.length; i++){
    ante[i-1].innerText=i;
}

function fadeToBlack() {
    for(let i=0; i<ante.length; i++){
        ante[i].style.borderColor="black";
        ante[i].style.color="black";
    }
}

arrSymbols = Array.from(symbols)

function randImg (){
    let img =[seven, poliwag, bar, diglett, jigglypuff, cherries];
    let selectImg = img[Math.floor(Math.random()*img.length)];
    return selectImg;
}

massImg=[];
function moreImages () {
    for(let i=0; i<9; i++){
       massImg[i] = new Image();
       massImg[i].src = randImg().src;
       massImg[i].style.width="75%";
    }
}

function linkChild (){ //TRY TO MAKE INTO A FOR...LOOP
    arrSymbols[0].appendChild(massImg[0]);
    arrSymbols[1].appendChild(massImg[1]);
    arrSymbols[2].appendChild(massImg[2]);
    arrSymbols[3].appendChild(massImg[3]);
    arrSymbols[4].appendChild(massImg[4]);
    arrSymbols[5].appendChild(massImg[5]);
    arrSymbols[6].appendChild(massImg[6]);
    arrSymbols[7].appendChild(massImg[7]);
    arrSymbols[8].appendChild(massImg[8]);
}

function rotateImages(){
    for(let i=0; i<9; i++){
        if(symbols[i].hasChildNodes()){
            clear();
        }
    }
    randImg();
    moreImages();
    linkChild();
}

function clear(){
    for(let i=0; i<9; i++){
        symbols[i].removeChild(massImg[i]);
    }
}

let totalMoney = 250;
function spendMoney(){
    let money = Array.from(String(`${totalMoney}`), Number);
    let realZero = [0,0,0,0];
    for(let i=0; i<money.length; i++){
        realZero[realZero.length-1-i]=money[money.length-1-i];
    }
    for(let i=0; i<4; i++){
        amount[i].innerText=realZero[i];
    }
}
spendMoney();

let subAmount = 0;

ante.forEach(item=>{
    item.addEventListener("click", (e) => {
        fadeToBlack();
        e.target.style.borderColor="green";
        e.target.style.color="green";
        subAmount = 0;
        subAmount = Number(e.target.innerText);
        // placedBet();
    }) 
});

let startInterval;
// function placedBet() {
play.addEventListener("click", () =>{
    if(totalMoney>=subAmount) {
        totalMoney=totalMoney-subAmount;
        spendMoney();
        startInterval = setInterval(rotateImages, 30);
    }})

stop.addEventListener("click", () => {
    console.log(totalMoney)
    clearInterval(startInterval)
    checkForWin();
    spendMoney()
})
        
    
// }

function checkForWin (){
    if(ante[0].style.color==="green"){
        if(((massImg[3].outerHTML) === (massImg[4].outerHTML)) && ((massImg[4].outerHTML) === (massImg[5].outerHTML))){
            totalMoney+=100;
            return true}
        } else if (ante[1].style.color==="green"){
            if(((massImg[3].outerHTML) === (massImg[4].outerHTML)) && ((massImg[4].outerHTML) === (massImg[5].outerHTML))||
            (((massImg[0].outerHTML) === (massImg[1].outerHTML)) && ((massImg[1].outerHTML) === (massImg[2].outerHTML)))||
            (((massImg[6].outerHTML) === (massImg[7].outerHTML)) && ((massImg[7].outerHTML) === (massImg[8].outerHTML)))){
            totalMoney+=200;    
            return true}
        } else if (ante[2].style.color==="green"){
            if(((massImg[3].outerHTML) === (massImg[4].outerHTML)) && ((massImg[4].outerHTML) === (massImg[5].outerHTML))||
            (((massImg[0].outerHTML) === (massImg[1].outerHTML)) && ((massImg[1].outerHTML) === (massImg[2].outerHTML)))||
            (((massImg[6].outerHTML) === (massImg[7].outerHTML)) && ((massImg[7].outerHTML) === (massImg[8].outerHTML)))||
            (((massImg[0].outerHTML) === (massImg[4].outerHTML)) && ((massImg[4].outerHTML) === (massImg[8].outerHTML)))||
            (((massImg[2].outerHTML) === (massImg[4].outerHTML)) && ((massImg[4].outerHTML) === (massImg[6].outerHTML)))){
            totalMoney+=300;    
            return true}
        }
}