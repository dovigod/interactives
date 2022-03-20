const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
const numbOfParticle = 1;

let hsl = 0;




window.addEventListener('resize', (event) =>{

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


})


const mouse = {
    x: null,
    y: null
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
        this.size = Math.random()*15 + 1;
        this.speedX = (Math.random() *4.0) -1.5;
        this.speedY = (Math.random() * 4.0) -1.5;
        this.color = 'hsl('+ hsl +', 100% , 50%)'
    }

    draw(){

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y , this.size , 0,Math.PI*2);
        ctx.fill();
        ctx.closePath();

    }

    update(){

      
            this.x += this.speedX;
//this.y += this.speedY;

            
            if(this.size > 0.2) this.size -= 0.1;
            
        
       

    }
}


const handleParticles = () =>{
    for(let i = 0 ; i< particlesArray.length ; i++){


        particlesArray[i].update();
        particlesArray[i].draw();


        if(particlesArray[i].x-particlesArray[i].size < 0 || particlesArray[i].y +particlesArray[i].size > canvas.height || particlesArray[i].y -particlesArray[i].size < 0 || particlesArray[i].x+particlesArray[i].size > canvas.width){
            particlesArray.splice(i,1);
            i--;
            continue;
        }


       
        for(let j = i+1 ; j  < particlesArray.length -1 ; j ++){

            let dx = particlesArray[i].x - particlesArray[j].x;
            let dy = particlesArray[j].y - particlesArray[j].y;

            let distance = Math.sqrt((dx*dx)+(dy*dy));
            
     

            if(distance < 100){

                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = 2;

                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);

                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);

                ctx.stroke();
                console.log(11);
            }
        }
        
        if(particlesArray[i].size <= 0.3){
            particlesArray.splice(i,1);

            i = i -1;
            
        }

    }


}


const animate = () =>{

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = ' white'
    ctx.lineWidth = 4;
    ctx.moveTo(100,100);
    ctx.lineTo(100,200);
    ctx.stroke();
  /*
    ctx.fillStyle = 'rgba(0,0,0,0.02)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    */
    
    handleParticles();
    hsl += 5;
    requestAnimationFrame(animate);
}


animate();




//시발 세로선