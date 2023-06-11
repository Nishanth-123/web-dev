let randomNumber1=Math.floor(Math.random()*6)+1;
document.querySelector(".img1").src="images/dice"+randomNumber1+".png";
let randomNumber2=Math.floor(Math.random()*6)+1;
document.querySelector(".img2").src="images/dice"+randomNumber2+".png";

let result="";
if(randomNumber1>randomNumber2){
result="Player 1 Wins!"
}else if(randomNumber1<randomNumber2){
result="Player 2 Wins!"
}else{
result="Draw!"
}

document.querySelector(".container h1").innerHTML=result;
