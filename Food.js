class Food{
    constructor(){
        this.foodStock=0
        this.image=loadImage("Images/Milk.png")
    }
    display(){
        image(this.image,700,200,50,50)
        var x=80,y=100;
        for(var i=0;i<this.foodStock;i++){
            if(i%10==0){
                x=80;
                y+=50
                console.log("not % "+i)
            }
            image (this.image,x,y,50,50)
            x+=30
        }
    }


}