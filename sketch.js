var dog,sadDog,happyDog;
var fooObj;
var feedBtn,addBtn;
var database;
var label;
var feedTime;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  label=createElement('h4')
  label.position(550,85)

  database=firebase.database();
  console.log("database connected")

  foodObj=new Food();
  getFoodStock();
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedBtn=createButton("Feed")
  feedBtn.position(700,100)
  feedBtn.mousePressed(deductFood)

  addBtn=createButton("Add Food")
  addBtn.position(800,100)
  addBtn.mousePressed(addFood)

}

function draw() {
  background(46,139,87);
  foodObj.display()
  drawSprites();
}

//function to read food Stock
function getFoodStock(){
  var foodInfoRef=database.ref('food');
  foodInfoRef.on("value",(data)=>{
    console.log(data.val())
    foodObj.foodStock=data.val()
  })

}


//function to update food stock and last fed time
function deductFood(){
  var d=new Date();
  console.log(d.getHours())
  feedTime=d.getHours()%12 || 12 + ":"+ d.getMinutes()
  label.html(feedTime,false)
  dog.addImage(happyDog)
  foodObj.foodStock-=1;
  database.ref('/').set({
   food:foodObj.foodStock
  });

}


//function to add food in stock
function addFood(){
  
  foodObj.foodStock+=1;
  database.ref('/').set({
   food:foodObj.foodStock
  });

}
