
class Target {

    constructor( x, y, label) {
        this.x = x;
        this.y = y;
        this.label = label;
    }
 
    drawObject() {
        if (this.x === w/2){
            var dx = 0;
        }else{
          var dx = (this.x - w/2)/abs(this.x - w/2) * 3;
        }

        if(this.y === h/2){
            var dy = 0;
        }else{
            var dy = (this.y - h/2)/abs(this.y - h/2) * 3;
        }
        text(this.label, this.x + dx, this.y + dy);
        point(this.x,this.y);
    }
}

class Arrow {

    constructor( fx, fy,tx,ty,type, label) {
        this.fx = fx;
        this.fy = fy;
        this.tx = tx;
        this.ty = ty;
        this.type = type;
        this.label = label;
    }

    drawObject(){
        push();
        text(this.label, (this.fx + this.tx)/2 + 13, (this.fy + this.ty)/2 + 13);
        if(this.type === "function"){
            strokeWeight(1);
        }else if(this.type === "functor"){
            strokeWeight(3);
        }else{
            stroke("red");
            strokeWeight(5);
        }
        arrow(this.fx, this.fy, this.tx, this.ty, 10);
        pop();
    }
}

class Category{
    constructor(x,y,r, label){
        this.x = x;
        this.y = y;
        this.r = r;
        this.label = label;
    }

    drawObject(){
        push();
        text(this.label, this.x, this.y - this.r/2);
        noFill();
        ellipse(this.x, this.y, this.r);
        pop();
    }
}


var w = 600, h= 600;
var minLength = 5;
var objects = [];
var fromX, fromY;
var radio, input, button, button2;
function setup() {
	createCanvas(w,h);
    radio = createRadio();
    radio.option('対象', "target");
    radio.option('射', "function");
    radio.option('関手', "functor");
    radio.option('自然変換', "nat");
    radio.option('圏', "category");
    radio.value("target");
    radio.position(w + 15, 10);

    input = createInput("X");
    input.position(w + 85, 40);
    span = createSpan('ラベル:');
    span.position(w+15, 40);

    button = createButton('undo');
    button.position(w + 15, 70);
    button.mousePressed(removeObject);

    button = createButton('reset');
    button.position(w + 80, 70);
    button.mousePressed(reset);
	background(240);
}

function draw() {
    background(240);
    for(ob of objects){
        ob.drawObject();
    }
    if(mouseIsPressed){
        switch(radio.value()){
            case "target":
              point(fromX, fromY);
              break;
            case "category":
              push();
              noFill();
              ellipse((fromX + mouseX)/2, (fromY+mouseY)/2, abs(fromX - mouseX),);
              pop();
              break;
            default:
              arrow(fromX, fromY, mouseX, mouseY, 10);
              break;
        }
    }
}


function mousePressed(){
    fromX = mouseX;
    fromY = mouseY;
}

function mouseClicked(){
    if(mouseX < w && mouseY < h){
        switch(radio.value()){
            case "target":
            objects.push(new Target(fromX, fromY, input.value()));
            break;
            case "category":
            objects.push(new Category((fromX + mouseX)/2, (fromY+mouseY)/2, abs(fromX - mouseX), input.value()));
            break;
            default:
            objects.push(new Arrow(fromX, fromY, mouseX, mouseY, radio.value(), input.value()));
            break;
        }
    }
}

function removeObject(){
    objects = objects.slice(0, objects.length-1);
}

function reset(){
    objects = [];
}

function arrow(fromX, fromY, toX, toY, len = 30){
    let d = dist(fromX, fromY,toX,toY);
    if(d===0){return false;}
    let toVect = [len * (fromX - toX)/d, len * (fromY - toY)/d];
    push();
    translate(toX, toY);
    rotate(PI/6);
    line(0,0,toVect[0], toVect[1]);
    pop();
    push();
    translate(toX, toY);
    rotate(-PI/6);
    line(0,0,toVect[0], toVect[1]);
    pop();
    line(fromX, fromY, toX, toY);
}