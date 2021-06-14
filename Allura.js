class Allura{
    constructor(x,y){
    this.body = createSprite(x,y,50,200);
    this.image = loadImage('images/Allura.png');
    this.body.addImage('allura',this.image);
    this.body.scale = 0.18;

    }
}