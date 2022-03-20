const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
const numbOfParticle = 10;

let hsl = 0;


console.dir(ctx);

/*

window.addEventListener('resize', (event) =>{

    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight;


})*/


const mouse = {
    x: undefined,
    y: undefined
};

canvas.addEventListener('click' , (event) =>{
    mouse.x = event.x;
    mouse.y = event.y;

    for(let i =0 ; i < numbOfParticle ; i++){
        particlesArray.push(new Particle());
    }
   
})

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;

  

    for(let i =0 ; i < numbOfParticle ; i++){
        particlesArray.push(new Particle());
    }
     
})
/*
canvas.addEventListener('mouseup', (event) =>{
    mouse.x = undefined;
    mouse.y = undefined;
})*/

class Particle{
    constructor(){
       // this.x = mouse.x;
        //this.y = mouse.y;

        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 +1;
        this.speedX = (Math.random() *3.0) -1.5;
        this.speedY = (Math.random() * 3.0) -1.5;
    }

    draw(){

        ctx.fillStyle = 'hsl('+ hsl +', 100% , 50%)';
        ctx.beginPath();
        ctx.arc(this.x,this.y , this.size , 0,Math.PI*2);
        ctx.fill();

    }

    update(){

      
            this.x += this.speedX;
            this.y += this.speedY;

            
            if(this.size > 0.2) this.size -= 0.1;
            
        
       

    }
}


const handleParticles = () =>{
    for(let i = 0 ; i< particlesArray.length ; i++){

        particlesArray[i].update();
        particlesArray[i].draw();

        if(particlesArray[i].size <= 0.3){
            particlesArray.splice(i,1);
            i -- ;
        }

    }
}


const animate = () =>{

  //  ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = 'rgba(0,0,0,0.02)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    handleParticles();
    hsl++;
    requestAnimationFrame(animate);
}



animate();



