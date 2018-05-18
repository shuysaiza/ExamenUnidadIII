let p

let dx
let dy

let xi
let yi
let xf
let yf
let state=1
let fig=[]
let cont=0;
let type="line"
let color="black"

function changeColor(c){
	color=c
}

function linea(){
	type="line"
}

function circle(){
	type="circle"
}

function rectangle(){
	type="rect"
}

function setup() {	
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent("canvas");
}

function circulo(r1, r2, xc, yc) {

	let x = 0;
	let y = r1+r2;
	let p = parseInt(5/4-y);
	while(x < y){
		if (p < 0) {
			x ++;
			p = p + 2 * x;
		}

		if (p >= 0) {
			p = p + 2 * ( x + 1 ) - 2 * y;
			x ++;
			y --;
		}

		point(xc + x,yc + y);
		point(xc + y,yc + x);
		point(xc + x,yc - y);
		point(xc + y,yc - x);
		point(xc - y,yc - x);
		point(xc - x,yc - y);
		point(xc - x,yc + y);
		point(xc - y,yc + x);
	}

}

function dda(x0,y0,x1,y1){
	if (x0>x1 && y0>y1) {
		p=x0
		x0=x1
		x1=p

		p=y0
		y0=y1
		y1=p
	}

	dx=Math.abs(x1-x0)
	dy=Math.abs(y1-y0)

	if (dx>=dy) {
		p=dx;
	}else{
		p=dy;
	}
	
	if((x1-x0)<0){
		
		dx*=-1
	}
	if ((y1-y0)<0) {
		
		dy*=-1
	}
	dx=dx/p
	dy=dy/p

	for(let i=1;i<=p;i++){
		
		point(x0,y0)
		x0+=dx
		y0+=dy
	}
	
}

function check(){
	
}

function draw() {
	
	background("white")
	fig.forEach((figu)=>{
		stroke(figu[5])
		switch(figu[4]) {
			case "line":
				dda(figu[0],figu[1],figu[2],figu[3])
			break;
			case "circle":
				circulo(figu[2]-figu[0],figu[3]-figu[1], figu[0], figu[1])
			break;
			case "rect":
				rect(figu[0],figu[1],figu[2]-figu[0],figu[3]-figu[1])
			break;
		}
	})
	if (mouseIsPressed) {

		
		if (state==1) {
			
			xi=mouseX
			yi=mouseY
			state=2;
			
		}else{
			stroke(color)
			switch(type){
				case "line":
					dda(xi,yi,mouseX,mouseY)
				break;
				case "circle":
					circulo(mouseX-xi,mouseY-yi, xi, yi)
				break;
				case "rect":
					rect(xi, yi, mouseX-xi, mouseY-yi)
				break;
			}
			
		}
	}
		
}

function keyPressed(){
	if (keyCode===67) {
		color= color==="red"? "blue": "green"
	}
}

function mousePressed() {
	
	if (state===1) {
		xi=mouseX
		yi=mouseY
		state=2;
	}
}

function mouseReleased(){
	xf=mouseX
	yf=mouseY
	fig[cont]=[]
	fig[cont].push(xi,yi,xf,yf,type,color)
	cont++;
	state=1
}