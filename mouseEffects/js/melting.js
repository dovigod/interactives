const canvas = document.getElementById("canvas");

const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];

const numberOfParticle = 1000;


const mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove' , event => {
    mouse.x = event.x;
    mouse.y = event.y;
})

setInterval(()=>{
    mouse.x = undefined;
    mouse.y = undefined
}, 200);




//create particles
//5:30
class particle {
    constructor(x ,y ,size ,color, weight){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y , this.size, 0 , Math.PI*2, false);
        // drawing circle

        ctx.fillStyle = this.color;
        ctx.fill();


    }

    update(){
        this.size -= 0.1;

        if( this.size < 0){
            this.x = (mouse.x + ((Math.random() *20) -10));

            this.y = (mouse.y + ((Math.random() *20) -10));

            this.size = (Math.random() *12 )+10;

            this.weight = (Math.random() * 2) - 0.5;
        }

        this.y += this.weight;
        this.weight += 0.2;

        if((this.y > canvas.height - this.size) ){

            this.weight *= -0.2;
           
        };


    }


}

const init =() =>{
    particleArray = [];

    for(let i = 0 ; i < numberOfParticle ; i++){
        let x = Math.random() * canvas.width ;
        let y = Math.random() * canvas.height;

        let size = (Math.random()*15) +10;
        let color = 'pink';

        let weight =1 ;
        particleArray.push(new particle(x,y,size,color,weight));
    }


}
const animate =()=>{

  
  
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i = 0; i < particleArray.length ; i++){
        particleArray[i].update();
        particleArray[i].draw();

    
    }


    requestAnimationFrame(animate);

}

init();
animate();

