//Create variables here
var dog ;
var hungrydogImg;
var backImg;
var sound
var food
var foodS=20;
var sitDog;
var boy;
var boyImg;
var foodStock;
var database;



function preload()
{
  hungrydogImg=loadImage("dogImg1.png");
  sitDog=loadImage("dogImg.png");
  backImg=loadImage("park.jpg");
  boyImg=loadImage("standingBoy.png");
}

function setup() {
  database=firebase.database();
  createCanvas(800, 700);
  

  //creating dog variable
  dog=createSprite(500,600,20,20);
  dog.addImage(hungrydogImg);
  dog.scale=(0.2)
  // creating boy variable
  boy=createSprite(300,550,20,20);
  boy.addImage(boyImg);
  boy.scale=(0.7)
// fetching data 
foodStock =database.ref('Food');
foodStock.on("value",readStock);


}


function draw() {  
  
background(backImg);
  
  //add styles here
if(keyWentDown("space")){
  writeStock(foodS);
  
}
drawSprites();
textSize(20);
fill("green")
  text ("Food Remaining : "+foodS,350,400);
if(foodS>10){
  fill("red")
  text("He Is  Hungry Feed Him!!, Press SPACE To Feed Him!!",300,300);
}
  if(foodS<=10){
    dog.addImage(sitDog);
    fill("red")
    text("His Stomach Is Full Go And Play With Him Now!!!",300,300);
  }
if(foodS===-1){
  foodS=foodS+1; 
}
}

//function to read valuefrom DB
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
if(x<=0){
  x=0;
}
else{
  x=x-1;
}

  database.ref('/').update({
    Food:x
  })
}

